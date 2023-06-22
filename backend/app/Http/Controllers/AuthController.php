<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login.
     *
     * @param \App\Http\Requests\LoginRequest
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->password];
        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Tài khoản hoặc mật khẩu không chính xác.'], 401);
        }
        return response()->json([
            'user_id' => auth()->id(),
            'user_email' => auth()->user()->email,
            'name' => auth()->user()->name,
        ]);
    }

    /**
     * Login.
     *
     * @param \App\Http\Requests\LoginRequest
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $user = new User();
        $user->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $credentials = ['email' => $request->email, 'password' => $request->password];
        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Tài khoản hoặc mật khẩu không chính xác.'], 401);
        }
        return response()->json([
            'user_id' => auth()->id(),
            'user_email' => auth()->user()->email,
            'name' => auth()->user()->name,
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        if (auth()->check()) {
            auth()->logout();
        }

        return response()->json(['message' => 'Đăng xuất thành công.']);
    }
}
