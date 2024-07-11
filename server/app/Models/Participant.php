<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'name',
        'email',
        'is_confirmed',
        'is_owner',
    ];

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
