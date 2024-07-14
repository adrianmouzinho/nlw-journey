import { ArrowRight, UserRoundPlus } from 'lucide-react'

import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  emailsToInvite: string[]
  openGuestsModal: () => void
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({ emailsToInvite, openGuestsModal, openConfirmTripModal }: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl shadow-shape flex items-center gap-5">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1 text-lg leading-[1.4] outline-none"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100">
            {`${emailsToInvite.length} pessoa${emailsToInvite.length > 1 ? 's' : ''} convidada${emailsToInvite.length > 1 ? 's' : ''}`}
          </span>
        ) : <span className="text-zinc-400">Quem estará na viagem?</span>}
      </button>

      <Button size="sm" onClick={openConfirmTripModal} disabled={emailsToInvite.length === 0}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}