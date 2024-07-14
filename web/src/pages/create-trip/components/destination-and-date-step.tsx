import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'

import { Button } from '../../../components/button'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl shadow-shape flex items-center gap-5">
      <div className="flex gap-5 flex-1">
        <div className="flex items-center gap-2 flex-1">
          <label htmlFor="destination" className="sr-only">Para onde você vai?</label>
          <MapPin className="size-5 text-zinc-400" />
          <input
            type="text"
            name="destination"
            id="destination"
            placeholder="Para onde você vai?"
            className="flex-1 bg-transparent text-lg leading-[1.4] placeholder:text-zinc-400 outline-none"
            disabled={isGuestsInputOpen}
          />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <label htmlFor="date" className="sr-only">Quando?</label>
          <Calendar className="size-5 text-zinc-400" />
          <input
            type="text"
            name="date"
            id="date"
            placeholder="Quando?"
            className="flex-1 bg-transparent text-lg leading-[1.4] placeholder:text-zinc-400 outline-none"
            disabled={isGuestsInputOpen}
          />
        </div>
      </div>

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" size="sm" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button size="sm" onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>

      )}
    </div>
  )
}