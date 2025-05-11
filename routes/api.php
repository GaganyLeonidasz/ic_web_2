<?php


use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SavesController;


/*Route::patch("/users/{user}/restore", [UserController::class, "restore"])->name("users.restore");*/

Route::post('/users/register',[UserController::class,'register']);
Route::post('/users/login',[UserController::class,'login']);

Route::group([
    "middleware"=>["auth:sanctum"]
],function(){
    Route::get('/users/profile',[UserController::class,'profile']);
    Route::get('/users/logout',[UserController::class,'logout']);
    Route::post('/saves/store',[SavesController::class,'store']);
    Route::get('/saves',[SavesController::class,'index']);
});