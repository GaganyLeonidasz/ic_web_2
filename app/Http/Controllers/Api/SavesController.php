<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Saves;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class SavesController extends Controller
{
    public function index()
    {
        $user_id= Auth::id();
        $saves = Saves::where("users_Id",$user_id)->get()->map(function($save){
            $save->save = $save->save ? asset("storage/".$save->save):null;
            return $save;
        });
        return response()->json([
            "status"=>true, 
            "saves" => $saves
        ]);
    }
    public function store(Request $request)
    {
        try {
            $data["users_Id"] = Auth::id();
            $data["save"] = $request->file("bannerInput")->store("save", "public");

            Saves::create($data);
            return response()->json([
                "status" => true,
                "message" => "Save successfully created"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => "Hiba történt: " . $e->getMessage()
            ], 500);
        }
    }
    public function show(Saves $saves)
    {
        return response()->json([
        "status"=>true,
        "message" => "Got the save's data.",
        "saves"=>$saves
        ]);
    }
    public function destroy(Saves $saves)
    {
        $saves->delete();
        return response()->json([
        "status"=>true,
        "message" => "Save deleted successfully."]);
    }
    public function restore(Saves $save)
    {
        $saves = Saves::withTrashed()->find($save);
        $saves->restore();
        return response()->json([
        "status"=>true,
        "message" => "Save restored successfully.",
        "saves"=>$saves,]);
    }
}
