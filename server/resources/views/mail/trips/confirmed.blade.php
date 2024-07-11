<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; padding: 24px;">
    <p>Você foi convidado(a) para participar de uma viagem para <strong>{{ $trip->destination }}</strong> nas datas de <strong>{{ $formattedStartDate }}</strong> até <strong>{{ $formattedEndDate }}</strong>.</p>
    <p></p>
    <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
    <p></p>
    <p>
        <a href="{{ $confirmationLink }}">Confirmar presença</a>
    </p>
    <p></p>
    <p>Caso você não saiba do que se trata esse e-mail ou não poderá estar presente, apenas ignore esse e-mail.</p>
</div>