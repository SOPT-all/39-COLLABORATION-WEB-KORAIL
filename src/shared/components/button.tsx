import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'outline' | 'outlinePill' | 'primary' | 'secondary'
  width?: 129 | 143 | 156 | 164 | 207 | 218 | 311 | 343
}

const buttonWidth = {
  129: 'w-[129px]',
  143: 'w-[143px]',
  156: 'w-[156px]',
  164: 'w-[164px]',
  207: 'w-[207px]',
  218: 'w-[218px]',
  311: 'w-[311px]',
  343: 'w-[343px]',
}

const buttonVariant = {
  outline: 'h-11 border border-gray-200 bg-gray-0 px-8 py-3 text-body-14-b text-gray-900',
  outlinePill:
    'h-[42px] gap-[10px] border border-slate-200 bg-transparent px-[10px] py-3 text-label-12-r text-gray-700 active:bg-slate-200',
  primary:
    'h-11 bg-blue-500 px-4 py-3 text-body-14-b text-gray-0 active:bg-blue-700 disabled:bg-slate-200',
  secondary: 'h-10 bg-slate-50 px-4 text-body-14-m text-gray-900 active:bg-slate-100',
}

const defaultButtonWidth = {
  outline: 143,
  outlinePill: 164,
  primary: 207,
  secondary: 156,
} as const

const Button = ({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  width,
  ...props
}: ButtonProps) => {
  const selectedWidth = width ?? defaultButtonWidth[variant]

  return (
    <button
      className={`flex items-center justify-center rounded-8 disabled:cursor-not-allowed ${buttonVariant[variant]} ${buttonWidth[selectedWidth]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
