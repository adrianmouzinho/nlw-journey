<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTripRequest;
use App\Http\Requests\UpdateTripRequest;
use App\Http\Resources\TripResource;
use App\Mail\TripConfirmed;
use App\Mail\TripCreated;
use App\Models\Participant;
use App\Models\Trip;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class TripController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTripRequest $request)
    {
        $request->validated();

        if (Carbon::parse($request->starts_at)->isPast()) {
            return response()->json(['error' => 'Invalid trip start date.'], 422);
        }

        if (Carbon::parse($request->ends_at)->isBefore($request->starts_at)) {
            return response()->json(['error' => 'Invalid trip end date.'], 422);
        }

        DB::beginTransaction();

        try {
            $trip = Trip::create([
                'destination' => $request->destination,
                'starts_at' => $request->starts_at,
                'ends_at' => $request->ends_at,
            ]);

            $participants = [];
            $participants[] = [
                'name' => $request->owner_name,
                'email' => $request->owner_email,
                'is_owner' => true,
                'is_confirmed' => true,
                'trip_id' => $trip->id,
            ];

            foreach ($request->emails_to_invite as $email) {
                $participants[] = [
                    'name' => null,
                    'email' => $email,
                    'is_owner' => false,
                    'is_confirmed' => false,
                    'trip_id' => $trip->id,
                ];
            }

            Participant::insert($participants);

            Mail::to($request->owner_email, $request->owner_name)->send(new TripCreated($trip));

            DB::commit();

            return response()->json(['trip_id' => $trip->id], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json(['error' => 'Trip not created.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $tripId)
    {
        $trip = Trip::find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found.'], 404);
        }

        return new TripResource($trip);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, string $tripId)
    {
        $request->validated();

        if (Carbon::parse($request->starts_at)->isPast()) {
            return response()->json(['error' => 'Invalid trip start date.'], 422);
        }

        if (Carbon::parse($request->ends_at)->isBefore($request->starts_at)) {
            return response()->json(['error' => 'Invalid trip end date.'], 422);
        }

        $trip = Trip::find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found.'], 404);
        }

        $trip->destination = $request->destination;
        $trip->starts_at = $request->starts_at;
        $trip->ends_at = $request->ends_at;

        $trip->save();

        return response()->json(['trip_id' => $tripId], 200);
    }

    /**
     * Confirm the specified trip.
     */
    public function confirm(string $tripId)
    {
        $trip = Trip::with(['participants' => function ($query) {
            $query->where('is_owner', false);
        }])->find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found.'], 404);
        }

        if ($trip->is_confirmed) {
            return redirect(config('app.web_url') . "/trips/{$trip->id}");
        }

        $trip->is_confirmed = true;

        $trip->save();

        foreach ($trip->participants as $participant) {
            Mail::to($participant->email)->queue(new TripConfirmed($trip, $participant));
        }

        return redirect(config('app.web_url') . "/trips/{$trip->id}");
    }
}
