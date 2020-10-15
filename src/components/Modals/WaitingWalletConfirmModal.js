import React, { useContext } from "react";

import { HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL } from "../../const";
import { mainContext } from "../../reducer";

export const WaitingWalletConfirmModal = () => {
    const { dispatch, state } = useContext(mainContext);
    const {showWaitingWalletConfirmModal} = state

    return (
        <div className="modal">
            <div className="modal__box">
                <div className="form-app">
                    <div className="form-app__inner transction-submitted">
                        <div className="transction-submitted__loading">
                            <svg width="80" height="80" viewBox="0 0 80 80">
                                <path d="M40 77a2.83 2.83 0 01-3 2.89 40 40 0 1133.5-65.76 2.83 2.83 0 01-.57 4.12c-1.34.98-3.2.67-4.3-.58A34 34 0 1037 73.87c1.65.14 3 1.47 3 3.13z"></path>
                            </svg>
                        </div>
                        <h3 className="form-app__title h3">
                            {showWaitingWalletConfirmModal.title}
                        </h3>
                        <p className="transction-submitted__text">
                            {showWaitingWalletConfirmModal.content}
                        </p>
                        <button
                            type="button"
                            className="form-app__close-btn button"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                                    showWaitingWalletConfirmModal: {show: false, title: '', content: ''}
                                });
                            }}
                            aria-label="Close"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
