<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'name' => 'required|max:50|unique:users,id',
            'email' => 'required|max:255|email|unique:users,id',
            'password' => 'required|string|min:8|max:20|regex:/^[a-zA-Z0-9\_\-]+$/',
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
            'name.required' => 'Tên tài khoản không được để trống.',
            'name.max' => 'Tên tài khoản không quá 50 ký tự.',
            'name.unique' => 'Tên tài khoản đã tồn tại.',
            'email.required' => 'Email không được để trống.',
            'email.max' => 'Email không quá 255 ký tự.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email đã tồn tại.',
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
