<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Saves extends Model
{
    /** @use HasFactory<\Database\Factories\SavesFactory> */
    use HasFactory;
    use SoftDeletes;
    protected $fillable=[
        "users_Id",
        "save"
    ];
}
