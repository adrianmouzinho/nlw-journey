<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InviteParticipantRequest;
use App\Http\Resources\ParticipantResource;
use App\Mail\TripConfirmed;
use App\Models\Participant;
use App\Models\Trip;
use Illuminate\Support\Facades\Mail;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $tripId)
    {
        $trip = Trip::with('participants')->find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found.'], 404);
        }

        return ParticipantResource::collection($trip->participants);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $participantId)
    {
        $participant = Participant::find($participantId);

        if (!$participant) {
            return response()->json(['error' => 'Participant not found.'], 404);
        }

        return new ParticipantResource($participant);
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
            return redirect(config('app.web_url') . "/trips/{$participant->trip_id}");
        }

        $participant->is_confirmed = true;

        $participant->save();

        return redirect(config('app.web_url') . "/trips/{$participant->trip_id}");
    }

    /**
     * Invite to the specified trip.
     */
    public function invite(InviteParticipantRequest $request, string $tripId)
    {
        $request->validated();

        $trip = Trip::find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found.'], 404);
        }

        $participant = Participant::create([
            'email' => $request->email,
            'trip_id' => $tripId,
        ]);

        Mail::to($request->email)->send(new TripConfirmed($trip, $participant));

        return response()->json(['participant_id' => $participant->id], 200);
    }
}
