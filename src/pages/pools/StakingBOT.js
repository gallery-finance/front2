import React, {useContext, useState} from 'react'
import {
    ClaimRewardModal,
    FailedTransactionModal,
    StakedTokensModal,
    StakeModal,
    UnstakedTokensModal,
    UnstakeModal
} from "../../components/Modals";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getBotAddress, getBotStakingAddress} from "../../web3/address";
import StakingRewardsV2 from "../../web3/abi/StakingRewardsV2.json";
import Web3 from 'web3'
import {
    bot_stake_icon, bot_unstake_icon,
    glf_icon,
    HANDLE_SHOW_CONNECT_MODAL, HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL, REQUESTING_DATA,
    waitingForApprove, waitingForConfirm, waitingForInit, waitingPending
} from "../../const";
import {mainContext} from "../../reducer";
import {useBOTStaking} from "../../components/pool/Hooks";
import {BackButton} from "../../components/BackButton";
import {formatAmount} from "../../utils/format";
import {BOTLightIcon, BOTRedIcon, GLFIcon} from "../../icons";
import {ClaimedTokensModal} from "../../components/Modals/ClaimedTokensModal";

const {toWei, fromWei} = Web3.utils



export const StakingBOT = () => {

    const {dispatch, state} = useContext(mainContext);
    const {showFailedTransactionModal} = state
    const {balance, rewards, stakedAmount, stakedTime, total} = useBOTStaking()
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

        const tokenContract = getContract(library, ERC20.abi, getBotAddress(chainId))
        const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
        const weiAmount = toWei(amount, 'ether');

        console.log('starting StakingBOT BOT', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForApprove
        });
        try {
            const result = await tokenContract.methods.approve(
                getBotStakingAddress(chainId),
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

        const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
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
        const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
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
                    ВОТ Staking
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

                        {glf_icon}

                        <dl className="statistics__dl">

                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    {rewards ? formatAmount(rewards) : REQUESTING_DATA}
                                </dt>
                                <dd className="statistics__dl-dd">
                                    GLF Earned
                                </dd>
                            </div>

                        </dl>

                        <a className="statistics__btn btn" onClick={() => {
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

                        <BOTLightIcon/>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    ВОТ
                                </dt>

                                <dd className="statistics__dl-dd">
                                    {stakedAmount ? formatAmount(stakedAmount) : REQUESTING_DATA}
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
                        <a className="statistics__btn btn" onClick={() => {
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

                        {bot_unstake_icon}

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    ВОТ
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
                        <a className="statistics__btn btn" onClick={() => {
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
                            symbol={'BOT'}
                            tokenName={'Bounce Token'}
                            icon={<BOTLightIcon width={43} height={43}/>}
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
                            tokenName={'Bounce Token'}
                            icon={<BOTRedIcon width={43} height={43}/>}
                            symbol={'BOT'}
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
                            symbol={'BOT'}
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
                            symbol={'BOT'}
                            onOk={() => {
                                setUnStaked(false)
                            }}/>
                    </div>
                </div>
            )}


        </article>


    )
}