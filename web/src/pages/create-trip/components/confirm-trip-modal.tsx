import { FormEvent, useEffect, useState } from 'react'
import { Mail, User, X } from 'lucide-react'

import { Button } from '../../../components/button'

interface ConfirmTripModalProps {
  ownerName: string
  ownerEmail: string
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  closeConfirmTripModal: () => void
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
}

export function ConfirmTripModal({
  createTrip,
  closeConfirmTripModal,
  setOwnerEmail,
  ownerEmail,
  setOwnerName,
  ownerName,
}: ConfirmTripModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == 'Escape') {
        closeConfirmTripModal();
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        closeConfirmTripModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOverlay);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOverlay);
    };
  }, [closeConfirmTripModal])

  return (
    <div className="overlay fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center">
      <div className={`w-[540px] bg-zinc-900 rounded-xl px-6 py-5 space-y-5 transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-50'}`}>
        <header className="space-y-2 relative">
          <h2 className="text-white text-lg font-semibold leading-none -tracking-[0.02em]">Confirmar criação da viagem</h2>
          <p className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">
            Para concluir a criação da viagem para <span className="text-zinc-100 font-bold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-bold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
          </p>

          <button
            type="button"
            onClick={closeConfirmTripModal}
            className="absolute -top-2 right-0 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </header>

        <form
          onSubmit={createTrip}
          className="space-y-2"
        >
          <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
            <label htmlFor="name" className="sr-only">Seu nome completo</label>
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Seu nome completo"
              onChange={(event) => setOwnerName(event.target.value)}
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
              spellCheck={false}
            />
          </div>

          <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
            <label htmlFor="email" className="sr-only">Seu e-mail pessoal</label>
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Seu e-mail pessoal"
              onChange={(event) => setOwnerEmail(event.target.value)}
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
              spellCheck={false}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!ownerName || !ownerEmail}>
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}