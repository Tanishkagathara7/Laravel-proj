<?php
// app/Http/Requests/ContactRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'max:100'],
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:20', 'max:1000'],
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required'    => 'Please tell us your name.',
            'name.max'         => 'Name may not exceed 100 characters.',
            'email.required'   => 'A valid email address is required.',
            'email.email'      => 'Please enter a valid email address.',
            'message.required' => 'Please include a message.',
            'message.min'      => 'Your message should be at least 20 characters so we can better understand your needs.',
            'message.max'      => 'Message may not exceed 1,000 characters.',
        ];
    }
}
