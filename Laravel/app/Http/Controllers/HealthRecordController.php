<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class HealthRecordController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('healthRecord')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update-patient'){
            $id = $data["id"];
            $toDate = $data['toDate'];
            $fromDate = $data['fromDate'];

            try {
                if($fromDate != null && $toDate != null)
                {
                    DB::table('healthRecord')->where('id',$data["id"])->update([ 'toDate'=>$toDate, 'fromDate' => $fromDate, 'reason' => $data['reason'], 'medicine' => $data['medicine'] ]);
                }
                
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        

        else if($data['method'] == 'add'){
            
            try {
                $id = DB::table('healthRecord')->insertGetId(['toDate' => $data['toDate'], 'fromDate' => $data['fromDate'], 'patient' => $data['patient'], 'patientID' => $data['patientID'], 'doctorID' => $data['doctorID'], 'doctor' => $data['doctor'], 'reason' => $data['reason'], 'medicine' => $data['medicine']]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully", "id" => $id]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

  

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('healthRecord')->select()->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-id'){
            try {
                $row = DB::table('healthRecord')->select()->where('id',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-patient'){
            try {
                $row = DB::table('healthRecord')->select()->where('patientID',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
    }
}
