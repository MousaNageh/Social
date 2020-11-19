<?php

use App\Http\Controllers\api\UserController;
use App\Models\User;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
  $profile =  $request->user()->profile;
  if (!empty($profile))
    $dataProfile = [
      "location" => $profile->Location,
      "avatar" => "/storage/" . $profile->avatar,
      "about" => $profile->about
    ];
  else
    $dataProfile = [];
  return response()->json([
    "info" => $request->user(),
    "profile" => $dataProfile
  ], 200);
});
Route::post("/getnames", [UserController::class, 'getNames']);
Route::post("/register", [UserController::class, 'register']);
Route::middleware(["auth:api"])->post("/register2/{user:slug}", [UserController::class, 'register2']);