<?php

namespace App\Mail;

use App\Models\Participant;
use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TripConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Trip $trip,
        public Participant $participant,
    ) {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('oi@plann.er', 'Equipe plann.er'),
            subject: "Confirme sua presença na viagem para {$this->trip->destination}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $formattedStartDate = Carbon::parse($this->trip->starts_at)->translatedFormat('j \d\e F \d\e Y');
        $formattedEndDate = Carbon::parse($this->trip->ends_at)->translatedFormat('j \d\e F \d\e Y');

        $confirmationLink = "http://localhost:80/api/participants/{$this->participant->id}/confirm";

        return new Content(
            view: 'mail.trips.confirmed',
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
