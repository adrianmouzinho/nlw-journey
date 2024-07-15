import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-day-picker'

import { InviteGuestsModal } from './components/invite-guests-modal'
import { ConfirmTripModal } from './components/confirm-trip-modal'
import { DestinationAndDateStep } from './components/destination-and-date-step'
import { InviteGuestsStep } from './components/invite-guests-step'
import { api } from '../../lib/axios'
import { format } from 'date-fns'

export function CrateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState(['maria@gmail.com', 'joao@gmai.com'])
  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [startAndEndDates, setStartAndEndDates] = useState<DateRange | undefined>()

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite((prev) => [...prev, email])
    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite((prev) => prev.filter((email) => email !== emailToRemove))
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()

    if (!name || !email) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: format(startAndEndDates?.from!, 'yyyy-MM-dd HH:mm:ss'),
      ends_at: format(startAndEndDates?.to || startAndEndDates?.from!, 'yyyy-MM-dd HH:mm:ss'),
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    })

    const { trip_id } = response.data

    navigate(`/trips/${trip_id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero bg-center bg-no-repeat">
      <div className="max-w-[768px] w-full px-6 space-y-10">
        <div className="space-y-2 text-center">
          <img src="/logo.svg" alt="Logotipo do NLW Journey" className="mx-auto" />
          <p className="text-zinc-300 text-lg leading-[1.4] -tracking-[0.02em]">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            destination={destination}
            setStartAndEndDates={setStartAndEndDates}
            startAndEndDates={startAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm leading-[1.4] tracking-[-0.0175em] text-center">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
          closeGuestsModal={closeGuestsModal}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          closeConfirmTripModal={closeConfirmTripModal}
          setOwnerName={setOwnerName}
          ownerName={ownerName}
          setOwnerEmail={setOwnerEmail}
          ownerEmail={ownerEmail}
        />
      )}
    </div>
  )
}
