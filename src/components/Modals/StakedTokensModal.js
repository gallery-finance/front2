import React, { useContext } from "react";

import { HANDLE_SHOW_STAKED_TOKENS_MODAL } from "../../const";
import { mainContext } from "../../reducer";

export const StakedTokensModal = () => {
    const { dispatch } = useContext(mainContext);

    return (
        <div className="modal">
            <div className="modal__box">
                <form className="form-app" action="/">
                    <div className="form-app__inner transction-submitted">
                        <div class="emoji emoji--yay">
                            <div class="emoji__face">
                                <div class="emoji__eyebrows"></div>
                                <div class="emoji__mouth"></div>
                            </div>
                        </div>
                        <div className="form-app__title h3">
                            <p className="color-gray">
                                You have successfully staked
                            </p>
                            100.222345 GLF
                        </div>
                        <button
                            type="button"
                            className="transction-submitted__btn btn"
                            onClick={() => {
                                dispatch({
                                    type: HANDLE_SHOW_STAKED_TOKENS_MODAL,
                                    showStakedTokensModal: false
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
                                    type: HANDLE_SHOW_STAKED_TOKENS_MODAL,
                                    showStakedTokensModal: false
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
