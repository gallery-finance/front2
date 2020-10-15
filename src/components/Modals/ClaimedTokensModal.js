import React, { useContext } from "react";

import { HANDLE_SHOW_UNSTAKED_TOKENS_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import {formatAmount} from "../../utils/format";

export const ClaimedTokensModal = ({onOk, amount, symbol}) => {
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
                                You have successfully claimed
                            </p>
                            {`${amount && formatAmount(amount)} ${symbol}`}
                        </div>
                        <button
                            type="button"
                            className="transction-submitted__btn btn"
                            onClick={onOk}
                        >
                            Ok
                        </button>
                        <button
                            type="button"
                            className="form-app__close-btn button"
                            onClick={onOk}
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
