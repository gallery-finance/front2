import React, { useContext } from "react";

import { GLFIcon, BOTLightIcon } from "../../icons";
import { HANDLE_SHOW_STAKE_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import {formatAmount} from "../../utils/format";

export const StakeModal = ({amount, onConfirm, onCancel, onChange, balance, icon, tokenName, symbol, onMax}) => {
    const { dispatch } = useContext(mainContext);

    return (
        <div className="modal">
            <div className="modal__box">
                <form className="form-app" action="/">
                    <div className="form-app__inner deposit">
                        <h1 className="form-app__title h3">Stake</h1>

                        <div className="deposit__logo">
                            <GLFIcon width={43} height={43} />
                            {icon}
                            {/* <svg width="73" height="46" viewBox="0 0 73 46">
                                <circle
                                    cx="53"
                                    cy="23"
                                    r="20"
                                    fill="#ECEFF0"
                                ></circle>
                                <path
                                    d="M53 9.67l-.18.6v17.64l.18.18 8-4.84-8-13.58z"
                                    fill="#343434"
                                ></path>
                                <path
                                    d="M53 9.67l-8 13.58 8 4.84V9.67z"
                                    fill="#8C8C8C"
                                ></path>
                                <path
                                    d="M53 29.63l-.1.13v6.28l.1.3 8-11.54-8 4.83z"
                                    fill="#3C3C3B"
                                ></path>
                                <path
                                    d="M53 36.33v-6.7l-8-4.83 8 11.53z"
                                    fill="#8C8C8C"
                                ></path>
                                <path
                                    d="M53 28.09l8-4.84-8-3.72v8.56z"
                                    fill="#141414"
                                ></path>
                                <path
                                    d="M45 23.25l8 4.84v-8.56l-8 3.72z"
                                    fill="#393939"
                                ></path>
                                <circle
                                    cx="23"
                                    cy="23"
                                    r="21.5"
                                    fill="#1D1D1D"
                                    stroke="#fff"
                                    strokeWidth="3"
                                ></circle>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M33.15 17.69v-.78h-2.43c-1.08 0-2.09.54-2.7 1.43l-2.87 4.27h-5.53v.78h5.01l-2.58 3.84A2.46 2.46 0 0120 28.31h-1A5.35 5.35 0 0113.64 23c0-2.93 2.4-5.31 5.36-5.31h6.32v-.78H19A6.12 6.12 0 0012.86 23 6.12 6.12 0 0019 29.09h1c1.09 0 2.1-.54 2.7-1.43l2.87-4.27h5.23v-.78h-4.71l2.59-3.84a2.46 2.46 0 012.04-1.08h2.43z"
                                    fill="#fff"
                                    stroke="#fff"
                                ></path>
                            </svg> */}
                        </div>

                        <p className="form-app__label align-center">
                            {tokenName}
                        </p>

                        <div className="deposit__inputbox form-app__inputbox">
                            <div className="form-app__inputbox-control">
                                <div className="form-app__inputbox-input">
                                    <input value={amount} className="input" placeholder="0.0000" onChange={onChange}/>
                                </div>

                                <div className="form-app__inputbox-up" onClick={onMax}>
                                    <div className="form-app__inputbox-up-pref">
                                        Max
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="form-app__inputbox-after-text">
                            {balance && formatAmount(balance)} {symbol} <br />
                            GalleryFinanceSwap LP Token
                        </p>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium"
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>

                            <button type="button" className="btn btn--medium" onClick={onConfirm}>Confirm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
