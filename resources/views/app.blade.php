{{-- resources/views/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {{-- CSRF token for Inertia --}}
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        {{-- Inertia head --}}
        @inertiaHead

        {{-- Favicon --}}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />

        {{-- Vite assets --}}
        @viteReactRefresh
        @vite(['resources/js/app.jsx'])

        {{-- Dark mode script to prevent FOUC --}}
        <script>
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        </script>
    </head>
    <body class="antialiased bg-slate-50 dark:bg-[#0F172A]">
        @inertia
    </body>
</html>
