<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLinkRequest;
use App\Http\Resources\LinkResource;
use App\Models\Link;
use App\Models\Trip;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $tripId)
    {
        $trip = Trip::with('links')->find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found'], 404);
        }

        return LinkResource::collection($trip->links);
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
    public function store(StoreLinkRequest $request, string $tripId)
    {
        $request->validated();

        $trip = Trip::find($tripId);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found'], 404);
        }

        $link = Link::create([
            'title' => $request->title,
            'url' => $request->url,
            'trip_id' => $tripId,
        ]);

        return response()->json(['link_id' => $link->id], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Link $link)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        //
    }
}
