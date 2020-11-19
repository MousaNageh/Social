<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
  public function getNames()
  {
    $names = collect(User::all())->map(function ($user) {
      return ['name' => $user->name, 'email' => $user->email];
    });
    if ($names) {
      return response()->json($names, 200);
    } else {
      return response()->json('null', 200);
    }
  }
  public function register(Request $request)
  {

    $validations = Validator::make($request->all(), [
      "gender" => "required",
      "name" => "required|unique:users,name",
      "email" => "required|email|unique:users,email",
      "password" => "required|min:8|regex:/[A-Z]/",
      "age" => "required|integer|between:12,120"
    ]);
    if ($validations->fails()) {
      return response()->json($validations->errors()->all(), 422);
    } else {
      $password = Hash::make($request->password);
      $user = User::create([
        "name" => $request->name,
        "age" => $request->age,
        "email" => $request->email,
        "password" => $password,
        "gender" => $request->gender,
        "slug" => Str::slug($request->name),
        "remember_token" => Str::random(10)
      ]);
      $token = $user->createToken("Laravel Password Grant Client")->accessToken;

      return response()->json(["user" => $user, "token" => $token], 200);
    }
  }
  public function register2(User $user, Request $request)
  {

    $validations = Validator::make($request->all(), [
      "avatar" => "required|image",
      "about" => "required|max:200|string",
      "country" => "required|string"
    ]);
    if ($validations->fails()) {
      return response()->json($validations->errors()->all(), 422);
    }
    $image = $request->avatar->store("users");
    $profile = $user->profile()->create([
      "about" => $request->about,
      "avatar" => $image,
      "Location" => $request->country
    ]);
    return response()->json([
      "info" => $user,
      "profile" => [
        "about" => $profile->about,
        "location" => $profile->Location,
        "avatar" => "/storage/" . $profile->avatar
      ]
    ], 200);
  }
}