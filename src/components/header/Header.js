import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { useActiveWeb3React } from "../../web3";
import { formatAddress, formatAmount } from "../../utils/format";
import { mainContext } from "../../reducer";
import { HANDLE_SHOW_CONNECT_MODAL } from "../../const";
import { Logoicon } from "../../icons/Logoicon";

export const Header = () => {
    const { dispatch, state } = useContext(mainContext);
    const { active, account, library, chainId } = useActiveWeb3React();

    return (
        <header className="header">
            <div className="center">
                <div className="header__box">
                    <Link to="/" className="header__logo">
                        <Logoicon />
                    </Link>

                    <div className="header__menu">
                        <nav className="menu">
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <NavLink
                                        to="/about"
                                        className="menu__link"
                                        activeClassName="is-current"
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li className="menu__item">
                                    <NavLink
                                        to="/workshop"
                                        className="menu__link"
                                        activeClassName="is-current"
                                    >
                                        Workshop
                                    </NavLink>
                                </li>
                                <li className="menu__item">
                                    <NavLink
                                        to="/auction"
                                        className="menu__link"
                                        activeClassName="is-current"
                                    >
                                        Auction
                                    </NavLink>
                                </li>
                                <li className="menu__item">
                                    <NavLink
                                        to="/exhibition-hall"
                                        className="menu__link"
                                        activeClassName="is-current"
                                    >
                                        Exhibition hall
                                    </NavLink>
                                </li>
                                <li className="menu__item">
                                    <NavLink
                                        to="/pools"
                                        className="menu__link"
                                        activeClassName="is-current"
                                    >
                                        Pools
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                        <div className="header__btn">
                            <div className="buttonContainer">
                                {!active && (
                                    <button
                                        onClick={() => {
                                            dispatch({
                                                type: HANDLE_SHOW_CONNECT_MODAL,
                                                showConnectModal: true
                                            });
                                        }}
                                        className="btn"
                                        type="button"
                                        data-modal="recieve"
                                    >
                                        <span onClick={() => {}}>Unlock Wallet</span>
                                    </button>
                                )}

                                {active && (
                                    <div className="container open">
                                        <div className="balance ">
                                            <p>{formatAmount("1564564")}</p>
                                        </div>
                                        <div className="address">
                                            {formatAddress(account)}
                                            <div className="point"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="visible-md">
                    <button className="button btn-menu-toggle" type="button">
                        Menu
                    </button>
                </div>
            </div>
        </header>
    );
};
