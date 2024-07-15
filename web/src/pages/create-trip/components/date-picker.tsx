import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { DateRange, DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'

interface DatePickerProps {
  tripStartAndEndDates: DateRange | undefined
  closeDatePicker: () => void
  setStartAndEndDates: (startAndEndDates: DateRange | undefined) => void
}

export function DatePicker({ closeDatePicker, tripStartAndEndDates, setStartAndEndDates }: DatePickerProps) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == 'Escape') {
        closeDatePicker();
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        closeDatePicker();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOverlay);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOverlay);
    };
  }, [closeDatePicker]);

  return (
    <div className="overlay fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center">
      <div className={`bg-zinc-900 rounded-xl px-6 py-5 space-y-5 transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-50'}`}>
        <header className="relative">
          <h2 className="text-white text-lg font-semibold leading-none -tracking-[0.02em]">Selecione a data</h2>

          <button
            type="button"
            onClick={closeDatePicker}
            className="absolute top-0 right-0 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </header>

        <DayPicker
          mode="range"
          selected={tripStartAndEndDates}
          onSelect={setStartAndEndDates}
          locale={ptBR}
          fromDate={new Date()}
        />
      </div>
    </div>
  )
}