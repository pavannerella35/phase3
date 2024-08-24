<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class UsersController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();

        if($data['method'] == 'delete'){
            try {
                DB::table('users')->where('userId', $data['id'])->delete();
                return json_encode(["status" => "ok", "message" => "Deleted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
        
        else if($data['method'] == 'update'){
            try {
                DB::table('users')->where('userId',$data["id"])->update([ 'phone' => $data["phone"] ,'address' => $data["address"] ]);
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'update-program'){
            try {
                DB::table('users')->where('userId',$data["id"])->update(['programId' => $data["programId"] ]);
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'update-admin'){
            $id = $data["id"];
            $phone = $data['phone'];
            $address = $data['address'];
            $active = $data['active'];
            try {
                DB::table('users')->where('userId',$data["id"])->update([ 'phone' => $phone, 'address' => $address, 'active' => $active]);
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'add'){
            $name = $data['name'];
            $email = $data['email'];
            $phone = $data['phone'];
            $password = $data['password'];
            $userType = $data['userType'];

            try {
                DB::table('users')->insert(['name' => $name, 'email'=>$email, 'password'=>$password, 'phone'=>$phone, 'userType'=>$userType]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch'){
            try {
                $row = DB::table('users')->select()->where('userType', $data["userType"])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-all'){
            try {
                $row = DB::table('users')->select()->whereNotIn('userType', ['admin','doctor'])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-email'){
            try {

                $row = DB::table('users')->select()->where('email', $data['email'])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-id'){
            try {

                $row = DB::table('users')->select()->where('userId', $data['userId'])->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-current-user'){
            try {

                $row = DB::table('users')->select()->where('userId', Session::get('userId'))->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

    }
}
