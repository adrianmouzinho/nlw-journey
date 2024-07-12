<?php

namespace App\Mail;

use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TripCreated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Trip $trip,
    ) {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('oi@plann.er', 'Equipe plann.er'),
            subject: "Confirme sua viagem para {$this->trip->destination}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $formattedStartDate = Carbon::parse($this->trip->starts_at)->translatedFormat('j \d\e F \d\e Y');
        $formattedEndDate = Carbon::parse($this->trip->ends_at)->translatedFormat('j \d\e F \d\e Y');

        $confirmationLink = config('app.url') . "/api/trips/{$this->trip->id}/confirm";

        return new Content(
            view: 'mail.trips.created',
            with: [
                'formattedStartDate' => $formattedStartDate,
                'formattedEndDate' => $formattedEndDate,
                'confirmationLink' => $confirmationLink,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
