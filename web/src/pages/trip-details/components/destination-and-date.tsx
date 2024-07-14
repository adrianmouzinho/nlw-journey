import { MapPin, Calendar, Settings2 } from 'lucide-react'

import { Button } from '../../../components/button'

export function DestinationAndDate() {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl shadow-shape flex items-center gap-5">
      <div className="flex gap-5 flex-1">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100 leading-[1.4] -tracking-[0.02em]">Imperatriz, Brasil</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100 leading-[1.4] -tracking-[0.02em]">10 a 20 de Setembro</span>
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