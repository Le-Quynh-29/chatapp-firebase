<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|max:255|email',
            'password' => 'required|min:8|max:20|regex:/^[a-zA-Z0-9\_\-]+$/',
        ];
    }

    /**
     * Message of Fail validator.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'Email không được để trống.',
            'email.max' => 'Email không quá 255 ký tự.',
            'email.email' => 'Email không đúng định dạng.',
            'password.required' => 'Mật khẩu không được để trống.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự và không quá 255 ký tự.',
            'password.max' => 'Mật khẩu phải có ít nhất 8 ký tự và không quá 255 ký tự.',
            'password.regex' => 'Mật khẩu không đúng định dạng.',
        ];
    }

    /**
     * Fail validator
     *
     * @param  Validator $validator
     * @return HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
