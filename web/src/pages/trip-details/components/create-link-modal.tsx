import { FormEvent, useEffect, useState } from 'react'
import { Link2, Tag, X } from 'lucide-react'
import { Button } from '../../../components/button'

interface CreateLinkModalProps {
  createLink: (event: FormEvent<HTMLFormElement>) => void
  closeCreateLinkModal: () => void
}

export function CreateLinkModal({ createLink, closeCreateLinkModal }: CreateLinkModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key == 'Escape') {
        closeCreateLinkModal();
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        closeCreateLinkModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOverlay);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOverlay);
    };
  }, [closeCreateLinkModal]);

  return (
    <div className="overlay fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center">
      <div className={`w-[540px] bg-zinc-900 rounded-xl px-6 py-5 space-y-5 transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-50'}`}>
        <header className="space-y-2 relative">
          <h2 className="text-white text-lg font-semibold leading-none -tracking-[0.02em]">Cadastrar link</h2>
          <p className="text-zinc-400 text-sm leading-[1.4] -tracking-[0.02em]">
            Todos convidados podem visualizar os link importantes.
          </p>

          <button
            type="button"
            onClick={closeCreateLinkModal}
            className="absolute -top-2 right-0 text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </header>

        <form
          onSubmit={createLink}
          className="space-y-2"
        >
          <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
            <label htmlFor="title" className="sr-only">Título do link</label>
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Título do link"
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
            />
          </div>

          <div className="h-14 bg-zinc-950 border border-zinc-800 px-4 rounded-lg flex items-center gap-2 flex-1">
            <label htmlFor="url" className="sr-only">URL</label>
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="url"
              name="url"
              id="url"
              placeholder="URL"
              className="flex-1 bg-transparent leading-[1.4] placeholder:text-zinc-400 outline-none"
            />
          </div>

          <Button type="submit" className="w-full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}