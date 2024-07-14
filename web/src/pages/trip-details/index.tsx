import { FormEvent, useState } from 'react'
import { Plus } from 'lucide-react'

import { CreateActivityModal } from './components/create-activity-modal'
import { CreateLinkModal } from './components/create-link-modal'
import { ConfirmParticipationModal } from './components/confirm-participation-modal'
import { ImportantLinks } from './components/important-links'
import { Guests } from './components/guests'
import { Activities } from './components/activities'
import { DestinationAndDate } from './components/destination-and-date'
import { Button } from '../../components/button'

export function TripDetailsPage() {
  // const [activities, setActivities] = useState()
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [isConfirmParticipationModalOpen, setIsConfirmParticipationModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  function openConfirmParticipationModal() {
    setIsConfirmParticipationModalOpen(true)
  }

  function closeConfirmParticipationModal() {
    setIsConfirmParticipationModalOpen(false)
  }

  function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const occursAt = data.get('occurs_at')?.toString()

    if (!title || !occursAt) {
      return
    }

    console.log({ title, occursAt })

    closeCreateActivityModal()
  }

  function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    if (!title || !url) {
      return
    }

    console.log({ title, url })

    closeCreateLinkModal()
  }

  function confirmParticipation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()

    if (!name || !email) {
      return
    }

    console.log({ name, email })

    closeConfirmParticipationModal()
  }

  return (
    <div className="max-w-[1148px] w-full mx-auto px-6 py-10 space-y-8">
      <DestinationAndDate />

      <main className="grid lg:grid-cols-[1fr_320px] gap-16 px-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[2rem] font-semibold leading-none -tracking-[0.02em]">Atividades</h2>
            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />
          <div className="h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          createActivity={createActivity}
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          createLink={createLink}
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}

      {isConfirmParticipationModalOpen && (
        <ConfirmParticipationModal
          confirmParticipation={confirmParticipation}
          closeConfirmParticipationModal={closeConfirmParticipationModal}
        />
      )}
    </div>
  )
}