import { useEffect, useState } from 'react'
import { MapPin, Calendar, Settings2 } from 'lucide-react'
import { useParams } from 'react-router-dom'

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

export function DestinationAndDate() {
  const { tripId } = useParams()

  const [trip, setTrip] = useState<Trip>()

  useEffect(() => {
    api.get(`trips/${tripId}`).then(response => setTrip(response.data.data))
  }, [tripId])

  const displayedDate = (() => {
    if (!trip) return null

    const startMonth = formatDate(trip.starts_at, 'MMMM')
    const endMonth = formatDate(trip.ends_at, 'MMMM')
    const startDay = formatDate(trip.starts_at, 'd')
    const endDay = formatDate(trip.ends_at, 'd')

    if (startMonth === endMonth) {
      return startDay === endDay
        ? `${startDay} de ${startMonth}`
        : `${startDay} a ${endDay} de ${startMonth}`
    }

    return `${startDay} de ${startMonth} a ${endDay} de ${endMonth}`
  })()

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl shadow-shape flex items-center gap-5">
      <div className="flex gap-5 flex-1">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100 leading-[1.4] -tracking-[0.02em]">{trip?.destination}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100 leading-[1.4] -tracking-[0.02em]">{displayedDate}</span>
        </div>
      </div>

      <div className="h-6 w-px bg-zinc-800" />

      <Button variant="secondary" size="sm">
        Alterar local/data
        <Settings2 className="size-5" />
      </Button>
    </div>
  )
}