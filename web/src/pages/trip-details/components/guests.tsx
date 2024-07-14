import { CircleDashed, CheckCircle2, UserCog } from 'lucide-react'

import { Button } from '../../../components/button'

export function Guests() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold leading-none -tracking-[0.02em]">Convidados</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-zinc-100 font-medium leading-none -tracking-[0.02]">Jessica White</span>
            <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">jessica.white44@yahoo.com</span>
          </div>

          <CircleDashed className="size-5 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-zinc-100 font-medium leading-none -tracking-[0.02]">Dr. Rita Pacocha</span>
            <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">lacy.stiedemann@gmail.com</span>
          </div>

          <CheckCircle2 className="size-5 text-lime-300" />
        </div>
      </div>

      <Button variant="secondary" className="w-full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}