<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\LinkController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\TripController;
use Illuminate\Support\Facades\Route;

Route::post('/trips', [TripController::class, 'store'])->name('trips.store');
Route::put('/trips/{trip}', [TripController::class, 'update'])->name('trips.update');
Route::get('/trips/{trip}', [TripController::class, 'show'])->name('trips.show');
Route::get('/trips/{trip}/confirm', [TripController::class, 'confirm'])->name('trips.confirm');

Route::post('/trips/{trip}/invites', [ParticipantController::class, 'invite'])->name('participants.invite');
Route::get('/trips/{trip}/participants', [ParticipantController::class, 'index'])->name('participants.index');
Route::get('/participants/{participant}/confirm', [ParticipantController::class, 'confirm'])->name('participants.confirm');
Route::get('/participants/{participant}', [ParticipantController::class, 'show'])->name('participants.show');

Route::post('/trips/{trip}/activities', [ActivityController::class, 'store'])->name('activities.store');
Route::get('/trips/{trip}/activities', [ActivityController::class, 'index'])->name('activities.index');

Route::post('/trips/{trip}/links', [LinkController::class, 'store'])->name('links.store');
Route::get('/trips/{trip}/links', [LinkController::class, 'index'])->name('links.index');
