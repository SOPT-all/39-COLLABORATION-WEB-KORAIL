import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'nextDayOutline' | 'outline' | 'outlinePill' | 'primary' | 'secondary'
  width?: 129 | 143 | 156 | 164 | 181 | 207 | 218 | 311 | 343
}

const buttonWidth = {
  129: 'w-[129px]',
  143: 'w-[143px]',
  156: 'w-[156px]',
  164: 'w-[164px]',
  181: 'w-[181px]',
  207: 'w-[207px]',
  218: 'w-[218px]',
  311: 'w-[311px]',
  343: 'w-[343px]',
}

const buttonVariant = {
  nextDayOutline:
    'h-12 gap-[10px] whitespace-nowrap border border-slate-100 bg-gray-0 px-6 py-3 text-body-14-b text-gray-900',
  outline: 'h-11 border border-gray-200 bg-gray-0 px-8 py-3 text-body-14-b text-gray-900',
  outlinePill:
    'h-[42px] gap-[10px] border border-slate-200 bg-transparent px-[10px] py-3 text-label-12-r text-gray-700 transition-colors duration-300 ease-out active:bg-slate-200',
  primary:
    'h-11 gap-[10px] bg-blue-500 px-4 py-3 text-body-14-b text-gray-0 transition-colors duration-300 ease-out active:bg-blue-700 disabled:bg-slate-200',
  secondary:
    'h-10 bg-slate-50 px-4 text-body-14-m text-gray-900 transition-colors duration-[120ms] ease-out active:bg-slate-100 active:duration-150',
}

const defaultButtonWidth = {
  nextDayOutline: 181,
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
  const outlineGap =
    variant === 'outline' ? (selectedWidth === 129 ? 'gap-[9px]' : 'gap-[10px]') : ''

  return (
    <button
      className={`flex items-center justify-center rounded-8 disabled:cursor-not-allowed ${buttonVariant[variant]} ${buttonWidth[selectedWidth]} ${outlineGap} ${className}`}
      type={type}
      {...props}
    >
      {variant === 'nextDayOutline' ? (
        <span className='flex items-start justify-center gap-1'>{children}</span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
