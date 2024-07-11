<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Participant $participant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        //
    }

    /**
     * Confirm the specified trip.
     */
    public function confirm(string $participantId)
    {
        $participant = Participant::find($participantId);

        if (!$participant) {
            return response()->json(['error' => 'Participant not found'], 404);
        }

        if ($participant->is_confirmed) {
            return redirect("http://localhost:3000/trips/{$participant->trip_id}");
        }

        $participant->is_confirmed = true;

        $participant->save();

        return redirect("http://localhost:3000/trips/{$participant->trip_id}");
    }
}
