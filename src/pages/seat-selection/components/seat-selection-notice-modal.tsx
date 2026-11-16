import { useId, useLayoutEffect, useRef } from 'react'

import Button from '@/shared/components/button'

interface SeatSelectionNoticeModalProps {
  open: boolean
  onClose: () => void
}

const SeatSelectionNoticeModal = ({ open, onClose }: SeatSelectionNoticeModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    dialog.showModal()

    return () => {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      data-seat-selection-notice
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className='fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-[343px] overflow-y-auto rounded-12 bg-gray-0 px-4 pt-5 pb-4 text-gray-900 backdrop:mx-auto backdrop:w-full backdrop:max-w-[375px] backdrop:bg-black/60'
    >
      <h2 id={titleId} className='text-subtitle-20-b'>
        안내
      </h2>

      <p id={descriptionId} className='mt-[22px] text-heading-16-r'>
        요청하신 승객수와
        <br />
        선택하신 좌석수가 일치하지 않습니다.
      </p>

      <Button width={311} className='mt-10 max-w-full' onClick={onClose}>
        확인
      </Button>
    </dialog>
  )
}

export default SeatSelectionNoticeModal
