<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;
use Carbon\Carbon;

class PrescriptionController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('prescription')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update-doctor'){
            
            $TillDate = $data['TillDate'];
            $morning = $data['Morning'] == '1' ? 1 : 0;
            $afternoon = $data['afternoon'] == '1' ? 1 : 0;
            $night = $data['night'] == '1' ? 1 : 0;

            try {
                if($TillDate != null)
                {
                    DB::table('prescription')->where('id',$data["id"])->update([ 'TillDate' => $data['TillDate'], 'Morning' => $morning, 'afternoon' => $afternoon, 'night' => $night ]);
                }
                else
                {
                    DB::table('prescription')->where('id',$data["id"])->update([ 'Morning' => $morning, 'afternoon' => $afternoon, 'night' => $night ]);
                }
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        

        else if($data['method'] == 'add'){
            
            try {
                $morning = $data['morning'] == '1' ? 1 : 0;
                $afternoon = $data['afternoon'] == '1' ? 1 : 0;
                $night = $data['night'] == '1' ? 1 : 0;

                if($data['tillDate'] != null)
                {
                    $id = DB::table('prescription')->insertGetId(['doctor' => $data['doctor'], 'doctorID' => $data['doctorID'], 'patientID' => $data['patientID'], 'patient' => $data['patient'],'date' => date("Y-m-d"), 'tillDate' => $data['tillDate'], 'medicationID' => $data['medicineID'], 'medicine' => $data['medicine'], 'Morning' => $morning, 'afternoon' => $afternoon, 'night' => $night, 'reason' => $data['reason']]);
                }
                else
                {
                    $id = DB::table('prescription')->insertGetId(['doctor' => $data['doctor'], 'doctorID' => $data['doctorID'], 'patientID' => $data['patientID'], 'patient' => $data['patient'],'date' => date("Y-m-d"), 'medicationID' => $data['medicineID'], 'medicine' => $data['medicine'], 'Morning' => $morning, 'afternoon' => $afternoon, 'night' => $night, 'reason' => $data['reason']]);
                }
                return json_encode(["status" => "ok", "message" => "Inserted successfully", "id" => $id]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

  

        else if($data['method'] == 'fetch-patient'){
            try {
                $row = DB::table('prescription')->select()->where('patientID', $data['id'])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-doctor'){
            try {
                $row = DB::table('prescription')->select()->where('doctorID', $data['id'])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-patient-today'){
            try {
                $row = DB::table('prescription')
                ->select()
                ->where('patientID', $data['id'])
                ->whereRaw('DATE(TillDate) > ?', [Carbon::today()->toDateString()])
                ->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-id'){
            try {
                $row = DB::table('prescription')->select()->where('id',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
    }
}
