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
  public function getEmails()
  {
    $emails = collect(User::all())->map(function ($user) {
      return  $user->email;
    });
    if ($emails) {
      return response()->json($emails, 200);
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

      return response()->json(["user" => ["info" => $user, "study" => [], "profile" => []], "token" => $token], 200);
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
    return response()->json(["user" => [
      "info" => $user,
      "profile" => [
        "about" => $profile->about,
        "location" => $profile->Location,
        "avatar" => "/storage/" . $profile->avatar
      ],
      "study" => ["school" => "", "job" => "", "faculty" => ""]
    ]], 200);
  }
  public function register3(User $user, Request $request)
  {
    $validations = Validator::make($request->all(), [
      "school" => "required|string",
      "job" => "required|string",
      "faculty" => "required|string"
    ]);
    if ($validations->fails()) {
      return response()->json($validations->errors()->all(), 422);
    }
    $study = $user->study()->create([
      "school" => $request->school,
      "job" => $request->job,
      "faculty" => $request->faculty
    ]);
    return response()->json(["user" => [
      "info" => $user,
      "profile" => [
        "about" => isset($user->profile->about) ? $user->profile->about : "",
        "location" => isset($user->profile->Location) ? $user->profile->Location : "",
        "avatar" => isset($user->profile->avatar) ? "/storage/" . $user->profile->avatar : ""
      ],
      "study" => ["school" => $study->school, "job" => $study->job, "faculty" => $study->faculty]
    ]], 200);
  }
  public function login(Request $request)
  {
    $validations = Validator::make($request->all(), [
      "email" => "required|email",
      "password" => "required"
    ]);
    if ($validations->fails()) {
      return response()->json($validations->errors()->all(), 422);
    }
    $user = User::where("email", $request->email)->first();
    if (!$user)
      return response()->json("user not exists", 422);
    if (Hash::check($request->password, $user->password)) {
      $info = [
        "id" => 1,
        "name" => $user->name,
        "email" => $user->email,
        "gender" => $user->gender,
        "slug" => $user->slug,
        "age" => $user->age,
        "created_at" => $user->created_at,
        "updated_at" => $user->updated_at
      ];
      if (isset($user->profile) && !empty($user->profile))
        $profile = [
          "about" =>  $user->profile->about,
          "location" => $user->profile->Location,
          "avatar" =>  "/storage/" . $user->profile->avatar
        ];
      else
        $profile = [];
      if (isset($user->study) && !empty($user->study))
        $study = ["school" => $user->study->school, "job" => $user->study->job, "faculty" => $user->study->faculty];
      else
        $study = [];
      $token = $user->createToken("Laravel Password Grant Client")->accessToken;
      return response()->json(["user" => ["info" => $info, "study" => $study, "profile" => $profile], "token" => $token], 200);
    } else {
      return response()->json(["error" => "wrong password"], 401);
    }
  }
}