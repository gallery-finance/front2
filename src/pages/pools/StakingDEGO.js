import React from 'react'
import {BackButton} from "../../components/BackButton";

export const StakingDEGO = () => {
    return (
        <article className="center">

            <BackButton />

            <header className="head-page">

                <h1 className="head-page__title h1">
                    DEGO Staking
                </h1>

                <p className="head-page__intro">
                    Buy GLF tokens now on Uniswap
                </p>

                <div className="head-page__btn">

                    <a href="/" className="btn">
                        Buy GLF
                    </a>

                </div>

            </header>


            <div className="statistics">

                <div className="statistics__list">

                    <div className="statistics__item column">

                        <svg className="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                            <circle cx="35" cy="34.5" r="34.5" fill="#1D1D1D"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M52.5 25.33V24h-4.18c-1.87 0-3.6.92-4.65 2.46l-4.96 7.37h-9.55v1.34h8.66l-4.47 6.63a4.24 4.24 0 01-3.52 1.87H28.1a9.22 9.22 0 01-9.25-9.17 9.22 9.22 0 019.25-9.17h10.91V24h-10.9c-5.85 0-10.61 4.71-10.61 10.5S22.26 45 28.1 45h1.73c1.87 0 3.6-.92 4.64-2.46l4.96-7.37h9.02v-1.34h-8.12l4.46-6.63a4.24 4.24 0 013.53-1.87h4.18z"
                                  fill="#fff" stroke="#fff"/>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    11,00.1211
                                </dt>
                                <dd className="statistics__dl-dd">
                                    GLF Earned
                                </dd>
                            </div>

                        </dl>

                        <a href="/" className="statistics__btn btn">
                            Claim Rewards
                        </a>

                    </div>

                    <div className="statistics__item column">
                        <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.1" cx="34.5" cy="34.5" r="34.5" fill="#4F4F4F"/>
                            <rect x="24" y="22" width="5" height="5" fill="#FF5173"/>
                            <rect x="29" y="22" width="11" height="5" fill="#4F4F4F"/>
                            <path d="M40 42H45L42.5 44.5L40 47V42Z" fill="#787878"/>
                            <path d="M40 27H45L42.5 24.5L40 22V27Z" fill="#787878"/>
                            <rect x="24" y="42" width="16" height="5" fill="#4F4F4F"/>
                            <rect x="24" y="27" width="5" height="5" fill="#FFD767"/>
                            <rect x="24" y="32" width="5" height="10" fill="#22DC9F"/>
                            <rect x="40" y="27" width="5" height="15" fill="#4F4F4F"/>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    DEGO
                                </dt>

                                <dd className="statistics__dl-dd">
                                    3,232.32
                                </dd>

                            </div>

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    Share of Stake
                                </dt>

                                <dd className="statistics__dl-dd">
                                    15.11%
                                </dd>

                            </div>

                        </dl>
                        <a href="/" className="statistics__btn btn">
                            Stake
                        </a>

                    </div>

                    <div className="statistics__item column">
                        <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="34.5" cy="34.5" r="34.5" fill="#FA6A6A"/>
                            <rect x="24" y="22" width="5" height="5" fill="#FF5173"/>
                            <rect x="29" y="22" width="11" height="5" fill="#4F4F4F"/>
                            <path d="M40 42H45L42.5 44.5L40 47V42Z" fill="#787878"/>
                            <path d="M40 27H45L42.5 24.5L40 22V27Z" fill="#787878"/>
                            <rect x="24" y="42" width="16" height="5" fill="#4F4F4F"/>
                            <rect x="24" y="27" width="5" height="5" fill="#FFD767"/>
                            <rect x="24" y="32" width="5" height="10" fill="#22DC9F"/>
                            <rect x="40" y="27" width="5" height="15" fill="#4F4F4F"/>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    DEGO
                                </dt>

                                <dd className="statistics__dl-dd">
                                    3,232.32
                                </dd>

                            </div>

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    Share of Stake
                                </dt>

                                <dd className="statistics__dl-dd">
                                    15.11%
                                </dd>

                            </div>

                        </dl>
                        <a href="/" className="statistics__btn btn">
                            Unstake
                        </a>

                    </div>

                </div>

            </div>


        </article>
    )
}