<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'destination' => $this->destination,
            'starts_at' => $this->starts_at,
            'ends_at' => $this->ends_at,
            'is_confirmed' => $this->is_confirmed,
            'created_at' => $this->created_at
        ];
    }
}
