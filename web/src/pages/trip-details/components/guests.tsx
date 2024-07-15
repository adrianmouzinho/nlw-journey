import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircleDashed, CheckCircle2, UserCog } from 'lucide-react'

import { Button } from '../../../components/button'
import { api } from '../../../lib/axios'

interface Participant {
  id: number
  name: string | null
  email: string
  is_confirmed: 0 | 1
}

export function Guests() {
  const { tripId } = useParams()

  const [participants, setParticipants] = useState<Participant[] | undefined>()

  useEffect(() => {
    api.get(`trips/${tripId}/participants`).then(response => setParticipants(response.data.data))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold leading-none -tracking-[0.02em]">Convidados</h3>

      <div className="space-y-5">
        {participants && participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-100 font-medium leading-none -tracking-[0.02]">{participant.name ?? `Convidado ${index}`}</span>
                <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">{participant.email}</span>
              </div>

              {!!participant.is_confirmed ? (
                <CheckCircle2 className="size-5 text-lime-300" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400" />
              )}
            </div>
          )
        })}
      </div>

      <Button variant="secondary" className="w-full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}