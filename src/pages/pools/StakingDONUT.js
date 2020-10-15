import React, {useContext, useState} from 'react'
import {BackButton} from "../../components/BackButton";
import {
    ClaimRewardModal,
    FailedTransactionModal,
    StakedTokensModal,
    StakeModal, UnstakedTokensModal,
    UnstakeModal
} from "../../components/Modals";
import {DonutLightIcon, DonutRedIcon} from "../../icons";
import {ClaimedTokensModal} from "../../components/Modals/ClaimedTokensModal";
import Web3 from "web3";
import {mainContext} from "../../reducer";
import {useDONUTStaking} from "../../components/pool/Hooks";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getDONUTAddress, getDONUTStakingAddress, } from "../../web3/address";
import StakingRewardsV2 from "../../web3/abi/StakingRewardsV2.json";
import {
    HANDLE_SHOW_CONNECT_MODAL,
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForApprove,
    waitingForConfirm, waitingForInit,
    waitingPending
} from "../../const";
import {formatAmount} from "../../utils/format";

const {toWei, fromWei} = Web3.utils


export const StakingDONUT = () => {

    const {dispatch, state} = useContext(mainContext);
    const {showFailedTransactionModal} = state
    const {balance, rewards, stakedAmount, stakedTime, total} = useDONUTStaking()
    const [staking, setStaking] = useState(false)
    const [unStaking, setUnStaking] = useState(false)
    const [claiming, setClaiming] = useState(false)
    const [staked, setStaked] = useState(false)
    const [unStaked, setUnStaked] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const [txHash, setTxHash] = useState('')

    const [amount, setAmount] = useState()

    const {account, active, library, chainId} = useActiveWeb3React()

    const onLaunch = async () => {
        console.log('on stake launch')
        if (!amount) {
            return
        }

        const tokenContract = getContract(library, ERC20.abi, getDONUTAddress(chainId))
        const contract = getContract(library, StakingRewardsV2.abi, getDONUTStakingAddress(chainId))
        const weiAmount = toWei(amount, 'ether');

        console.log('starting StakingBOT ETH', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForApprove
        });
        try {
            const result = await tokenContract.methods.approve(
                getDONUTStakingAddress(chainId),
                weiAmount,
            )
                .send({from: account});
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });
            console.log('approve status', result.status)
            if (result.status) {
                await contract.methods.stake(weiAmount)
                    .send({from: account})
                    .on('transactionHash', hash => {
                        setTxHash(hash)
                        dispatch({
                            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                            showWaitingWalletConfirmModal: {...waitingPending, hash}
                        });
                    })
                    .on('receipt', (_, receipt) => {
                        console.log('BOT staking success')
                        setStaking(false)
                        setStaked(true)
                        dispatch({
                            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                            showWaitingWalletConfirmModal: waitingForInit
                        });
                    })
                    .on('error', (err, receipt) => {
                        console.log('BOT staking error', err)
                        dispatch({
                            type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                            showFailedTransactionModal: true
                        });
                        dispatch({
                            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                            showWaitingWalletConfirmModal: waitingForInit
                        });
                    })
            } else {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
                dispatch({
                    type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                    showWaitingWalletConfirmModal: waitingForInit
                });
            }
        } catch (err) {
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForInit
            });
            if (err.code === 4001) {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
            } else {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
            }
            console.log('err', err);
        }
    };

    const onUnStake = async () => {
        console.log('on stake launch')
        if (!amount) {
            return
        }

        const contract = getContract(library, StakingRewardsV2.abi, getDONUTStakingAddress(chainId))
        const weiAmount = toWei(amount, 'ether');

        console.log('starting StakingBOT ETH', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForApprove
        });
        try {
            await contract.methods.withdraw(weiAmount)
                .send({from: account})
                .on('transactionHash', hash => {
                    setTxHash(hash)
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: {...waitingPending, hash}
                    });
                })
                .on('receipt', (_, receipt) => {
                    console.log('BOT staking success')
                    setUnStaking(false)
                    setUnStaked(true)
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: waitingForInit
                    });
                })
                .on('error', (err, receipt) => {
                    console.log('BOT staking error', err)
                    dispatch({
                        type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                        showFailedTransactionModal: true
                    });
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: waitingForInit
                    });
                })

        } catch (err) {
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForInit
            });
            if (err.code === 4001) {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
            } else {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
            }
            console.log('err', err);
        }
    };

    const onClaim = async () => {
        setClaiming(false)
        const contract = getContract(library, StakingRewardsV2.abi, getDONUTStakingAddress(chainId))
        console.log('starting StakingBOT ETH')
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForConfirm
        });
        try {
            await contract.methods.getReward()
                .send({from: account})
                .on('transactionHash', hash => {
                    setTxHash(hash)
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: {...waitingPending, hash}
                    });
                })
                .on('receipt', (_, receipt) => {
                    console.log('BOT staking success')
                    setClaimed(true)
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: waitingForInit
                    });
                })
                .on('error', (err, receipt) => {
                    console.log('BOT staking error', err)
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: waitingForInit
                    });
                })

        } catch (err) {
            if (err.code === 4001) {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
            } else {
                dispatch({
                    type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                    showFailedTransactionModal: true
                });
            }
            console.log('err', err);
        }
    };

    return (
        <article className="center">

            <BackButton />

            <header className="head-page">

                <h1 className="head-page__title h1">
                    DONUT Staking
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
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M52.5 25.33V24h-4.18c-1.87 0-3.6.92-4.65 2.46l-4.96 7.37h-9.55v1.34h8.66l-4.47 6.63a4.24 4.24 0 01-3.52 1.87H28.1a9.22 9.22 0 01-9.25-9.17 9.22 9.22 0 019.25-9.17h10.91V24h-10.9c-5.85 0-10.61 4.71-10.61 10.5S22.26 45 28.1 45h1.73c1.87 0 3.6-.92 4.64-2.46l4.96-7.37h9.02v-1.34h-8.12l4.46-6.63a4.24 4.24 0 013.53-1.87h4.18z"
                                  fill="#fff" stroke="#fff"/>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    {rewards && formatAmount(rewards)}
                                </dt>
                                <dd className="statistics__dl-dd">
                                    GLF Earned
                                </dd>
                            </div>

                        </dl>

                        <a className="statistics__btn btn" onClick={()=>{
                            if (!active) {
                                dispatch({
                                    type: HANDLE_SHOW_CONNECT_MODAL,
                                    showConnectModal: true
                                });
                                return
                            }
                            setClaiming(true)
                        }}>
                            Claim Rewards
                        </a>

                    </div>

                    <div className="statistics__item column">
                        <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.2" cx="34.5" cy="34.5" r="34.5" fill="#DC679F"/>
                            <g filter="url(#filter0_i)">
                                <path
                                    d="M40.3206 19.7846C42.4642 19.7846 44.445 20.9282 45.5168 22.7846L50.8373 32C51.9091 33.8564 51.9091 36.1436 50.8373 38L45.5168 47.2154C44.445 49.0718 42.4642 50.2154 40.3206 50.2154L29.6796 50.2154C27.536 50.2154 25.5553 49.0718 24.4835 47.2154L19.1629 38C18.0912 36.1436 18.0912 33.8564 19.1629 32L24.4835 22.7846C25.5553 20.9282 27.536 19.7846 29.6796 19.7846L40.3206 19.7846Z"
                                    fill="#DC679F"/>
                            </g>
                            <path
                                d="M40.3206 20.7846C42.107 20.7846 43.7576 21.7376 44.6508 23.2846L49.9713 32.5C50.8644 34.047 50.8644 35.953 49.9713 37.5L44.6508 46.7154C43.7576 48.2624 42.107 49.2154 40.3206 49.2154L29.6796 49.2154C27.8933 49.2154 26.2426 48.2624 25.3495 46.7154L20.029 37.5C19.1358 35.953 19.1358 34.047 20.029 32.5L25.3495 23.2846C26.2426 21.7376 27.8933 20.7846 29.6796 20.7846L40.3206 20.7846Z"
                                stroke="#641937" stroke-width="2"/>
                            <circle cx="37.4264" cy="38.7479" r="3.96398" fill="#E1AFCA"/>
                            <path
                                d="M34.8674 29.9507C36.624 29.9507 38.2472 30.8878 39.1255 32.4091C40.0038 33.9304 40.0038 35.8046 39.1255 37.3259C38.2472 38.8471 36.624 39.7842 34.8674 39.7842C33.1108 39.7842 31.4877 38.8471 30.6094 37.3259C29.7311 35.8046 29.7311 33.9304 30.6094 32.4091C31.4877 30.8878 33.1108 29.9507 34.8674 29.9507Z"
                                fill="white" stroke="#641937" stroke-width="2"/>
                            <rect x="45.8138" y="38.3863" width="2.24673" height="5.37998" rx="1.12336"
                                  transform="rotate(-12.2822 45.8138 38.3863)" fill="#DC3C45" stroke="#641937"
                                  stroke-width="1.5"/>
                            <rect x="44.6832" y="21.2475" width="2.24673" height="5.37998" rx="1.12336"
                                  transform="rotate(25.2453 44.6832 21.2475)" fill="#F3E172" stroke="#5C5012"
                                  stroke-width="1.5"/>
                            <rect x="30.1728" y="40.6316" width="2.24673" height="5.0179" rx="1.12336"
                                  transform="rotate(58.2284 30.1728 40.6316)" fill="#F3E172" stroke="#5C5012"
                                  stroke-width="1.5"/>
                            <rect x="41.3551" y="46.1142" width="2.24673" height="6.06752" rx="1.12336"
                                  transform="rotate(120.58 41.3551 46.1142)" fill="#70C7E9" stroke="#2C5266"
                                  stroke-width="1.5"/>
                            <rect x="26.2585" y="31.909" width="2.24673" height="6.06752" rx="1.12336"
                                  transform="rotate(140.134 26.2585 31.909)" fill="#70C7E9" stroke="#2C5266"
                                  stroke-width="1.5"/>
                            <rect x="35.0132" y="24.9777" width="2.24673" height="4.51081" rx="1.12336"
                                  transform="rotate(87.1581 35.0132 24.9777)" fill="#F3F3F8" stroke="#6D6A6C"
                                  stroke-width="1.5"/>
                            <rect x="45.2855" y="29.7922" width="2.24673" height="4.51081" rx="1.12336"
                                  transform="rotate(70.8822 45.2855 29.7922)" fill="#F3F3F8" stroke="#6D6A6C"
                                  stroke-width="1.5"/>
                            <defs>
                                <filter id="filter0_i" x="13.5029" y="12.9807" width="42.9948" height="44.0385"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dx="3" dy="6"/>
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                                </filter>
                            </defs>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    DONUT
                                </dt>

                                <dd className="statistics__dl-dd">
                                    {stakedAmount && formatAmount(stakedAmount)}
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
                        <a className="statistics__btn btn" onClick={()=>{
                            if (!active) {
                                dispatch({
                                    type: HANDLE_SHOW_CONNECT_MODAL,
                                    showConnectModal: true
                                });
                                return
                            }
                            setStaking(true)
                        }}>
                            Stake
                        </a>

                    </div>

                    <div className="statistics__item column">
                        <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="34.5" cy="34.5" r="34.5" fill="#FA6A6A"/>
                            <g filter="url(#filter0_i2)">
                                <path
                                    d="M40.3206 19.7846C42.4642 19.7846 44.445 20.9282 45.5168 22.7846L50.8373 32C51.9091 33.8564 51.9091 36.1436 50.8373 38L45.5168 47.2154C44.445 49.0718 42.4642 50.2154 40.3206 50.2154L29.6796 50.2154C27.536 50.2154 25.5553 49.0718 24.4835 47.2154L19.1629 38C18.0912 36.1436 18.0912 33.8564 19.1629 32L24.4835 22.7846C25.5553 20.9282 27.536 19.7846 29.6796 19.7846L40.3206 19.7846Z"
                                    fill="#DC679F"/>
                            </g>
                            <path
                                d="M40.3206 20.7846C42.107 20.7846 43.7576 21.7376 44.6508 23.2846L49.9713 32.5C50.8644 34.047 50.8644 35.953 49.9713 37.5L44.6508 46.7154C43.7576 48.2624 42.107 49.2154 40.3206 49.2154L29.6796 49.2154C27.8933 49.2154 26.2426 48.2624 25.3495 46.7154L20.029 37.5C19.1358 35.953 19.1358 34.047 20.029 32.5L25.3495 23.2846C26.2426 21.7376 27.8933 20.7846 29.6796 20.7846L40.3206 20.7846Z"
                                stroke="#641937" stroke-width="2"/>
                            <circle cx="37.4264" cy="38.7477" r="3.96398" fill="#E1AFCA"/>
                            <path
                                d="M34.8674 29.9507C36.624 29.9507 38.2472 30.8878 39.1255 32.4091C40.0038 33.9304 40.0038 35.8046 39.1255 37.3259C38.2472 38.8471 36.624 39.7842 34.8674 39.7842C33.1108 39.7842 31.4877 38.8471 30.6094 37.3259C29.7311 35.8046 29.7311 33.9304 30.6094 32.4091C31.4877 30.8878 33.1108 29.9507 34.8674 29.9507Z"
                                fill="white" stroke="#641937" stroke-width="2"/>
                            <rect x="45.8138" y="38.3868" width="2.24673" height="5.37998" rx="1.12336"
                                  transform="rotate(-12.2822 45.8138 38.3868)" fill="#DC3C45" stroke="#641937"
                                  stroke-width="1.5"/>
                            <rect x="44.6832" y="21.2478" width="2.24673" height="5.37998" rx="1.12336"
                                  transform="rotate(25.2453 44.6832 21.2478)" fill="#F3E172" stroke="#5C5012"
                                  stroke-width="1.5"/>
                            <rect x="30.1728" y="40.6321" width="2.24673" height="5.0179" rx="1.12336"
                                  transform="rotate(58.2284 30.1728 40.6321)" fill="#F3E172" stroke="#5C5012"
                                  stroke-width="1.5"/>
                            <rect x="41.3551" y="46.1142" width="2.24673" height="6.06752" rx="1.12336"
                                  transform="rotate(120.58 41.3551 46.1142)" fill="#70C7E9" stroke="#2C5266"
                                  stroke-width="1.5"/>
                            <rect x="26.2585" y="31.909" width="2.24673" height="6.06752" rx="1.12336"
                                  transform="rotate(140.134 26.2585 31.909)" fill="#70C7E9" stroke="#2C5266"
                                  stroke-width="1.5"/>
                            <rect x="35.0132" y="24.9777" width="2.24673" height="4.51081" rx="1.12336"
                                  transform="rotate(87.1581 35.0132 24.9777)" fill="#F3F3F8" stroke="#6D6A6C"
                                  stroke-width="1.5"/>
                            <rect x="45.2855" y="29.7926" width="2.24673" height="4.51081" rx="1.12336"
                                  transform="rotate(70.8822 45.2855 29.7926)" fill="#F3F3F8" stroke="#6D6A6C"
                                  stroke-width="1.5"/>
                            <defs>
                                <filter id="filter0_i2" x="13.5029" y="12.981" width="42.9948" height="44.0385"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dx="3" dy="6"/>
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                                </filter>
                            </defs>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    DONUT
                                </dt>

                                <dd className="statistics__dl-dd">
                                    {stakedAmount && formatAmount(stakedAmount)}
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
                        <a className="statistics__btn btn" onClick={()=>{
                            if (!active) {
                                dispatch({
                                    type: HANDLE_SHOW_CONNECT_MODAL,
                                    showConnectModal: true
                                });
                                return
                            }
                            setUnStaking(true)
                        }}>
                            Unstake
                        </a>

                    </div>

                </div>

            </div>

            {staking && (
                <div className="modal-show">
                    <div className="wrapper">
                        <StakeModal
                            amount={amount}
                            symbol={'DONUT'}
                            tokenName={'Reddit Donut Token'}
                            icon={<DonutLightIcon width={43} height={43}/>}
                            balance={balance}
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}
                            onMax={()=>{
                                setAmount(fromWei(balance))
                            }}
                            onConfirm={onLaunch}
                            onCancel={() => {
                                setStaking(false)
                            }}/>
                    </div>
                </div>
            )}


            {unStaking && (
                <div className="modal-show">
                    <div className="wrapper">
                        <UnstakeModal
                            amount={amount}
                            tokenName={'Reddit Donut Token'}
                            icon={<DonutRedIcon width={43} height={43}/>}
                            symbol={'DONUT'}
                            balance={stakedAmount}
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}
                            onMax={()=>{
                                setAmount(fromWei(stakedAmount))
                            }}
                            onConfirm={onUnStake}
                            onCancel={() => {
                                setUnStaking(false)
                            }}/>
                    </div>
                </div>
            )}

            {claiming && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ClaimRewardModal
                            rewards={rewards}
                            stakedTime={stakedTime}
                            onConfirm={onClaim}
                            onCancel={() => {
                                setClaiming(false)
                            }}/>
                    </div>
                </div>
            )}

            {showFailedTransactionModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <FailedTransactionModal/>
                    </div>
                </div>
            )}

            {claimed && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ClaimedTokensModal
                            amount={rewards}
                            symbol={'GLF'}
                            onOk={() => {
                                setClaimed(false)
                            }}/>
                    </div>
                </div>
            )}

            {staked && (
                <div className="modal-show">
                    <div className="wrapper">
                        <StakedTokensModal
                            amount={amount}
                            symbol={'DONUT'}
                            onOk={() => {
                                setStaked(false)
                            }}/>
                    </div>
                </div>
            )}
            {unStaked && (
                <div className="modal-show">
                    <div className="wrapper">
                        <UnstakedTokensModal
                            amount={amount}
                            symbol={'DONUT'}
                            onOk={() => {
                                setUnStaked(false)
                            }}/>
                    </div>
                </div>
            )}


        </article>
    )
}