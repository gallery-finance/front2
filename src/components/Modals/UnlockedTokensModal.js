import React, { useContext } from 'react'

import { HANDLE_SHOW_UNSTAKED_TOKENS_MODAL } from '../../const'
import { mainContext } from '../../reducer'
import { formatAmount } from '../../utils/format'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { getPercent } from '../../utils/time'

const { fromWei } = Web3.utils

export const UnlockedTokensModal = ({
  onOk,
  rewards,
  symbol,
  stakedTime,
  unlockedOpen,
  setUnlockedOpen,
}) => {
  const { dispatch } = useContext(mainContext)

  return (
    <div className="modal" style={{ display: unlockedOpen ? 'flex' : 'none' }}>
      <div className="modal__box">
        <form className="form-app" action="/">
          <div className="form-app__inner transction-submitted">
            <div className="emoji emoji--yay">
              <div className="emoji__face">
                <div className="emoji__eyebrows"></div>
                <div className="emoji__mouth"></div>
              </div>
            </div>
            <div className="form-app__title h3">
              <p className="color-gray">
                Your tokens were successfully unlocked
              </p>
              {/* {`${
                rewards &&
                fromWei(
                  (rewards * ((100 - getPercent(stakedTime)) / 100)).toString()
                )
              } GLF`} */}
            </div>
            <button
              type="button"
              className="transction-submitted__btn btn"
              onClick={() => setUnlockedOpen(false)}
            >
              Ok
            </button>
            <button
              type="button"
              className="form-app__close-btn button"
              onClick={() => setUnlockedOpen(false)}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
