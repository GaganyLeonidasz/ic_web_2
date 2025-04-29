<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Saves;
use App\Models\Users;
use App\Http\Requests\StoreSavesRequest;
use App\Http\Requests\UpdateSavesRequest;

class SavesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Users $user)
    {
        $allsaves = Saves::all();
        $saves = $allsaves->where('userId'== "$user->id");
        return response()->json([$saves, "msg" => "A mentés lekérése sikeresen megtörtént."]);
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
    public function store(StoreSavesRequest $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Saves $saves)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Saves $saves)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSavesRequest $request, Saves $saves)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Saves $saves)
    {
        $saves->delete();
        return response()->json([$saves, "msg" => "A mentés törlése sikeresen megtörtént."]);
    }
    public function restore($save)
    {
        $saves = Saves::withTrashed()->find($save);
        $saves->restore();
        return response()->json([$saves, "msg" => "A mentés visszaállítása sikeresen megtörtént."]);
    }
}
