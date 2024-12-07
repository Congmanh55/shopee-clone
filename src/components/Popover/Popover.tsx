import { arrow, FloatingPortal, offset, Placement, shift, useFloating } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useId, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  placement?: Placement
}

const Popover = ({ children, renderPopover, className }: Props) => {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })]
  })

  const id = useId()

  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <div
      ref={reference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      className={className}//"flex items-center pt-1 hover:text-gray-300 curser-pointer"
    >
      {children}

      <FloatingPortal id={id}>
        <AnimatePresence>
          {
            open && (
              <motion.div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content'
                }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef}
                  className='translate-y-[-95%] z-10 border-x-transparent border-t-transparent border-b-white border-[11px] absolute'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                >
                </span>
                {renderPopover}
              </motion.div>
            )
          }
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}

export default Popover