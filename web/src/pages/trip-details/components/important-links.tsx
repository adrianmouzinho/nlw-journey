import { Link2, Plus } from 'lucide-react'

import { Button } from '../../../components/button'

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold leading-none -tracking-[0.02em]">Links importantes</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-zinc-100 font-medium leading-none -tracking-[0.02]">Reserva do AirBnB</span>
            <a href="#" className="max-w-60 text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] truncate hover:text-zinc-300 hover:underline transition-colors">https://www.airbnb.com.br/room/u2294j0fwefwg9uwerguwg</a>
          </div>

          <Link2 className="size-5 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-zinc-100 font-medium leading-none -tracking-[0.02]">Reserva do AirBnB</span>
            <a href="#" className="max-w-60 text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] truncate hover:text-zinc-300 hover:underline transition-colors">https://www.airbnb.com.br/room/u2294j0fwefwg9uwerguwg</a>
          </div>

          <Link2 className="size-5 text-zinc-400" />
        </div>
      </div>

      <Button variant="secondary" onClick={openCreateLinkModal} className="w-full">
        <Plus className="size-5" />
        Cadastrar link
      </Button>
    </div>
  )
}