<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\TripController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/trips', [TripController::class, 'store'])->name('trips.store');
Route::get('/trips', [TripController::class, 'index'])->name('trips.index');
Route::get('/trips/{trip}/confirm', [TripController::class, 'confirm'])->name('trips.confirm');

Route::get('/participants/{participant}/confirm', [ParticipantController::class, 'confirm'])->name('participants.confirm');

Route::post('/trips/{trip}/activities', [ActivityController::class, 'store'])->name('activities.store');
Route::get('/trips/{trip}/activities', [ActivityController::class, 'index'])->name('activities.index');

Route::post('/trips/{trip}/links', [LinkController::class, 'store'])->name('links.store');
Route::get('/trips/{trip}/links', [LinkController::class, 'index'])->name('links.index');
