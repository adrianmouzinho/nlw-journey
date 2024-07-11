<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTripRequest;
use App\Http\Resources\TripResource;
use App\Mail\TripConfirmed;
use App\Mail\TripCreated;
use App\Models\Participant;
use App\Models\Trip;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trips = Trip::all();
        return TripResource::collection($trips);
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
    public function store(StoreTripRequest $request)
    {
        $request->validated();

        if (Carbon::parse($request->starts_at)->isPast()) {
            return response()->json(['error' => 'Invalid trip start date.'], 422);
        }

        if (Carbon::parse($request->ends_at)->isBefore($request->starts_at)) {
            return response()->json(['error' => 'Invalid trip end date.'], 500);
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
    public function show(Trip $trip)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trip $trip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trip $trip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip)
    {
        //
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
            return response()->json(['error' => 'Trip not found'], 404);
        }

        if ($trip->is_confirmed) {
            return redirect("http://localhost:3000/trips/{$trip->id}");
        }

        $trip->is_confirmed = true;

        $trip->save();

        foreach ($trip->participants as $participant) {
            Mail::to($participant->email)->queue(new TripConfirmed($trip, $participant));
        }

        return redirect("http://localhost:3000/trips/{$trip->id}");
    }
}
