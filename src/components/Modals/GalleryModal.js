import React from 'react'

export const GalleryModal = ({ isOpen, setIsOpen, imgBig }) => {
  return (
    <>
      <div className="modal" style={{ display: isOpen ? 'flex' : 'none' }}>
        <div
          className="modal__item"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
          <img src={imgBig} />
        </div>

        <button
          type="button"
          style={{
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            top: '50px',
            right: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: 'none',
            outline: 0,
            cursor: 'pointer',
          }}
          aria-label="Close modal"
          onClick={() => setIsOpen(false)}
        >
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z" />
          </svg>
        </button>
      </div>
    </>
  )
}
