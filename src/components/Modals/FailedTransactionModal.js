import React, { useContext } from "react";

import { HANDLE_SHOW_FAILED_TRANSACTION_MODAL } from "../../const";
import { mainContext } from "../../reducer";

export const FailedTransactionModal = () => {
    const { dispatch } = useContext(mainContext);

    return (
        <div className="modal">
            <div className="modal__box">
                <div className="form-app">
                    <div className="form-app__inner transction-submitted">
                        <div className="emoji  emoji--sad">
                            <div className="emoji__face">
                                <div className="emoji__eyebrows"></div>
                                <div className="emoji__eyes"></div>
                                <div className="emoji__mouth"></div>
                            </div>
                        </div>

                        <h3 className="form-app__title h3">
                            Transaction failed, please try&nbsp;again
                        </h3>

                        <button
                            type="button"
                            className="transction-submitted__btn btn"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                                    showFailedTransactionModal: false
                                });
                            }}
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            className="form-app__close-btn button"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                                    showFailedTransactionModal: false
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
