<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\SymptomController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\ComplianceController;
use App\Http\Controllers\DashboardController;


use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;


Route::middleware('cors')->post('/signup', [LoginController::class, 'signup']);

Route::middleware('cors')->post('/login', [LoginController::class, 'login']);

Route::middleware('cors')->post('/forgot', [LoginController::class, 'forgot'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/users', [UsersController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/symptom', [SymptomController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/prescription', [PrescriptionController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/appointment', [AppointmentController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/healthRecord', [HealthRecordController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/medicine', [MedicineController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/chats', [ChatsController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/facility', [FacilityController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/compliance', [ComplianceController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::middleware('cors')->post('/dashboard', [DashboardController::class, 'action'])
    ->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);