<?php

use App\Http\Controllers\SavesController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::patch("/users/{user}/restore", [UsersController::class, "restore"])->name("users.restore");
Route::get("/users/{user}/saves",[SavesController::class,"index"])->name("users.saves");
Route::resource("/users", UsersController::class);