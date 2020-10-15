import React, { useContext, useEffect } from "react";

import { HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL } from "../../const";
import { mainContext } from "../../reducer";

import { modalLoader } from "../../assets/js/modal-loader";

export const WaitingWalletConfirmModal = () => {
    const { dispatch, state } = useContext(mainContext);
    const { showWaitingWalletConfirmModal } = state;

    useEffect(() => {
        new modalLoader("canvas");
    }, []);

    return (
        <div className="modal">
            <div className="modal__box">
                <div className="form-app">
                    <div className="form-app__inner transction-submitted">
                        <div className="transction-submitted__loading">
                            <div id="canvas"></div>
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
                                    showWaitingWalletConfirmModal: {
                                        show: false,
                                        title: "",
                                        content: ""
                                    }
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
