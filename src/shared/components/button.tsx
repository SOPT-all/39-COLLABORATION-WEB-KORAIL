import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width?: 207 | 218 | 311
}

const buttonWidth = {
  207: 'w-[207px]',
  218: 'w-[218px]',
  311: 'w-[311px]',
}

const Button = ({
  children,
  className = '',
  type = 'button',
  width = 207,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex h-11 items-center justify-center rounded-8 bg-blue-500 px-4 py-3 text-body-14-b text-gray-0 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 ${buttonWidth[width]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
