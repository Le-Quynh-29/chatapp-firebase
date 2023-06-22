<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function authRouteAPI(Request $request){
        return $request->user();
    }

    public function index()
    {
        $users = User::query()->select('id', 'name', 'email')
                ->get()->toArray();
        return response()->json($users, 200);
    }
}
