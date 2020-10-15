import React, {useEffect, useState} from 'react'
import Web3 from 'web3'
import Grow from '@material-ui/core/Grow';
import {useBOTInfo, useLeftTime} from "./Hooks";
import {getContract, useActiveWeb3React} from "../../web3";

import {formatAmount} from "../../utils/format";

const {toWei, fromWei} = Web3.utils
export const PoolCard = ({pool}) => {

    const {total, time, apy} = useBOTInfo()
    const {leftTime} = useLeftTime()
    const {account, active, library, chainId} = useActiveWeb3React()
    const [show, setShow] = useState(false)

    useEffect(()=>{
        setShow(true)
    },[])

    return (
        <Grow in={show} timeout={1500}>
            <div>
                <div className="card-pool__item">
                    <a href="/" className="card-pool__img">
                        <picture>
                            <img src={pool.cover} alt="`$`" loading="lazy" width="264" height="170"/>
                        </picture>
                    </a>
                    <h2 className="card-pool__title h3">{pool.label}</h2>
                    <a href={pool.link} className="card-pool__stake">Stake
                        <b>{pool.pair}</b>
                        <svg width="20" height="21" viewBox="0 0 20 21">
                            <path d="M13.48 9.67L9 5.2l1.18-1.18 6.48 6.48-6.48 6.48L9 15.8l4.47-4.47H3.33V9.67h10.15z"
                                  stroke-width=".8"/>
                        </svg>
                    </a>
                    <p className="card-pool__earn">
                        Earn GLF
                    </p>
                    <div>
                        <dl className="card-pool__dl">
                            <div className="card-pool__dl-row">
                                <dt className="card-pool__dl-dt">
                                    Staked
                                </dt>
                                <dd className="card-pool__dl-dd">
                                    <b className="card-pool__dl-black">{total? formatAmount(total) : 'data requesting....'}</b>
                                </dd>
                            </div>
                            <div className="card-pool__dl-row">
                                <dt className="card-pool__dl-dt">
                                    Pool total
                                </dt>
                                <dd className="card-pool__dl-dd">
                                    <b className="card-pool__dl-blue">{total? formatAmount(total) : 'data requesting....'}</b>
                                </dd>
                            </div>
                            <div className="card-pool__dl-row">
                                <dt className="card-pool__dl-dt">
                                    APY
                                </dt>
                                <dd className="card-pool__dl-dd">
                                    <b className="card-pool__dl-green">{apy? formatAmount(apy) : 'data requesting....'}</b>
                                </dd>
                            </div>
                            <div className="card-pool__dl-row">
                                <dt className="card-pool__dl-dt">
                                    Time left
                                </dt>
                                <dd className="card-pool__dl-dd">
                                    <b className="card-pool__dl-black">{leftTime? `${leftTime.days}d ${leftTime.days}h ${leftTime.days}m`: 'data requesting....'}</b>
                                </dd>
                            </div>
                        </dl>
                    </div>

                </div>
            </div>
        </Grow>
    )
}