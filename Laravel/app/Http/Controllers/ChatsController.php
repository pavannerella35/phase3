<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;

class ChatsController extends Controller
{
    function action(Request $req)
    {
        $data = $req->json()->all();
        // if($data['method'] == 'fetch-chat-list'){
        //     try {
        //         $chat = DB::table('chat')->select()->where('fromId',Session::get('userId'))->where('toId', $data['recipientId'])->orWhere('toId', Session::get('userId'))->where('fromId', $data['recipientId'])->get();
        //         return json_encode(["status" => "ok", "chat" => $chat ]);
        //     } catch(\Illuminate\Database\QueryException $e){
        //         return json_encode(["status" => "error", "message" => $e]);
        //     }
        // }

        // else if($data['method'] == 'add'){
        //     try {
        //         DB::table('chat')->insert(['fromId' => Session::get('userId'), 'toId' => $data['toId'], 'message' => $data['message'], 'messageDate' => date("d/m/Y g:i a"), 'fromUser' => Session::get('user'), 'toUser' => $data['toUser']]);
        //         return json_encode(["status" => "ok", "message" => "Inserted successfully"]);
        //     } catch(\Illuminate\Database\QueryException $e){
        //         return json_encode(["status" => "error", "message" => $e]);
        //     }
        // }

        if($data['method'] == 'update-read'){
            try {
                DB::table('chat')->where('toId',$data['userId'])->where('fromId',$data['recipientId'])->update(['new' => 0 ]);
                return json_encode(["status" => "ok", "message" => "Updated successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-chat-list'){
            try {
                $chat = DB::table('chat')->select()->where('fromId',$data['userId'])->where('toId', $data['recipientId'])->orWhere('toId', $data['userId'])->where('fromId', $data['recipientId'])->get();
                return json_encode(["status" => "ok", "chat" => $chat ]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'add'){
            try {
                

                DB::table('chat')->insert(['fromId' => $data['fromId'], 'toId' => $data['toId'], 'message' => $data['message'], 'messageDate' => date("d/m/Y g:i a"), 'fromUser' => Session::get('fromUser'), 'toUser' => $data['toUser']]);
                return json_encode(["status" => "ok", "message" => "Inserted successfully"]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-user-list'){
            try {

                 $row = DB::table('users')->select()->where('userId', '!=',$data['userId'])->get();
                return json_encode(["status" => "ok", "users" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-new-chat'){
            try {
                $userId = $data['userId'];
                $newChat = DB::table('chat')->select('fromId', 'toId', 'messageDate','message')->groupBy('fromId')->distinct()->where('toId', 'LIKE', "%{$userId}%")->where('new','LIKE', 1)->get();

                return json_encode(["status" => "ok", "users" => $newChat ]);
            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
    }
}
