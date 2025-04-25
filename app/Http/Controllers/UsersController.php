<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Http\Requests\StoreUsersRequest;
use App\Http\Requests\UpdateUsersRequest;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = Users::all();
        return response()->json([$users, "msg" => "A felhasználók lekérése sikeresen megtörtént."]);
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
    public function store(StoreUsersRequest $request)
    {
        $user = Users::create($request->all());
        return response()->json([$user, "msg" => "Hozzáadás sikeresen megtörtént."]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Users $users)
    {
        //
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
