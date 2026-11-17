import { useLayoutEffect, useRef, type ReactNode } from 'react'

import CloseIcon from '@/shared/assets/icon-close-sheet.svg?react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  renderHeader?: (closeButton: ReactNode) => ReactNode
  maxBodyHeight?: number
  bottomPadding?: number
}

const BottomSheet = ({
  open,
  onClose,
  title,
  children,
  footer,
  renderHeader,
  maxBodyHeight,
  bottomPadding = 16,
}: BottomSheetProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    dialog.showModal()

    return () => {
      dialog.close()
    }
  }, [open])

  const closeButton = (
    <div className='relative size-6 shrink-0'>
      <button
        type='button'
        aria-label='닫기'
        onClick={onClose}
        className='absolute -inset-2.5 grid place-items-center rounded-8'
      >
        <CloseIcon aria-hidden='true' />
      </button>
    </div>
  )

  return (
    <dialog
      ref={dialogRef}
      data-bottom-sheet
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      style={{ paddingBottom: `max(${bottomPadding}px, env(safe-area-inset-bottom))` }}
      className='fixed inset-x-0 top-auto bottom-0 mx-auto my-0 max-h-[calc(100dvh_-_1rem)] w-full max-w-[375px] flex-col overflow-hidden rounded-t-12 bg-gray-0 text-gray-900 backdrop:mx-auto backdrop:w-full backdrop:max-w-[375px] backdrop:bg-black/60 open:flex'
    >
      <header className='shrink-0'>
        {renderHeader ? (
          renderHeader(closeButton)
        ) : (
          <div className='flex items-center justify-between gap-2 pt-6 pr-4 pb-2.5 pl-5'>
            <h2 className='min-w-0 text-subtitle-20-b break-words'>{title}</h2>
            {closeButton}
          </div>
        )}
      </header>

      <div
        tabIndex={0}
        style={{ maxHeight: maxBodyHeight }}
        className='min-h-0 overflow-y-auto overscroll-contain px-4'
      >
        {children}
      </div>

      {footer != null && <div className='shrink-0 px-4 pt-2'>{footer}</div>}
    </dialog>
  )
}

export default BottomSheet
