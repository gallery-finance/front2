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
                        <div className="transction-submitted__logo">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M30.5 56a25.5 25.5 0 100-51 25.5 25.5 0 000 51zm0-2.04a23.46 23.46 0 100-46.92 23.46 23.46 0 000 46.92zm-.04-14.28c-7.1 0-11.18 4.08-11.18 4.08v-2.04s4.08-4.08 11.18-4.08 11.26 4.08 11.26 4.08v2.04s-4.16-4.08-11.26-4.08zm10.36-9.06l-5.77-5.77 5.77-5.77 1.45 1.45-4.33 4.32 4.33 4.33-1.45 1.44zM20.18 19.08l5.77 5.77-5.77 5.77-1.45-1.44 4.33-4.33-4.33-4.32 1.45-1.45z"
                                    stroke="#000"
                                    strokeWidth=".5"
                                ></path>
                            </svg>
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
