<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Users;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Users::create([
            "id"=>"0",
            "name"=>"admin",
            "email"=>"pelda@gmail.com",
            "password"=>"admin",
            "password_confirmation"=>"admin"
        ]);
    }
}
