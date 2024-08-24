<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class ComplianceController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('compliance')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update'){
            try {
                 $description = $data['description'];
                DB::table('compliance')->where('id',$data["id"])->update([ 'description'=>$description ]);
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

       
        else if($data['method'] == 'add'){
            $type = $data['type'];
            $description = $data['description'];
            $applyTo = $data['applyTo'];

            try {
                DB::table('compliance')->insert(['type' => $type, 'description'=>$description, 'appliesTo'=>$applyTo ]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('compliance')->select()->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        

    }
}
