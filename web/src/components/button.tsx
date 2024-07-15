import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const buttonVariants = tv({
  base: 'px-5 rounded-lg font-medium leading-none -tracking-[0.02em] flex items-center justify-center gap-2 transition-colors',

  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 enabled:hover:bg-lime-400 disabled:opacity-60',
      secondary: 'bg-zinc-800 text-zinc-200 enabled:hover:bg-zinc-700 disabled:opacity-60',
    },
    size: {
      sm: 'py-2',
      md: 'py-3',
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> { }

export function Button({ type, className, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} type={type || "button"} className={twMerge(buttonVariants({ variant, size }), className)} />
  )
}