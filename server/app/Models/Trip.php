<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination',
        'starts_at',
        'ends_at',
        'is_confirmed'
    ];

    public function participants(): HasMany
    {
        return $this->hasMany(Participant::class);
    }
}
