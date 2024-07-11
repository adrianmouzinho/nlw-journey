<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; padding: 24px;">
    <p>Você solicitou a criação de uma viagem para <strong>{{ $trip->destination }}</strong> nas datas de <strong>{{ $formattedStartDate }}</strong> até <strong>{{ $formattedEndDate }}</strong>.</p>
    <p></p>
    <p>Para confirmar sua viagem, clique no link abaixo:</p>
    <p></p>
    <p>
        <a href="{{ $confirmationLink }}">Confirmar viagem</a>
    </p>
    <p></p>
    <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
</div>