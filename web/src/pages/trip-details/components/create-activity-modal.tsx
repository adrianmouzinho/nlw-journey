import { FormEvent, useEffect, useState } from 'react'
import { Calendar, Clock, Tag, X } from 'lucide-react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { useParams } from 'react-router-dom'
import { ptBR } from 'date-fns/locale'
registerLocale('ptBR', ptBR)

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../components/button'
import { api } from '../../../lib/axios'
import { formatDate } from '../../../utils/format-date'

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({ closeCreateActivityModal }: CreateActivityModalProps) {
  const { tripId } = useParams()

  const [trip, setTrip] = useState<Trip>()

  const [isVisible, setIsVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [activityDay, setActivityDay] = useState<Date | null>(null)
  const [activityTime, setActivityTime] = useState<Date | null>(null)

  useEffect(() => {
    setIsVisible(true)
    api.get(`trips/${tripId}`).then(response => setTrip(response.data.data))
  }, [tripId])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == 'Escape') {
        closeCreateActivityModal();
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        closeCreateActivityModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOverlay);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOverlay);
    };
  }, [closeCreateActivityModal])

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title || !activityDay || !activityTime) {
      return
    }

    const occursAt = `${formatDate(activityDay, 'yyyy-MM-dd')} ${formatDate(activityTime, 'HH:mm:ss')}`

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    })

    window.document.location.reload()
  }

  const minDate = trip ? new Date(trip.starts_at) : undefined
  const maxDate = trip ? new Date(trip.ends_at) : undefined

  return (
    <div className="overlay fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center">
      <div className={`w-[540px] bg-zinc-900 rounded-xl px-6 py-5 space-y-5 transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-50'}`}>
        <header className="space-y-2 relative">
          <h2 className="text-white text-lg font-semibold leading-none -tracking-[0.02em]">Cadastrar atividade</h2>
          <p className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">
            Todos convidados podem visualizar as atividades.
          </p>

          <button
            type="button"
            onClick={closeCreateActivityModal}
            className="absolute -top-2 right-0 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </header>

        <form
          onSubmit={createActivity}
          className="space-y-2"
        >
          <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
            <label htmlFor="title" className="sr-only">Qual a atividade?</label>
            <Tag className="size-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              id="title"
              placeholder="Qual a atividade?"
              onChange={(event) => setTitle(event.target.value)}
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
              spellCheck={false}
            />
          </div>

          <div className="flex gap-2">
            <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
              <label htmlFor="activity_day" className="sr-only">Data</label>
              <Calendar className="size-5 text-zinc-400 shrink-0" />
              <DatePicker
                id="activity_day"
                selected={activityDay}
                onChange={(date) => setActivityDay(date)}
                locale="ptBR"
                dateFormat="d' de 'LLLL"
                minDate={minDate}
                maxDate={maxDate}
                className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
                placeholderText="Data"
              />
            </div>

            <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
              <label htmlFor="activity_time" className="sr-only">Horário</label>
              <Clock className="size-5 text-zinc-400 shrink-0" />
              <DatePicker
                id="activity_time"
                selected={activityTime}
                onChange={(date) => setActivityTime(date)}
                locale="ptBR"
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Horário"
                dateFormat="HH:mm"
                className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
                placeholderText="Horário"
              />
            </div>
          </div>

          <Button type="submit" disabled={!title || !activityDay || !activityTime} className="w-full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}