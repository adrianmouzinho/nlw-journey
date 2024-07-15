import { useEffect, useState } from 'react'
import { CheckCircle2, CircleDashed } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { api } from '../../../lib/axios'
import { formatDate } from '../../../utils/format-date'
import { isBefore } from 'date-fns'

interface Day {
  date: string
  activities: {
    id: number
    trip_id: number
    title: string
    occurs_at: string
  }[]
}

export function Activities() {
  const { tripId } = useParams()

  const [days, setDays] = useState<Day[]>()

  useEffect(() => {
    api.get(`trips/${tripId}/activities`).then(response => setDays(response.data.data))
  }, [tripId])

  return (
    <div className="space-y-8">
      {days && days.map((day) => {
        const currentDayIsBeforeNow = isBefore(day.date, new Date())

        return (
          <div key={day.date} className={`space-y-3 ${currentDayIsBeforeNow ? 'opacity-60' : ''}`}>
            <div className="flex gap-2 items-baseline">
              <span className="text-xl font-semibold leading-none -tracking-[0.02em]">Dia {formatDate(day.date, 'd')}</span>
              <span className="text-zinc-500 text-xs leading-[1.4] -tracking-[0.02em]">{formatDate(day.date, 'EEEE')}</span>
            </div>

            {day.activities.length > 0 ? (
              <div className="space-y-3">
                {day.activities.map((activity) => {
                  return (
                    <div key={activity.id} className="h-10 px-4 flex items-center gap-3 bg-zinc-900 rounded-xl shadow-shape">
                      {isBefore(new Date(), activity.occurs_at) ? (
                        <CircleDashed className="size-5" />
                      ) : (
                        <CheckCircle2 className="size-5 text-lime-300" />
                      )}
                      <span className="text-zinc-100 leading-[1.4] -tracking-[0.02]">{activity.title}</span>
                      <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] ml-auto">{formatDate(activity.occurs_at, "HH:mm")}h</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <span className="block text-zinc-500 text-sm leading-[1.4] -tracking-[0.02]">
                Nenhuma atividade cadastrada nessa data.
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}