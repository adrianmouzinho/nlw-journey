import { useState } from 'react'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button } from '../../../components/button'
import { DatePicker } from './date-picker'
import { formatDate } from '../../../utils/format-date'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  destination: string
  startAndEndDates: DateRange | undefined
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setStartAndEndDates: (startAndEndDates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  destination,
  setStartAndEndDates,
  startAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const displayedDate = (() => {
    if (!startAndEndDates?.from) return null

    const fromDay = formatDate(startAndEndDates.from, 'd')
    const fromMonth = formatDate(startAndEndDates.from, 'MMMM')

    if (!startAndEndDates.to) {
      return `${fromDay} de ${fromMonth}`
    }

    const toDay = formatDate(startAndEndDates.to, 'd')
    const toMonth = formatDate(startAndEndDates.to, 'MMMM')

    if (fromMonth === toMonth) {
      return `${fromDay} a ${toDay} de ${fromMonth}`
    }

    return `${fromDay} de ${fromMonth} a ${toDay} de ${toMonth}`
  })();

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

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
            disabled={isGuestsInputOpen}
            onChange={(event) => setDestination(event.target.value)}
            className="flex-1 bg-transparent text-lg leading-[1.4] placeholder:text-zinc-400 outline-none"
            spellCheck={false}
          />
        </div>

        <button type="button" onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 outline-none">
          <Calendar className="size-5 text-zinc-400" />
          {displayedDate ? (
            <span className="text-lg leading-[1.4]">{displayedDate}</span>
          ) : (
            <span className="text-lg leading-[1.4] text-zinc-400">Quando?</span>
          )}
        </button>


        {isDatePickerOpen && (
          <DatePicker
            closeDatePicker={closeDatePicker}
            tripStartAndEndDates={startAndEndDates}
            setStartAndEndDates={setStartAndEndDates}
          />
        )}
      </div>

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" size="sm" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button size="sm" onClick={openGuestsInput} disabled={!destination || !startAndEndDates}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>

      )}
    </div>
  )
}