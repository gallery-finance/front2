import React, {useContext, useState} from 'react'
import {BackButton} from "../../components/BackButton";
import {mainContext} from "../../reducer";
import {useBOTStaking, useDEGOStaking} from "../../components/pool/Hooks";
import {getContract, useActiveWeb3React} from "../../web3";
import {
    ClaimRewardModal,
    FailedTransactionModal,
    StakedTokensModal,
    StakeModal, UnstakedTokensModal,
    UnstakeModal
} from "../../components/Modals";
import {BOTLightIcon, BOTRedIcon, DegoLightIcon, DegoRedIcon} from "../../icons";
import {ClaimedTokensModal} from "../../components/Modals/ClaimedTokensModal";
import Web3 from "web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getBotAddress, getBotStakingAddress, getDEGOAddress, getDEGOStakingAddress} from "../../web3/address";
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


export const StakingDEGO = () => {

    const {dispatch, state} = useContext(mainContext);
    const {showFailedTransactionModal} = state
    const {balance, rewards, stakedAmount, stakedTime, total} = useDEGOStaking()
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

        const tokenContract = getContract(library, ERC20.abi, getDEGOAddress(chainId))
        const contract = getContract(library, StakingRewardsV2.abi, getDEGOStakingAddress(chainId))
        const weiAmount = toWei(amount, 'ether');

        console.log('starting StakingBOT BOT', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForApprove
        });
        try {
            const result = await tokenContract.methods.approve(
                getDEGOStakingAddress(chainId),
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

        const contract = getContract(library, StakingRewardsV2.abi, getDEGOStakingAddress(chainId))
        const weiAmount = toWei(amount, 'ether');

        console.log('starting StakingBOT BOT', account, weiAmount)
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
        const contract = getContract(library, StakingRewardsV2.abi, getDEGOStakingAddress(chainId))
        console.log('starting StakingBOT BOT')
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
                                    {rewards && formatAmount(rewards)}
                                </dt>
                                <dd className="statistics__dl-dd">
                                    GLF Earned
                                </dd>
                            </div>

                        </dl>

                        <a  className="statistics__btn btn" onClick={()=>{
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
                        <a  className="statistics__btn btn" onClick={()=>{
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
                        <a   className="statistics__btn btn" onClick={()=>{
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
                            symbol={'DEGO'}
                            tokenName={'Dego Token'}
                            icon={<DegoLightIcon width={43} height={43}/>}
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
                            tokenName={'Dego Token'}
                            icon={<DegoRedIcon width={43} height={43}/>}
                            symbol={'DEGO'}
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
                            symbol={'DEGO'}
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
                            symbol={'DEGO'}
                            onOk={() => {
                                setUnStaked(false)
                            }}/>
                    </div>
                </div>
            )}


        </article>
    )
}