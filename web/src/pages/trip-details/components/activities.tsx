import { CheckCircle2, CircleDashed } from 'lucide-react'

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-3 opacity-60">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl font-semibold leading-none -tracking-[0.02em]">Dia 09</span>
          <span className="text-zinc-500 text-xs leading-[1.4] -tracking-[0.02em]">Quinta-feira</span>
        </div>

        <span className="block text-zinc-500 text-sm leading-[1.4] -tracking-[0.02]">
          Nenhuma atividade cadastrada nessa data.
        </span>
      </div>

      <div className="space-y-3 opacity-60">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl font-semibold leading-none -tracking-[0.02em]">Dia 10</span>
          <span className="text-zinc-500 text-xs leading-[1.4] -tracking-[0.02em]">Sexta-feira</span>
        </div>

        <div className="space-y-3">
          <div className="h-10 px-4 flex items-center gap-3 bg-zinc-900 rounded-xl shadow-shape">
            <CheckCircle2 className="size-5 text-lime-300" />
            <span className="text-zinc-100 leading-[1.4] -tracking-[0.02]">Academia em grupo</span>
            <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] ml-auto">10:00h</span>
          </div>

          <div className="h-10 px-4 flex items-center gap-3 bg-zinc-900 rounded-xl shadow-shape">
            <CircleDashed className="size-5" />
            <span className="text-zinc-100 leading-[1.4] -tracking-[0.02]">Almoço</span>
            <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] ml-auto">12:00h</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl font-semibold leading-none -tracking-[0.02em]">Dia 11</span>
          <span className="text-zinc-500 text-xs leading-[1.4] -tracking-[0.02em]">Sábado</span>
        </div>

        <div className="space-y-3">
          <div className="h-10 px-4 flex items-center gap-3 bg-zinc-900 rounded-xl shadow-shape">
            <CheckCircle2 className="size-5 text-lime-300" />
            <span className="text-zinc-100 leading-[1.4] -tracking-[0.02]">Academia em grupo</span>
            <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] ml-auto">10:00h</span>
          </div>

          <div className="h-10 px-4 flex items-center gap-3 bg-zinc-900 rounded-xl shadow-shape">
            <CircleDashed className="size-5" />
            <span className="text-zinc-100 leading-[1.4] -tracking-[0.02]">Almoço</span>
            <span className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] ml-auto">12:00h</span>
          </div>
        </div>
      </div>
    </div>
  )
}