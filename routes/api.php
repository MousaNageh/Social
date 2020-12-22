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
  $study = $request->user()->study;

  if (!empty($profile))
    $dataProfile = [
      "location" => $profile->Location,
      "avatar" => "/storage/" . $profile->avatar,
      "about" => $profile->about
    ];
  else
    $dataProfile = [
      "location" => "",
      "avatar" => "",
      "about" => ""
    ];
  if (!empty($study))
    $dataStudy = [
      "school" => $study->school,
      "faculty" => $study->faculty,
      "job" => $study->job
    ];
  else
    $dataStudy = [
      "school" => "",
      "faculty" => "",
      "job" => ""
    ];

  return response()->json([
    "user" => [
      "info" => $request->user(),
      "profile" => $dataProfile,
      "study" => $dataStudy
    ]
  ], 200);
});
Route::post("/getnames", [UserController::class, 'getNames']);
Route::post("/register", [UserController::class, 'register']);
Route::middleware(["auth:api"])->post("/register2/{user:slug}", [UserController::class, 'register2']);
Route::middleware(["auth:api"])->post("/register3/{user:slug}", [UserController::class, 'register3']);
Route::post("/login", [UserController::class, "login"]);
Route::post("/getemails", [UserController::class, "getEmails"]);