<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class SymptomController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('symptoms')->where('id', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        // else if($data['method'] == 'update'){
        //     $id = $data["id"];
        //     $dueDate = $data['dueDate'];
        //     $description = $data['description'];
        //     $constraints = $data['constraints'];

        //     try {
        //         if($dueDate != null)
        //         {
        //             DB::table('symptoms')->where('id',$data["id"])->update([ 'dueDate'=>$dueDate, 'description'=>$description, 'constraints'=>$constraints ]);
        //         }
        //         else
        //         {
        //             DB::table('symptoms')->where('id',$data["id"])->update([ 'description'=>$description, 'constraints'=>$constraints ]);
        //         }
        //         return json_encode(["status" => "ok", "message" => "Updated successfully"]);
        //     } catch(\Illuminate\Database\QueryException $e){
        //         return json_encode(["status" => "error", "message" => $e]);
        //     }
        // }
        

        // else if($data['method'] == 'add'){
            
        //     try {
        //         $courseId = DB::table('symptoms')->insertGetId(['name' => $data['name'], 'programId' => $data['programId'], 'courseId' => $data['courseId']]);
        //         return json_encode(["status" => "ok", "message" => "Inserted successfully", "id" => $courseId]);
        //     } catch(\Illuminate\Database\QueryException $e){
        //         return json_encode(["status" => "error", "message" => $e]);
        //     }
        // }

  

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('symptoms')->select()->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-id'){
            try {
                $row = DB::table('symptoms')->select()->where('id',$data["id"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
    }
}
