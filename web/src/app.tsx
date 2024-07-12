import { FormEvent, useState } from 'react'
import { ArrowRight, AtSign, Calendar, MapPin, Plus, Settings2, UserRoundPlus, X } from 'lucide-react'

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState(['maria@gmail.com', 'joao@gmai.com', 'silvanopereira@gmail.com'])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite((prev) => [...prev, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite((prev) => prev.filter((email) => email !== emailToRemove))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero bg-center bg-no-repeat">
      <div className="max-w-[768px] w-full px-6 space-y-10 text-center">
        <div className="space-y-2">
          <img src="/logo.svg" alt="Logotipo do NLW Journey" className="mx-auto" />
          <p className="text-zinc-300 text-lg leading-[1.4] -tracking-[0.02em]">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
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
              <button
                type="button"
                onClick={closeGuestsInput}
                className="bg-zinc-800 px-5 py-2 rounded-lg text-zinc-200 font-medium leading-none -tracking-[0.02em] flex items-center gap-2 hover:bg-zinc-700 transition-colors"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={openGuestsInput}
                className="bg-lime-300 px-5 py-2 rounded-lg text-lime-950 font-medium leading-none -tracking-[0.02em] flex items-center gap-2 hover:bg-lime-400 transition-colors"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>

            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl shadow-shape flex items-center gap-5">
              <button
                type="button"
                onClick={openGuestsModal}
                className="flex items-center gap-2 flex-1 text-zinc-400 text-lg leading-[1.4] outline-none"
              >
                <UserRoundPlus className="size-5" />
                Quem estará na viagem?
              </button>

              <button
                type="button"
                className="bg-lime-300 px-5 py-2 rounded-lg text-lime-950 font-medium leading-none -tracking-[0.02em] flex items-center gap-2 enabled:hover:bg-lime-400 disabled:opacity-60 transition-colors"
              >
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm leading-[1.4] tracking-[-0.0175em]">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center">
          <div className="w-[640px] bg-zinc-900 rounded-xl px-6 py-5 space-y-5">
            <header className="space-y-2 relative">
              <h2 className="text-white text-lg font-semibold leading-none -tracking-[0.02em]">Selecionar convidados</h2>
              <p className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>

              <button
                type="button"
                onClick={closeGuestsModal}
                className="absolute top-0 right-0 text-zinc-400 hover:text-zinc-300 transition-colors"
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
                />
              </div>

              <button
                type="submit"
                onClick={openGuestsInput}
                className="bg-lime-300 px-5 py-2 rounded-lg text-lime-950 font-medium leading-none -tracking-[0.02em] flex items-center gap-2 hover:bg-lime-400 transition-colors"
              >
                Convidar
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
