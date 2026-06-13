<?php
// app/Http/Controllers/HomeController.php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Render the NexaAI home page.
     */
    public function index(): Response
    {
        return Inertia::render('Home', [
            'meta' => [
                'title'       => 'NexaAI — Intelligent Software for Tomorrow',
                'description' => 'NexaAI builds AI-powered software solutions that transform businesses. From machine learning pipelines to full-stack SaaS products.',
            ],
        ]);
    }

    /**
     * Handle the contact form submission.
     */
    public function contact(ContactRequest $request): RedirectResponse
    {
        // Validated data is safe to use
        $validated = $request->validated();

        // TODO: Send notification email, store to DB, queue job, etc.
        // Mail::to(config('mail.contact_address'))->send(new ContactMail($validated));

        return back()->with('success', 'Thank you for reaching out! We\'ll be in touch within 24 hours.');
    }
}
