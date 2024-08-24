<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class AppointmentController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('appointment')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update-patient'){
            $id = $data["id"];
            $date = $data['date'];
            $time = $data['time'];

            try {
                if($date != null)
                {
                    DB::table('appointment')->where('id',$data["id"])->update([ 'date'=>$date, 'time'=>$time ]);
                }
                
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'update-doctor'){
            $id = $data["id"];
            $type = $data['type'];
            $value = $type == 'confirm' ? 1 : 0; 

            try {
                
                DB::table('appointment')->where('id',$data["id"])->update(['confirmed' => $value ]);
                
                
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        

        else if($data['method'] == 'add'){
            
            try {
                $id = DB::table('appointment')->insertGetId(['date' => $data['date'], 'time' => $data['time'], 'patient' => $data['patient'], 'patientID' => $data['patientID'], 'doctorID' => $data['doctorID'], 'doctor' => $data['doctor']]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully", "id" => $id]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

  

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('appointment')->select()->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-id'){
            try {
                $row = DB::table('appointment')->select()->where('id',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-patient'){
            try {
                $row = DB::table('appointment')->select()->where('patientID',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

         else if($data['method'] == 'fetch-doctor'){
            try {
                $row = DB::table('appointment')->select()->where('doctorID',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
    }
}
