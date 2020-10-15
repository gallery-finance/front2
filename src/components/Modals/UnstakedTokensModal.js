import React, { useContext } from "react";

import { HANDLE_SHOW_UNSTAKED_TOKENS_MODAL } from "../../const";
import { mainContext } from "../../reducer";

export const UnstakedTokensModal = () => {
    const { dispatch } = useContext(mainContext);

    return (
        <div className="modal">
            <div className="modal__box">
                <form className="form-app" action="/">
                    <div className="form-app__inner transction-submitted">
                        <div className="transction-submitted__logo">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                                <svg width="60" height="60" viewBox="0 0 60 60">
                                    <path
                                        d="M27.08,41.09l1,1V10.84h3.8V42.12l1-1,13-13L48.6,30.8,30,49.4,11.4,30.8l2.69-2.7,13,13Z"
                                        stroke="#FCE7B4"
                                        strokeWidth="1.2"
                                    ></path>
                                </svg>
                            </svg>
                        </div>
                        <div className="form-app__title h3">
                            <p className="color-gray">
                                You have successfully unstaked
                            </p>
                            100.222345 GLF
                        </div>
                        <button
                            type="button"
                            className="transction-submitted__btn btn"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_SHOW_UNSTAKED_TOKENS_MODAL,
                                    showUnstakedTokensModal: false
                                });
                            }}
                        >
                            Ok
                        </button>
                        <button
                            type="button"
                            className="form-app__close-btn button"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_SHOW_UNSTAKED_TOKENS_MODAL,
                                    showUnstakedTokensModal: false
                                });
                            }}
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
    );
};
