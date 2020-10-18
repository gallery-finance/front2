import React from 'react'

export const VoteFigureModal = ({ voteOpen, setVoteOpen }) => {
  return (
    <div className="modal" style={{ display: voteOpen ? 'flex' : 'none' }}>
      <div className="modal__box">
        <div className="modal__item modal__item--vote">
          <form
            className="form-vote-new form-app"
            action="/"
            novalidate="novalidate"
          >
            <h3 className="modal__title h3">Vote for a Figure</h3>

            <table className="form-vote__table">
              <tr>
                <th>Name:</th>
                <td>Donald Trump</td>
              </tr>

              <tr>
                <th>Details:</th>
                <td>
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
              GLF tokens used for this vote will be staked for 4&nbsp;days.
            </p>

            <div className="form-app__submit form-app__submit--row">
              <button
                className="btn btn--outline btn--medium modal__close"
                type="button"
                onClick={() => setVoteOpen(false)}
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
          onClick={() => setVoteOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
