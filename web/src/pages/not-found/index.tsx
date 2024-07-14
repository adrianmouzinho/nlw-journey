import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-zinc-400">
        Voltar para a {' '}
        <Link
          className="text-lime-500 dark:text-lime-400 hover:underline"
          to="/"
        >
          página inicial
        </Link>{' '}
      </p>
    </div>
  )
}