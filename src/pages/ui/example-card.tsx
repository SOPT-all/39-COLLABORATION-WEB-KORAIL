import type { ReactNode } from 'react'

const ExampleCard = ({
  title,
  children,
  fullWidth = false,
  heading: Heading = 'h3',
}: {
  title: string
  children: ReactNode
  fullWidth?: boolean
  heading?: 'h3' | 'h4'
}) => (
  <article className='space-y-2'>
    <Heading className='text-body-14-b'>{title}</Heading>
    <div
      className={`overflow-x-auto rounded-8 bg-slate-50 py-2 ring-1 ring-slate-200 ring-inset ${fullWidth ? '-mx-4' : ''}`}
    >
      {children}
    </div>
  </article>
)

export default ExampleCard
