import React, {useEffect} from 'react'
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'
import {PoolCard} from '../../components/pool/PoolCard'
import cover_1 from '../../assets/img/card-pool/1.jpg'
import cover_2 from '../../assets/img/card-pool/2.jpg'
import cover_3 from '../../assets/img/card-pool/3.jpg'
import cover_4 from '../../assets/img/card-pool/4.jpg'
import cover_5 from '../../assets/img/card-pool/5.jpg'
import cover_6 from '../../assets/img/card-pool/6.jpg'


const poolList = [
    {label: 'Gallery Qingming',cover: cover_1, pair: `GLF / ETH`, link: 'staking-eth'},
    {label: 'Gallery Da Vinci',cover: cover_2, pair: `GLF / USDT`, link: 'staking-usdt'},
    {label: 'Gallery Santi',cover: cover_3, pair: `DEGO`, link: 'staking-dego'},
    {label: 'Gallery Picasso',cover: cover_4, pair: `MEME`, link: 'staking-meme'},
    {label: 'Gallery Dali',cover: cover_5, pair: `DONUT`, link: 'staking-donut'},
    {label: 'Gallery Kandinsky',cover: cover_6, pair: `BOT`, link: 'staking-bot'}
]

export const Pools = () => {

    useEffect(()=>{
        async function getPrice() {
            console.log('starting to get price')
            const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)
            const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
            const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[ChainId.MAINNET])
            const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC)

            const route = new Route([USDCWETHPair, DAIUSDCPair], WETH[ChainId.MAINNET])

            console.log(route.midPrice.toSignificant(6)) // 202.081
            console.log(route.midPrice.invert().toSignificant(6)) // 0.00494851
        }

        getPrice()

    },[])

    return (
        <div>
            <div/>
            <article className="center">

                <header className="head-page">
                    <h1 className="head-page__title h1">{'Choose the pool to stake'}</h1>
                    <p className="head-page__intro">{'Buy GLF tokens now on Uniswap'}</p>

                    <div className="head-page__btn">
                        <a href="/" className="btn">
                            Buy GLF
                        </a>
                    </div>
                </header>


                <div class="card-pool">
                    <div class="card-pool__list">
                        {poolList.map(item =>{
                            return (
                                <PoolCard pool={item}/>
                            )
                        })}


                    </div>
                </div>


                <div class="statistics">

                    <h2 class="statistics__title h2">
                        Statistics
                    </h2>

                    <div class="statistics__list">

                        <div class="statistics__item">

                            <svg class="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                                <circle cx="35" cy="34.5" r="34.5" fill="#86BA6E"/>
                                <path
                                    d="M42.97 38.64c0 1.1-.29 2.12-.87 3.06a6.38 6.38 0 01-2.52 2.28 9.1 9.1 0 01-3.93.96v2.43h-1.92v-2.46a9.01 9.01 0 01-5.13-1.89 5.9 5.9 0 01-2.07-4.47h5.46c.12 1.2.7 1.97 1.74 2.31v-4.74a30.7 30.7 0 01-3.75-1.17 6.26 6.26 0 01-2.43-1.83 5.23 5.23 0 01-1.05-3.45c0-1.82.67-3.28 2.01-4.38a9.02 9.02 0 015.22-1.86V21h1.92v2.43c2.1.16 3.76.77 4.98 1.83a6.18 6.18 0 012.04 4.41h-5.49c-.12-1.08-.63-1.78-1.53-2.1v4.65c1.66.46 2.94.87 3.84 1.23.9.36 1.7.96 2.4 1.8a4.96 4.96 0 011.08 3.39zm-11.04-9.21c0 .5.15.92.45 1.26.32.34.77.64 1.35.9v-4.17c-.56.1-1 .32-1.32.66-.32.32-.48.77-.48 1.35zm3.72 11.52c.6-.1 1.07-.34 1.41-.72.36-.38.54-.85.54-1.41 0-.52-.17-.94-.51-1.26-.32-.34-.8-.63-1.44-.87v4.26z"
                                    fill="#fff"/>
                            </svg>

                            <dl class="statistics__dl">

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        Total staked
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        12,252
                                    </dd>

                                </div>

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        Total value
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        15,11%
                                    </dd>

                                </div>

                            </dl>

                        </div>

                        <div class="statistics__item">

                            <svg class="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                                <circle opacity=".5" cx="35" cy="34.5" r="34.5" fill="#FAD06A"/>
                                <path
                                    d="M19.5 30.5H48a1.5 1.5 0 011.5 1.5v15a1.5 1.5 0 01-1.5 1.5H21a1.5 1.5 0 01-1.5-1.5V30.5zm1.5-9h22.5v6h-24V23a1.5 1.5 0 011.5-1.5zM39 38v3h4.5v-3H39z"
                                    fill="#1D1D1D"/>
                            </svg>

                            <dl class="statistics__dl">

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        Your GLF Balance
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        22,11
                                    </dd>

                                </div>

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        The current price
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        $112,12
                                    </dd>

                                </div>

                            </dl>

                            <a href="/" class="statistics__btn btn">
                                Get GLF
                            </a>

                        </div>

                        <div class="statistics__item">

                            <svg class="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
                                <circle cx="35" cy="34.5" r="34.5" fill="#1D1D1D"/>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M52.5 25.33V24h-4.18c-1.87 0-3.6.92-4.65 2.46l-4.96 7.37h-9.55v1.34h8.66l-4.47 6.63a4.24 4.24 0 01-3.52 1.87H28.1a9.22 9.22 0 01-9.25-9.17 9.22 9.22 0 019.25-9.17h10.91V24h-10.9c-5.85 0-10.61 4.71-10.61 10.5S22.26 45 28.1 45h1.73c1.87 0 3.6-.92 4.64-2.46l4.96-7.37h9.02v-1.34h-8.12l4.46-6.63a4.24 4.24 0 013.53-1.87h4.18z"
                                      fill="#fff" stroke="#fff"/>
                            </svg>

                            <dl class="statistics__dl">

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        Total supply
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        20,000
                                    </dd>

                                </div>

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        Current Supply
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        8,254
                                    </dd>

                                </div>

                                <div class="statistics__dl-row">

                                    <dt class="statistics__dl-dt">
                                        Total burned:
                                    </dt>

                                    <dd class="statistics__dl-dd">
                                        8,254
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