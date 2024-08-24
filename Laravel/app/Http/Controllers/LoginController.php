<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Egulias\EmailValidator\EmailValidator;
use Illuminate\Support\Facades\Auth;

use DB;
use Session;

use Illuminate\Database\QueryException;

class LoginController extends Controller{
    
    function signup(Request $req)
    {

            $data = $req->json()->all();

            // return $data;

            $name = $data['name'];
            $email = $data['email'];
            $password = $data['password'];
            $userType = $data['userType'];
            $phone = $data['phone'];

            try {
                DB::table('users')->insert(['name' => $name, 'email'=>$email, 'password'=>$password, 'userType'=>$userType, 'phone'=> $phone]);
                
                return json_encode(["status" => "ok", "message" => "Inserted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                if ($e->errorInfo[1] === 1062) {
                    return json_encode(["status" => "error", "message" => 'Duplicate entry found.']);
                }
                return json_encode(["status" => "error", "message" => $e->getMessage()]);
            }

    }

    public function logout(Request $request ) {
        $request->session()->flush();
        Auth::logout();
        return Redirect('/');
        
    }

    function login(Request $req)
    {

        $data = $req->json()->all();

        $row = DB::table('users')->select()->where('email', $data["email"])->get()->first();

        if($row){
            if($row->password ==  $data["password"]){
                // $req->session()->put('userId', $row->userId);
                // $req->session()->put('user', $row->name);
                // $req->session()->put('email', $row->email);
                // $req->session()->put('userType', $row->userType);
                // $req->session()->put('phone', $row->phone);
                // $req->session()->put('address', $row->address);
                // $req->session()->put('loggedIn', true);

                return json_encode(["status" => "redirect", "message" => $row]);
            }
            else{
                return json_encode(["status" => "error", "message" => "'Incorrect password'"]);
            }
        }
        else{
            return json_encode(["status" => "error", "message" => "'User not found'"]);
        }

        
    }

    function forgot(Request $req)
    {

        $data = $req->json()->all();

        $row = DB::table('users')->select()->where('email', $data["email"])->get()->first();

        if($row){
            try {
                DB::table('users')->where('email',$data["email"])->update(['password'=>$data["password"]]);

                return json_encode(["status" => "ok", "message" => "Reset successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                
                return json_encode(["status" => "error", "message" => $e->getMessage()]);
            }
               
        }
        else{
            return json_encode(["status" => "error", "message" => "'User not found'"]);
        }

        
    }

}