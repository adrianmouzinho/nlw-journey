<?php

use App\Http\Controllers\Api\TripController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('trips', TripController::class)->except([
    'create', 'show', 'edit', 'update', 'destroy'
]);

Route::get('/trips/{trip}/confirm', [TripController::class, 'confirm'])->name('trips.confirm');
