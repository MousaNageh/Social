<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
  use HasFactory;
  protected $fillable = ["user_id", "school", "faculty", "job"];
}