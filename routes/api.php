<?php


use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*Route::patch("/users/{user}/restore", [UserController::class, "restore"])->name("users.restore");
Route::get("/users/{user}/saves",[SavesController::class,"index"])->name("users.saves");*/

Route::post('/users/register',[UserController::class,'store']);
Route::post('/users/login',[UserController::class,'show']);
