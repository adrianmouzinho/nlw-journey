<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActivityRequest;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $tripId)
    {
        $trip = Trip::with(['activities' => function ($query) {
            $query->orderBy('occurs_at', 'asc');
        }])->find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found'], 404);
        }

        $differenceInDaysBetweenTripStartAndEnd = Carbon::parse($trip->starts_at)->diffInDays($trip->ends_at);

        $activities = [];

        for ($i = 0; $i < (int) ceil($differenceInDaysBetweenTripStartAndEnd) + 1; $i++) {
            $date = Carbon::parse($trip->starts_at)->copy()->addDays($i);

            $filteredActivities = $trip->activities->filter(function (Activity $activity) use ($date) {
                return Carbon::parse($activity->occurs_at)->isSameDay($date);
            });

            $activities[] = [
                'date' => $date->toDateTimeString(),
                'activities' => $filteredActivities->toArray(),
            ];
        }

        return ActivityResource::collection($activities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityRequest $request, string $tripId)
    {
        $request->validated();

        $trip = Trip::find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found'], 404);
        }

        if (Carbon::parse($request->occurs_at)->isBefore($trip->starts_at)) {
            return response()->json(['error' => 'Invalid activity date.'], 422);
        }

        if (Carbon::parse($request->occurs_at)->isAfter($trip->ends_at)) {
            return response()->json(['error' => 'Invalid activity date.'], 422);
        }

        $activity = Activity::create([
            'title' => $request->title,
            'occurs_at' => $request->occurs_at,
            'trip_id' => $trip->id,
        ]);

        return response()->json(['activity_id' => $activity->id], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }
}
