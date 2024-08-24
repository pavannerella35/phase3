<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class MedicineController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('medicine')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update'){
            $id = $data["id"];
            $date = $data['date'];
            $time = $data['time'];

            try {
                if($date != null)
                {
                    DB::table('medicine')->where('id',$data["id"])->update([ 'date'=>$date, 'time'=>$time ]);
                }
                
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }


        else if($data['method'] == 'add'){
            
            try {
                $id = DB::table('medicine')->insertGetId(['name' => $data['name'], 'price' => $data['price'] ]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully", "id" => $id]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

  

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('medicine')->select()->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-id'){
            try {
                $row = DB::table('medicine')->select()->where('id',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

    }
}
