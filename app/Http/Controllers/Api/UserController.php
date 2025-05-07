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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /*$users = Users::all();
        return response()->json([$users, "msg" => "A felhasználók lekérése sikeresen megtörtént."]);*/
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            //$validateUser= $request->validated();
            $validateUser = Validator::make($request->all(),[
                'name'=>'required',
                'email'=>'required|email|unique:users,email',
                'password'=>'required',
                'password_confirmation'=>'required'
            ]);
            if ($validateUser->fails()) {
                return response()->json([
                    'status'=>false,
                    'message'=> 'validation error',
                    'errors'=>$validateUser->errors()
                ],401);
            }
            $user = Users::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
                'password_confirmation'=>Hash::make($request->password_confirmation)
            ]);
            return response()->json([
                'status'=>true,
                'message'=>'User Created Succesfully',
                'token'=>$user->createToken("API TOKEN")->plainTextToken
            ],200);
        } 
        catch(\Throwable $th){
            return response()->json([
                'status'=>false,
                'message' =>$th->getMessage()
            ],500);
        }

        /*$user = Users::create($request->all());
        return response()->json([$user, "msg" => "Hozzáadás sikeresen megtörtént."]);*/
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(),[
                'email'=>'required|email',
                'password'=>'required'
            ]);
            if ($validateUser->fails()) {
                return response()->json([
                    'status'=>false,
                    'message'=>'validation error',
                    'errors'=> $validateUser->errors()
                ],401);
            }

            if (Auth::attempt($request->only(['email',Hash::check('password','password')]))){
                return response()->json([
                    'status'=>false,
                    'message'=>'Az email és jelszó nem egyezik egy felhasználóval sem'
                ],401);
            }
            $user = Users::where('email',$request->email)->first();
            return response()->json([
                'status'=>true,
                'message'=>'User logged in successfully',
                'token'=>$user->createToken("API TOKEN")->plainTextToken
            ],200);
        } catch(Throwable $th){
            return response()->json([
                'status'=>false,
                'message'=>$th->getMessage()
            ],500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Users $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsersRequest $request, Users $users)
    {
        $users->update($request->all());
        return response()->json([$users, "msg" => "A felhasználó frissítése sikeresen megtörtént."]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Users $users)
    {
        $users->delete();
        return response()->json([$users, "msg" => "A felhasználó törlése sikeresen megtörtént."]);
    }
    public function restore($user)
    {
        $users = Users::withTrashed()->find($user);
        $users->restore();
        return response()->json([$users, "msg" => "A felhasználó visszaállítása sikeresen megtörtént."]);
    }
}
