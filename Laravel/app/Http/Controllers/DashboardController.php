<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use DB;
use Session;
use Carbon\Carbon;

class DashboardController extends Controller
{
    function action(Request $req)
    {

        $data = $req->json()->all();

        if($data['method'] == 'fetch-healthRecords'){
            try {
                $row = DB::table('healthRecord')
                        ->select('patientID','patient', DB::raw('count(*) as records'))
                        ->groupBy('patientID')
                        ->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-prescriptions'){
            try {
                $row = DB::table('prescription')
                        ->select('patientID','patient', DB::raw('count(*) as prescriptions'))
                        ->groupBy('patientID')
                        ->where('doctorID', $data['id'])
                        ->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-patients'){
            try {

                $row = DB::table('users')->select('userId','name','email','phone')->where('userType', 'patient')->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-doctors'){
            try {

                $row = DB::table('users')->select('userId','name','email','phone')->where('userType', 'doctor')->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-wards'){
            try {

                $row = DB::table('facility')->get();
                return json_encode(["status" => "ok", "message" => $row ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-prescriptions-ratio'){
            try {
                $startDate = Carbon::now()->subDays(7)->toDateString(); 
                $endDate = Carbon::now()->toDateString(); 
                $rows = DB::table('prescription')
                        ->select('date', DB::raw('count(*) as prescriptions'))
                        ->where('doctorID', $data['id'])
                        ->whereDate('date', '>=', $startDate)
                        ->whereDate('date', '<=', $endDate)
                        ->groupBy('date')
                        ->orderBy('date')
                        ->get();

                $prescriptionCounts = [];

                // Get the date range for the last 7 days
                $dates = [];
                for ($i = 6; $i >= 0; $i--) {
                    $dates[] = "D-" . $i; // Store labels instead of actual dates
                }

                // Initialize the prescription counts array with zero counts for each day
                foreach ($dates as $date) {
                    $prescriptionCounts[$date] = 0;
                }

                // Process the database result to populate the prescription counts array
                foreach ($rows as $row) {
                    // Convert date to string to ensure consistency
                    $date = "D-" . Carbon::parse($row->date)->diffInDays(Carbon::now()); // Calculate days difference
                    // Increment the count for the corresponding day
                    $prescriptionCounts[$date] += $row->prescriptions;
                }

                // Format the result array to match the expected structure
                $result = [];
                foreach ($prescriptionCounts as $date => $count) {
                    $result[] = [
                        'date' => $date,
                        'prescriptions' => $count
                    ];
                }

                return json_encode(["status" => "ok", "message" => $result]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-appointments-ratio'){
            try {
                $startDate = Carbon::now()->subDays(7)->toDateString(); 
                $endDate = Carbon::now()->toDateString(); 
                $rows = DB::table('appointment')
                        ->select('date', DB::raw('count(*) as prescriptions'))
                        ->where('doctorID', $data['id'])
                        ->whereDate('date', '>=', $startDate)
                        ->whereDate('date', '<=', $endDate)
                        ->groupBy('date')
                        ->orderBy('date')
                        ->get();

                $prescriptionCounts = [];

                // Get the date range for the last 7 days
                $dates = [];
                for ($i = 6; $i >= 0; $i--) {
                    $dates[] = "D-" . $i; // Store labels instead of actual dates
                }

                // Initialize the prescription counts array with zero counts for each day
                foreach ($dates as $date) {
                    $prescriptionCounts[$date] = 0;
                }

                // Process the database result to populate the prescription counts array
                foreach ($rows as $row) {
                    // Convert date to string to ensure consistency
                    $date = "D-" . Carbon::parse($row->date)->diffInDays(Carbon::now()); // Calculate days difference
                    // Increment the count for the corresponding day
                    $prescriptionCounts[$date] += $row->prescriptions;
                }

                // Format the result array to match the expected structure
                $result = [];
                foreach ($prescriptionCounts as $date => $count) {
                    $result[] = [
                        'date' => $date,
                        'prescriptions' => $count
                    ];
                }

                return json_encode(["status" => "ok", "message" => $result]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-wards-ratio'){
            try {
                $wardTypes = ['General Ward', 'Semi-Private Room', 'Private Room', 'Deluxe/Executive Suite'];
                $wardCounts = [];
                foreach ($wardTypes as $wardType) {
                    $rows = DB::table('facility')
                        ->where('ward', $wardType)
                        ->get();

                        $wardCounts[] = [
                            "ward" => $wardType,
                            "count" => count($rows)
                        ];
                }

                return json_encode(["status" => "ok", "message" => $wardCounts ]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }

        else if($data['method'] == 'fetch-patients-ratio'){
            try {
                $startDate = Carbon::now()->subDays(7)->toDateString(); 
                $endDate = Carbon::now()->toDateString(); 
                $rows = DB::table('appointment')
                        ->select('date', DB::raw('count(*) as prescriptions'))
                        ->whereDate('date', '>=', $startDate)
                        ->whereDate('date', '<=', $endDate)
                        ->groupBy('date')
                        ->orderBy('date')
                        ->get();

                $prescriptionCounts = [];

                // Get the date range for the last 7 days
                $dates = [];
                for ($i = 6; $i >= 0; $i--) {
                    $dates[] = "D-" . $i; // Store labels instead of actual dates
                }

                // Initialize the prescription counts array with zero counts for each day
                foreach ($dates as $date) {
                    $prescriptionCounts[$date] = 0;
                }

                // Process the database result to populate the prescription counts array
                foreach ($rows as $row) {
                    // Convert date to string to ensure consistency
                    $date = "D-" . Carbon::parse($row->date)->diffInDays(Carbon::now()); // Calculate days difference
                    // Increment the count for the corresponding day
                    $prescriptionCounts[$date] += $row->prescriptions;
                }

                // Format the result array to match the expected structure
                $result = [];
                foreach ($prescriptionCounts as $date => $count) {
                    $result[] = [
                        'date' => $date,
                        'count' => $count
                    ];
                }

                return json_encode(["status" => "ok", "message" => $result]);

            } catch(\Illuminate\Database\QueryException $e){
                return json_encode(["status" => "error", "message" => $e]);
            }
        }
    }
}
