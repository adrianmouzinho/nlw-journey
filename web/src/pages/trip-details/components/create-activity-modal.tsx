import { FormEvent, useEffect, useState } from 'react'
import { Calendar, Tag, X } from 'lucide-react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ptBR } from 'date-fns/locale'
registerLocale('ptBR', ptBR)

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../components/button'

interface CreateActivityModalProps {
  createActivity: (event: FormEvent<HTMLFormElement>) => void
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({ createActivity, closeCreateActivityModal }: CreateActivityModalProps) {
  const [occurDate, setOccurDate] = useState<Date | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
  }, [closeCreateActivityModal]);

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
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Qual a atividade?"
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
            />
          </div>

          <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
            <label htmlFor="occurs_at" className="sr-only">Data e horário</label>
            <Calendar className="size-5 text-zinc-400" />
            <DatePicker
              selected={occurDate}
              onChange={(date) => setOccurDate(date)}
              locale="ptBR"
              showTimeSelect
              dateFormat="Pp"
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
              placeholderText="Data e horário"
              id="occurs_at"
              name="occurs_at"
            />
          </div>

          <Button type="submit" className="w-full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}