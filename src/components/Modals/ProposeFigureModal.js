import React from 'react'

export const ProposeFigureModal = ({ isOpen, setIsOpen }) => {
  return (
    <div className="modal" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="modal__box">
        <div className="modal__item modal__item--vote-new">
          <form
            className="form-vote-new form-app"
            action="/"
            novalidate="novalidate"
          >
            <h3 className="modal__title h3">Propose a New Figure</h3>

            <div className="form-vote-new__fieldset">
              <input className="input" placeholder="Name" />

              <textarea className="input" placeholder="Details"></textarea>

              <small className="form-vote-new__max-length">
                Note: no more than 200 caharcters
              </small>

              <p className="form-vote-new__info">
                <svg width="21" height="21" viewBox="0 0 21 21">
                  <path d="M10.5 19.25a8.75 8.75 0 110-17.5 8.75 8.75 0 010 17.5zm-.88-6.13v1.76h1.76v-1.76H9.62zm0-7v5.25h1.76V6.13H9.62z" />
                </svg>
                Please describe the person and attach his linkedin
                or&nbsp;social media links where artists can find photos.
              </p>
            </div>

            <hr />

            <p className="form-app__note">
              You need to stake <b>100 GLF tokens</b> to propose a&nbsp;figure
              and tokens will be staked for 4 days. <br />
              You can propose more than one figure
            </p>

            <div className="form-app__submit">
              <button className="btn btn--medium">Submit</button>
            </div>
          </form>
        </div>

        <button
          type="button"
          className="modal__close modal__close-btn button"
          aria-label="Close modal"
          onClick={() => setIsOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
