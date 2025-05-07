<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UsersFactory> */
    use HasFactory,Notifiable,SoftDeletes,HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'password_confirmation'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'password_confirmation'
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
