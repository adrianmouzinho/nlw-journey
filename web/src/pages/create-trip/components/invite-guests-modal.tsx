import { FormEvent, useEffect, useState } from 'react'
import { AtSign, Plus, X } from 'lucide-react'

import { Button } from '../../../components/button'

interface InviteGuestsModalProps {
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
  closeGuestsModal: () => void
}

export function InviteGuestsModal({
  emailsToInvite,
  addNewEmailToInvite,
  removeEmailFromInvites,
  closeGuestsModal,
}: InviteGuestsModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == 'Escape') {
        closeGuestsModal();
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        closeGuestsModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOverlay);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOverlay);
    };
  }, [closeGuestsModal]);

  return (
    <div className="overlay fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center">
      <div className={`w-[640px] bg-zinc-900 rounded-xl px-6 py-5 space-y-5 transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-50'}`}>
        <header className="space-y-2 relative">
          <h2 className="text-white text-lg font-semibold leading-none -tracking-[0.02em]">Selecionar convidados</h2>
          <p className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>

          <button
            type="button"
            onClick={closeGuestsModal}
            className="absolute -top-2 right-0 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </header>

        {emailsToInvite.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {emailsToInvite.map((email) => (
              <div key={email} className="bg-zinc-800 rounded-md px-2.5 py-1.5 flex items-center gap-2.5">
                <span className="text-300">{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmailFromInvites(email)}
                  className="text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="h-px bg-zinc-800" />

        <form
          onSubmit={addNewEmailToInvite}
          className="h-14 bg-zinc-950 px-3 rounded-lg border border-zinc-800 flex items-center gap-5"
        >
          <div className="flex items-center gap-2 flex-1">
            <label htmlFor="email" className="sr-only">Digite o e-mail do convidado</label>
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o e-mail do convidado"
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
              spellCheck={false}
            />
          </div>

          <Button type="submit" size="sm">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}