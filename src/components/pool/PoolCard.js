import React from 'react'
import card_1 from '../../assets/img/card-pool/1.jpg'

export const PoolCard = ({pool}) =>{
    return (
        <div>
            <div className="card-pool__item">
                <a href="/" class="card-pool__img">
                    <picture>
                        <img src={pool.cover} alt="`$`" loading="lazy" width="264" height="170"/>
                    </picture>
                </a>
                <h2 className="card-pool__title h3">{ pool.label }</h2>
                <a className="card-pool__stake">Stake
                <b>{ pool.pair }</b>
                <svg width="20" height="21" viewBox="0 0 20 21">
                    <path d="M13.48 9.67L9 5.2l1.18-1.18 6.48 6.48-6.48 6.48L9 15.8l4.47-4.47H3.33V9.67h10.15z" stroke-width=".8"/>
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
                            <b className="card-pool__dl-black">0.86</b>
                        </dd>
                    </div>
                    <div className="card-pool__dl-row">
                        <dt className="card-pool__dl-dt">
                            Pool total
                        </dt>
                        <dd className="card-pool__dl-dd">
                            <b className="card-pool__dl-blue">$614,153.94</b>
                        </dd>
                    </div>
                    <div className="card-pool__dl-row">
                        <dt className="card-pool__dl-dt">
                            APY
                        </dt>
                        <dd className="card-pool__dl-dd">
                            <b className="card-pool__dl-green">129.216%</b>
                        </dd>
                    </div>
                    <div className="card-pool__dl-row">
                        <dt className="card-pool__dl-dt">
                            Time left
                        </dt>
                        <dd className="card-pool__dl-dd">
                            <b className="card-pool__dl-black">11d 20h 40m</b>
                        </dd>
                    </div>
                </dl>
            </div>

        </div>
        </div>
    )
}