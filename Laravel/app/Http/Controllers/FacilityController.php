<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class FacilityController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('facility')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update'){
            try {
                 $roomDesc = $data['roomDesc'];;
                $capacity = $data['capacity'];
                $charges = $data['charges'];
                $available = $data['available'];
                DB::table('facility')->where('id',$data["id"])->update([ 'roomDesc'=>$roomDesc, 'available'=>$available, 'capacity'=>$capacity, 'charges'=>$charges  ]);
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

       
        else if($data['method'] == 'add'){
            $ward = $data['ward'];
            $roomDesc = $data['roomDesc'];
            $roomNumber = $data['roomNumber'];
            $capacity = $data['capacity'];
            $charge = $data['charge'];

            try {
                DB::table('facility')->insert(['ward' => $ward, 'roomDesc'=>$roomDesc, 'roomNumber'=>$roomNumber, 'capacity'=>$capacity, 'charges'=>$charge]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('facility')->select()->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        

    }
}
