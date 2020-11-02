<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class userSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    User::create([
      'name' => "mousa nageh",
      'email' => '200moussa200@gmail.com',
      'password' => Hash::make('mousamousa1234'),
      'gender' => '0',
      'slug' => Str::slug('mousa nageh'),
      'age' => 23

    ]);
  }
}