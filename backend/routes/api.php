<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', 'UserController@authRouteAPI');

Route::get('version', 'VersionController');

Route::prefix('auth')->group(function() {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');
});

Route::prefix('khai-son-lap-huong')->group(function() {
    Route::get('/', 'KhaiSonLapHuongController@index');
    Route::put('/{id}', 'KhaiSonLapHuongController@update');
});

Route::prefix('activation-principles')->group(function() {
    Route::get('/', 'ActivationPrincipleController@index');
    Route::put('/{id}', 'ActivationPrincipleController@update');
});

Route::prefix('activation-items')->group(function() {
    Route::get('/', 'ActivationItemController@index');
    Route::put('/{id}', 'ActivationItemController@update');
    Route::put('/upload', 'ActivationItemController@uploadImage');
});

Route::prefix('intro')->group(function() {
    Route::get('/', 'IntroController@index');
    Route::put('/', 'IntroController@update');
});

Route::prefix('notifications')->group(function() {
    Route::post('/token', 'NotificationController@addDeviceToken');
    Route::post('/', 'NotificationController@send');
});

Route::prefix('user')->group(function() {
    Route::get('/list', 'UserController@index');
});
