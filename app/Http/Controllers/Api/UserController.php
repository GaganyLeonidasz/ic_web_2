<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUsersRequest;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Throwable;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(),[
                'name'=>'required|string',
                'email'=>'required|email|unique:users,email',
                'password'=>'required',
                'password_confirmation'=>'required'
            ]);
            if ($validateUser->fails()) {
                return response()->json([
                    'status'=>false,
                    'message'=> 'Validation error',
                    'errors'=>$validateUser->errors()
                ],401);
            }
            $user = Users::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>$request->password,
                'password_confirmation'=>$request->password_confirmation
            ]);
            return response()->json([
                'status'=>true,
                'message'=>'User created successfully',
            ],200);
        } 
        catch(\Throwable $th){
            return response()->json([
                'status'=>false,
                'message' =>$th->getMessage()
            ],500);
        }
    }
    public function login(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(),[
                'email'=>'required|email',
                'password'=>'required'
            ]);
            if ($validateUser->fails()) {
                return response()->json([
                    'status'=>false,
                    'message'=>'Validation error',
                    'errors'=> $validateUser->errors()
                ],401);
            }

            if (!Auth::attempt($request->only(['email','password']))){
                return response()->json([
                    'status'=>false,
                    'message'=>'The credentials are wrong'
                ],401);
            }
            $user = Users::where('email',$request->email)->first();
            return response()->json([
                'status'=>true,
                'message'=>'The user logged in successfully',
                'token'=>$user->createToken("API TOKEN")->plainTextToken
            ],200);
        } catch(Throwable $th){
            return response()->json([
                'status'=>false,
                'message'=>$th->getMessage()
            ],500);
        }
    }
    public function profile()
    {
        $user = Auth::user();

        return response()->json([
            "status"=>true,
            "message"=>"User profile data",
            "user"=>$user
        ]);
    }
    public function logout()
    {
        Auth::logout();

        return response()->json([
            "status"=>true,
            "message"=>"User logged out successfully",
        ]);
    }
    public function destroy(Users $users)
    {
        $users->delete();
        return response()->json([$users, "msg" => "User deleted successfully."]);
    }
    public function restore($user)
    {
        $users = Users::withTrashed()->find($user);
        $users->restore();
        return response()->json([$users, "msg" => "User restored successfully."]);
    }
}
