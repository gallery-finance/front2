import React from 'react'

import imgWebp1x from '../../assets/img/artwork-list/img.webp'
import imgWebp2x from '../../assets/img/artwork-list/img@2x.webp'
import img1x from '../../assets/img/artwork-list/img.jpg'
import img2x from '../../assets/img/artwork-list/img@2x.jpg'

export const VoteModal = ({ isOpen, setIsOpen }) => {
  return (
    <div className="modal" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="modal__box">
        <div className="modal__item modal__item--vote-img">
          <form
            className="form-vote-new form-app"
            action="/"
            novalidate="novalidate"
          >
            <h3 className="modal__title h3">Vote for a Artwork</h3>

            <div className="form-vote-new__img">
              <picture>
                <source
                  srcset={`${imgWebp1x} 1x, ${imgWebp2x} 2x`}
                  type="image/webp"
                />
                <source srcset={`${img1x} 1x, ${img2x} 2x`} />

                <img
                  src="/img/artwork-list/modal@2x.jpg"
                  alt="Starry Night"
                  loading="lazy"
                  width="180"
                  height="115"
                />
              </picture>
            </div>

            <table className="form-vote__table">
              <tr>
                <th>Name:</th>
                <td>
                  Starry Night <span className="opacity-60">by Van Gogh</span>
                </td>
              </tr>

              <tr>
                <th>Details:</th>
                <td className="fz-14">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </td>
              </tr>
            </table>

            <div className="form-vote__inputbox form-app__inputbox">
              <div className="form-app__inputbox-control">
                <div className="form-app__inputbox-input">
                  <input className="input" placeholder="0.0000" />
                </div>

                <div className="form-app__inputbox-up">
                  <div className="form-app__inputbox-up-pref">Max</div>
                </div>
              </div>
            </div>

            <p className="form-app__inputbox-after-text">
              Voting Power: 110.212121 GLF tokens
            </p>

            <p className="form-app__note">
              GLF tokens used for this vote will be staked for 7&nbsp;days.
            </p>

            <div className="form-app__submit form-app__submit--row">
              <button
                className="btn btn--outline btn--medium modal__close"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <button className="btn btn--medium">Confirm</button>
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
