# ── Stage 1: Build Node/Vite assets ────────────────────────────
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY resources/ ./resources/
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

RUN npm run build

# ── Stage 2: PHP/Laravel runtime ────────────────────────────────
FROM php:8.4-cli-alpine

# Install system deps + PHP extensions
RUN apk add --no-cache \
    curl \
    zip \
    unzip \
    git \
    sqlite \
    sqlite-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files first (layer cache)
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy the full project
COPY . .

# Copy built frontend assets from node-builder
COPY --from=node-builder /app/public/build ./public/build

# Set permissions and create required directories
RUN mkdir -p bootstrap/cache storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000

CMD ["sh", "-c", "php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan serve --host=0.0.0.0 --port=8000"]
