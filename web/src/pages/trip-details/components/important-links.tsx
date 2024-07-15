import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link2, Plus } from 'lucide-react'

import { Button } from '../../../components/button'
import { api } from '../../../lib/axios'

interface Link {
  id: number
  title: string
  url: string
}

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  const { tripId } = useParams()

  const [links, setLinks] = useState<Link[]>()

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then((response) => setLinks(response.data.data))
  }, [])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold leading-none -tracking-[0.02em]">Links importantes</h3>

      {links && links.length > 0 ? (
        <div className="space-y-5">
          {links.map((link) => {
            return (
              <div key={link.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-100 font-medium leading-none -tracking-[0.02]">{link.title}</span>
                  <a href={link.url} target="_blank" className="max-w-60 text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em] truncate hover:text-zinc-300 hover:underline transition-colors">
                    {link.url}
                  </a>
                </div>

                <Link2 className="size-5 text-zinc-400" />
              </div>
            )
          })}
        </div>
      ) : (
        <span className="block text-zinc-500 text-sm leading-[1.4] -tracking-[0.02]">Nenhum link cadastrado.</span>
      )}

      <Button variant="secondary" onClick={openCreateLinkModal} className="w-full">
        <Plus className="size-5" />
        Cadastrar link
      </Button>
    </div>
  )
}