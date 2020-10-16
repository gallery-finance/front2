import React, {useEffect} from 'react'
import {PoolCard} from '../../components/pool/PoolCard'
import cover_1 from '../../assets/img/card-pool/1.png'
import cover_2 from '../../assets/img/card-pool/2.png'
import cover_3 from '../../assets/img/card-pool/3.png'
import cover_4 from '../../assets/img/card-pool/4.png'
import cover_5 from '../../assets/img/card-pool/5.png'
import cover_6 from '../../assets/img/card-pool/6.png'
import {REQUESTING_DATA} from "../../const";
import {useGLFBalance} from "../Hooks";
import {formatAmount} from "../../utils/format";
import {useStatistics} from "./Hooks";


const poolList = [
    {type: 'ETH', label: 'Gallery Qingming',cover: cover_1, pair: `GLF / ETH`, link: 'staking-eth'},
    {type: 'USDT', label: 'Gallery Da Vinci',cover: cover_2, pair: `GLF / USDT`, link: 'staking-usdt'},
    {type: 'DEGO', label: 'Gallery Santi',cover: cover_3, pair: `DEGO`, link: 'staking-dego'},
    {type: 'MEME', label: 'Gallery Picasso',cover: cover_4, pair: `MEME`, link: 'staking-meme'},
    {type: 'DONUT', label: 'Gallery Dali',cover: cover_5, pair: `DONUT`, link: 'staking-donut'},
    {type: 'BOT', label: 'Gallery Kandinsky',cover: cover_6, pair: `BOT`, link: 'staking-bot'}
]

export const Pools = () => {

    const {glfBalance} = useGLFBalance()
    const {burnedTotal} = useStatistics()
    return (
        <div>
            <div/>
            <article className="center">

                <header className="head-page head-page--margin-top">
                    <h1 className="head-page__title h1">Choose the staking pool</h1>
                    <p className="head-page__intro">Buy GLF tokens now on Uniswap</p>

                    <div className="head-page__btn">
                        <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x47fd85128312ee72aa0e0382a531a8f848b8b2cb&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7" className="btn">
                            Buy GLF
                        </a>
                    </div>
                </header>


                <div className="card-pool">
                    <div className="card-pool__list">
                        {poolList.map(item =>{
                            return (
                                <PoolCard pool={item}/>
                            )
                        })}


                    </div>
                </div>


                <div className="statistics">

                    <h2 className="statistics__title h2">
                        Statistics
                    </h2>

                    <div className="statistics__list">

                        <div className="statistics__item">

                            <svg className="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                                <circle cx="35" cy="34.5" r="34.5" fill="#86BA6E"/>
                                <path
                                    d="M42.97 38.64c0 1.1-.29 2.12-.87 3.06a6.38 6.38 0 01-2.52 2.28 9.1 9.1 0 01-3.93.96v2.43h-1.92v-2.46a9.01 9.01 0 01-5.13-1.89 5.9 5.9 0 01-2.07-4.47h5.46c.12 1.2.7 1.97 1.74 2.31v-4.74a30.7 30.7 0 01-3.75-1.17 6.26 6.26 0 01-2.43-1.83 5.23 5.23 0 01-1.05-3.45c0-1.82.67-3.28 2.01-4.38a9.02 9.02 0 015.22-1.86V21h1.92v2.43c2.1.16 3.76.77 4.98 1.83a6.18 6.18 0 012.04 4.41h-5.49c-.12-1.08-.63-1.78-1.53-2.1v4.65c1.66.46 2.94.87 3.84 1.23.9.36 1.7.96 2.4 1.8a4.96 4.96 0 011.08 3.39zm-11.04-9.21c0 .5.15.92.45 1.26.32.34.77.64 1.35.9v-4.17c-.56.1-1 .32-1.32.66-.32.32-.48.77-.48 1.35zm3.72 11.52c.6-.1 1.07-.34 1.41-.72.36-.38.54-.85.54-1.41 0-.52-.17-.94-.51-1.26-.32-.34-.8-.63-1.44-.87v4.26z"
                                    fill="#fff"/>
                            </svg>

                            <dl className="statistics__dl">

                                <div className="statistics__dl-row">

                                    <dt className="statistics__dl-dt">
                                        Total staked Value
                                    </dt>

                                    <dd className="statistics__dl-dd">
                                        {REQUESTING_DATA}
                                    </dd>

                                </div>


                            </dl>

                        </div>

                        <div className="statistics__item">

                            <svg className="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                                <circle opacity=".5" cx="35" cy="34.5" r="34.5" fill="#FAD06A"/>
                                <path
                                    d="M19.5 30.5H48a1.5 1.5 0 011.5 1.5v15a1.5 1.5 0 01-1.5 1.5H21a1.5 1.5 0 01-1.5-1.5V30.5zm1.5-9h22.5v6h-24V23a1.5 1.5 0 011.5-1.5zM39 38v3h4.5v-3H39z"
                                    fill="#1D1D1D"/>
                            </svg>

                            <dl className="statistics__dl">

                                <div className="statistics__dl-row">

                                    <dt className="statistics__dl-dt">
                                        Your GLF Balance
                                    </dt>

                                    <dd className="statistics__dl-dd">
                                        {glfBalance && formatAmount(glfBalance)}
                                    </dd>

                                </div>

                                <div className="statistics__dl-row">

                                    <dt className="statistics__dl-dt">
                                        The current price
                                    </dt>

                                    <dd className="statistics__dl-dd">
                                        {REQUESTING_DATA}
                                    </dd>

                                </div>

                            </dl>

                            <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x47fd85128312ee72aa0e0382a531a8f848b8b2cb&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7" className="statistics__btn btn">
                                Get GLF
                            </a>

                        </div>

                        <div className="statistics__item">

                            <svg className="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                                <circle cx="35" cy="34.5" r="34.5" fill="#1D1D1D"/>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M52.5 25.33V24h-4.18c-1.87 0-3.6.92-4.65 2.46l-4.96 7.37h-9.55v1.34h8.66l-4.47 6.63a4.24 4.24 0 01-3.52 1.87H28.1a9.22 9.22 0 01-9.25-9.17 9.22 9.22 0 019.25-9.17h10.91V24h-10.9c-5.85 0-10.61 4.71-10.61 10.5S22.26 45 28.1 45h1.73c1.87 0 3.6-.92 4.64-2.46l4.96-7.37h9.02v-1.34h-8.12l4.46-6.63a4.24 4.24 0 013.53-1.87h4.18z"
                                      fill="#fff" stroke="#fff"/>
                            </svg>

                            <dl className="statistics__dl">

                                <div className="statistics__dl-row">

                                    <dt className="statistics__dl-dt">
                                        Total supply
                                    </dt>

                                    <dd className="statistics__dl-dd">
                                        30000
                                    </dd>

                                </div>

                                <div className="statistics__dl-row">

                                    <dt className="statistics__dl-dt">
                                        Current Supply
                                    </dt>

                                    <dd className="statistics__dl-dd">
                                        {REQUESTING_DATA}
                                    </dd>

                                </div>

                                <div className="statistics__dl-row">

                                    <dt className="statistics__dl-dt">
                                        Total burned:
                                    </dt>

                                    <dd className="statistics__dl-dd">
                                        {burnedTotal && formatAmount(burnedTotal)}
                                    </dd>

                                </div>

                            </dl>

                        </div>

                    </div>

                </div>

            </article>
        </div>
    )
}