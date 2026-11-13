import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const Button = ({ children, className = '', type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      className={`flex h-11 w-[207px] items-center justify-center rounded-8 bg-blue-500 px-4 py-3 text-body-14-b text-gray-0 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
