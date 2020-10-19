import React, { useRef } from 'react'

export const Backdrop = ({ isOpen, setIsOpen }) => {
  const backdropRef = useRef()

  const handleBackdropClick = (e) => {
    const { current } = backdropRef

    if (current && e.target !== current) {
      return
    }

    setIsOpen(false)
  }

  return (
    isOpen && (
      <div
        style={{
          position: 'fixed',
          zIndex: '5',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
        onClick={handleBackdropClick}
      ></div>
    )
  )
}
