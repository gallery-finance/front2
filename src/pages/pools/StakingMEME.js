import React, {useContext, useEffect, useState} from 'react'
import {BackButton} from "../../components/BackButton";
import Web3 from "web3";
import {mainContext} from "../../reducer";
import {useStaking} from "../../components/pool/Hooks";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getMEMOAddress, getMEMOStakingAddress} from "../../web3/address";
import StakingRewardsV2 from "../../web3/abi/StakingRewardsV2.json";
import {
    HANDLE_SHOW_CONNECT_MODAL,
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForApprove,
    waitingForConfirm, waitingForInit,
    waitingPending
} from "../../const";
import {formatAmount, weiDiv} from "../../utils/format";
import {
    ClaimRewardModal,
    FailedTransactionModal,
    StakedTokensModal,
    StakeModal, UnstakedTokensModal,
    UnstakeModal
} from "../../components/Modals";
import {PineappleLightIcon, PineappleRedIcon} from "../../icons";
import {ClaimedTokensModal} from "../../components/Modals/ClaimedTokensModal";
import BigNumber from "bignumber.js";

const {toWei, fromWei} = Web3.utils


export const StakingMEME = () => {


    const {dispatch, state} = useContext(mainContext);
    const {showFailedTransactionModal} = state
    const {balance, rewards, stakedAmount, stakedTime, total} = useStaking('MEME')
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

        const tokenContract = getContract(library, ERC20.abi, getMEMOAddress(chainId))
        const contract = getContract(library, StakingRewardsV2.abi, getMEMOStakingAddress(chainId))
        let weiAmount = new BigNumber(amount).multipliedBy('100000000').toString();
        console.log('starting Staking meme ETH', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForApprove
        });
        try {
            const result = await tokenContract.methods.approve(
                getMEMOStakingAddress(chainId),
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

        const contract = getContract(library, StakingRewardsV2.abi, getMEMOStakingAddress(chainId))
        let weiAmount = new BigNumber(amount).multipliedBy('100000000').toString();

        console.log('starting StakingBOT ETH', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForConfirm
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
        const contract = getContract(library, StakingRewardsV2.abi, getMEMOStakingAddress(chainId))
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
                    MEME Staking
                </h1>

                <p className="head-page__intro">
                    Buy GLF tokens now on Uniswap
                </p>

                <div className="head-page__btn">

                    <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x47fd85128312ee72aa0e0382a531a8f848b8b2cb&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7" className="btn">
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
                            <circle opacity="0.2" cx="34.5" cy="34.5" r="34.5" fill="#3C186E"/>
                            <path
                                d="M27.2781 32.3187C25.3094 34.4624 24.2656 37.6218 24.2656 41.4468C24.2656 45.2718 25.3094 48.4312 27.2781 50.5749C29.1594 52.5999 31.8687 53.7281 34.6875 53.653C37.5062 53.7281 40.2156 52.603 42.0969 50.5749C44.0656 48.4312 45.1094 45.2718 45.1094 41.4468C45.1094 37.6218 44.0656 34.4624 42.1 32.3187C38.9125 28.7999 31.2531 28.0374 27.2781 32.3187Z"
                                fill="url(#paint0_radial)"/>
                            <g opacity="0.2">
                                <path opacity="0.2"
                                      d="M34.575 30.3218C37.3219 30.3218 39.9406 31.328 41.4094 32.9499C43.2156 34.9218 44.1719 37.8593 44.1719 41.4468C44.1719 45.0343 43.2156 47.9718 41.4094 49.9374C39.7688 51.7062 37.4156 52.7187 34.95 52.7187C34.8719 52.7187 34.7906 52.7187 34.7125 52.7155H34.6875H34.6625C34.5844 52.7187 34.5031 52.7187 34.425 52.7187C31.9625 52.7187 29.6062 51.7062 27.9688 49.9405C26.1594 47.9687 25.2031 45.0312 25.2031 41.4468C25.2031 37.8593 26.1594 34.9218 27.9656 32.9562C29.5406 31.2593 31.8906 30.3218 34.575 30.3218ZM34.575 29.3843C31.8937 29.3843 29.1719 30.278 27.2781 32.3155C25.3094 34.4593 24.2656 37.6187 24.2656 41.4437C24.2656 45.2687 25.3094 48.428 27.2781 50.5718C29.1 52.5343 31.7 53.653 34.425 53.653C34.5125 53.653 34.6 53.653 34.6875 53.6499C34.775 53.653 34.8625 53.653 34.95 53.653C37.6719 53.653 40.2719 52.5343 42.0969 50.5718C44.0656 48.428 45.1094 45.2687 45.1094 41.4437C45.1094 37.6155 44.0656 34.4593 42.1 32.3155C40.4281 30.4718 37.5281 29.3843 34.575 29.3843Z"
                                      fill="#424242"/>
                            </g>
                            <path
                                d="M31.7285 39.0252C32.7723 38.1471 33.7566 37.2096 34.6754 36.2158C35.5973 37.2096 36.5816 38.1502 37.6223 39.0252C36.7098 40.0283 35.7254 40.9721 34.6754 41.8439C33.6254 40.9721 32.641 40.0283 31.7285 39.0252Z"
                                fill="url(#paint1_radial)"/>
                            <path
                                d="M37.9719 45.025C37.6688 45.2688 37.3625 45.5125 37.0438 45.75C36.2781 46.3281 35.4781 46.8688 34.6813 47.3688C33.8813 46.8813 33.0844 46.3219 32.3187 45.75C31.9969 45.5063 31.6875 45.2625 31.3906 45.025C32.5406 44.3031 33.6406 43.5125 34.6875 42.6562C35.7281 43.5125 36.825 44.3031 37.9719 45.025Z"
                                fill="url(#paint2_radial)"/>
                            <path
                                d="M31.3251 38.5061C30.5032 37.5529 29.7813 36.5186 29.1782 35.4217C29.5813 35.0873 29.9782 34.7404 30.3532 34.3967C30.7251 34.0498 31.1532 33.6342 31.497 33.2623C31.6126 33.1373 31.7188 33.0154 31.8251 32.8936L31.9313 32.7686L32.1282 32.8186H32.1595L32.3345 33.1154C32.4313 33.2717 32.5345 33.4342 32.647 33.6029L32.7376 33.7279C33.1782 34.3592 33.6501 34.9686 34.1532 35.5529L34.2626 35.6779C33.347 36.6779 32.3657 37.6248 31.3251 38.5061Z"
                                fill="url(#paint3_radial)"/>
                            <path
                                d="M30.8219 38.9C29.7969 39.7469 28.7188 40.525 27.5875 41.2344C26.7781 40.2344 26.1781 39.0938 25.8125 37.8719C26.7938 37.2375 27.7375 36.5562 28.6438 35.8281C29.2688 36.9187 29.9969 37.9469 30.8219 38.9Z"
                                fill="url(#paint4_radial)"/>
                            <path
                                d="M31.2437 39.3875C32.1562 40.4031 33.1374 41.3562 34.1812 42.2437C33.128 43.0968 32.0187 43.8843 30.8593 44.5968C29.8187 43.7281 28.8593 42.7718 27.9937 41.7406C29.1312 41.025 30.2218 40.2406 31.253 39.3906L31.2437 39.3875Z"
                                fill="url(#paint5_radial)"/>
                            <path
                                d="M31.8939 46.2563C32.6033 46.8094 33.3408 47.2969 34.0564 47.7532C32.9877 48.3969 31.8752 48.9719 30.7252 49.4688C29.6158 48.725 28.5689 47.8969 27.5908 46.9969C28.6971 46.5344 29.7658 45.9938 30.7908 45.3782C31.1471 45.675 31.5158 45.9657 31.9002 46.2594L31.8939 46.2563Z"
                                fill="url(#paint6_radial)"/>
                            <path
                                d="M34.672 48.1375C35.7345 48.7906 36.8376 49.3781 37.9782 49.8937C36.9282 50.5656 35.822 51.1531 34.672 51.65C33.522 51.1531 32.4157 50.5656 31.3657 49.8937C32.5063 49.3781 33.6126 48.7937 34.6751 48.1437L34.672 48.1375Z"
                                fill="url(#paint7_radial)"/>
                            <path
                                d="M35.2905 47.7499C36.0155 47.2624 36.7405 46.778 37.4405 46.2561C37.828 45.9655 38.1905 45.6717 38.5499 45.3811C39.5749 45.9967 40.6437 46.5374 41.7499 46.9999C40.7718 47.8999 39.7249 48.7249 38.6155 49.4717C37.4718 48.9717 36.3655 48.3967 35.2999 47.7561L35.2905 47.7499Z"
                                fill="url(#paint8_radial)"/>
                            <path
                                d="M38.4815 44.5968C37.3222 43.8843 36.2128 43.0968 35.1597 42.2437C36.2034 41.3562 37.1847 40.4031 38.0972 39.3875C39.1284 40.2406 40.2159 41.025 41.3534 41.7406C40.4878 42.7718 39.5284 43.7312 38.4878 44.6L38.4815 44.5968Z"
                                fill="url(#paint9_radial)"/>
                            <path
                                d="M38.5156 38.9C39.3375 37.9469 40.0656 36.9188 40.6875 35.8313C41.5937 36.5594 42.5406 37.2407 43.5188 37.875C43.1563 39.0938 42.5531 40.2344 41.7438 41.2375C40.6188 40.5282 39.5437 39.75 38.525 38.9032L38.5156 38.9Z"
                                fill="url(#paint10_radial)"/>
                            <path
                                d="M38.0405 38.5062C36.9999 37.6218 36.0187 36.6718 35.103 35.6656L35.2124 35.5406C35.7155 34.9593 36.1874 34.35 36.628 33.7218L36.7187 33.5906C36.8218 33.4343 36.9249 33.2718 37.0218 33.1031L37.203 32.8062H37.2624L37.4374 32.7625L37.5468 32.8937C37.653 33.0156 37.7593 33.1406 37.8749 33.2687C38.2218 33.6437 38.6155 34.0312 39.0343 34.4156C39.453 34.8 39.7905 35.0906 40.1843 35.4187C39.5843 36.5156 38.8687 37.5531 38.0468 38.5062H38.0405Z"
                                fill="url(#paint11_radial)"/>
                            <path
                                d="M36.2591 33.1031L36.1185 33.3125L35.9278 33.5843L35.7528 33.8281C35.4247 34.275 35.0685 34.7218 34.681 35.1718C34.2935 34.725 33.9341 34.2718 33.6091 33.825L33.4341 33.5875L33.2435 33.3156L33.1028 33.1062L33.0122 32.9656L33.4372 33.0093L33.9403 33.0437H34.6872C34.6872 33.0437 35.1903 33.0437 35.4341 33.0437L35.9372 33.0093L36.3403 32.9656L36.2591 33.1031Z"
                                fill="url(#paint12_radial)"/>
                            <path
                                d="M29.8625 31.0344C29.8313 31.1 29.8125 31.1719 29.8125 31.2438C29.8313 31.5938 30.0156 31.9157 30.3156 32.1157L30.4125 32.1844C30.6563 32.3469 30.925 32.4782 31.2031 32.575L30.925 32.8813C30.7375 33.0844 30.5312 33.2938 30.3156 33.5032C29.8625 33.9407 29.3625 34.3938 28.8406 34.8313C28.45 34.0438 28.2125 33.1969 28.1406 32.325C28.6563 31.8344 29.2375 31.4094 29.8625 31.0594V31.0344Z"
                                fill="url(#paint13_radial)"/>
                            <path
                                d="M27.5562 32.947C27.7062 33.7439 27.9719 34.5158 28.3438 35.2439C27.4906 35.9345 26.6031 36.5845 25.6844 37.1908C25.6594 37.0064 25.6469 36.8189 25.6438 36.6314C25.6438 36.5845 25.6312 36.5376 25.6094 36.4939C26.0094 35.2001 26.6719 33.997 27.5562 32.947Z"
                                fill="url(#paint14_radial)"/>
                            <path
                                d="M24.866 41.5718C24.8598 40.4656 24.9566 39.3625 25.1535 38.275L25.2285 38.2312C25.6254 39.4375 26.2348 40.5687 27.0316 41.5718C26.3441 41.975 25.6316 42.3375 24.8941 42.6531C24.8816 42.3031 24.866 41.9468 24.866 41.5718Z"
                                fill="url(#paint15_radial)"/>
                            <path
                                d="M24.9468 43.3343C25.8093 42.9812 26.6405 42.5656 27.4374 42.0906C28.2968 43.1218 29.2437 44.0812 30.2749 44.9562C29.253 45.5531 28.1843 46.0718 27.0812 46.5124C26.1718 45.6937 25.453 44.7 24.9749 43.5937C24.9655 43.5125 24.9593 43.4093 24.9499 43.3406V43.3343H24.9468Z"
                                fill="url(#paint16_radial)"/>
                            <path
                                d="M25.2778 45.425C25.631 45.8907 26.0153 46.3344 26.4278 46.7532C26.1935 46.8344 25.9591 46.9094 25.7278 46.9813C25.5466 46.4719 25.3966 45.9532 25.2778 45.425Z"
                                fill="url(#paint17_radial)"/>
                            <path
                                d="M25.9623 47.5843C26.2842 47.4874 26.6061 47.3812 26.9342 47.2593C27.8904 48.1687 28.9186 49.003 30.0092 49.7593C29.2748 50.0562 28.5061 50.2624 27.7154 50.3687C26.9748 49.5437 26.3779 48.6062 25.9561 47.5905L25.9623 47.5843Z"
                                fill="url(#paint18_radial)"/>
                            <path
                                d="M28.3032 50.9406C29.1095 50.775 29.8938 50.5312 30.6501 50.2156C31.6688 50.8812 32.7345 51.475 33.8438 51.9875C32.947 52.3281 32.0095 52.55 31.0532 52.65C30.0313 52.2562 29.097 51.675 28.3032 50.9406Z"
                                fill="url(#paint19_radial)"/>
                            <path
                                d="M34.6904 53.2813C33.9498 53.2813 33.2123 53.2063 32.4873 53.0563C33.2342 52.8782 33.9654 52.6438 34.6748 52.3501C35.3842 52.6438 36.1186 52.8813 36.8654 53.0595C36.1529 53.2095 35.4217 53.2813 34.6904 53.2813Z"
                                fill="#FDD835"/>
                            <path
                                d="M38.3249 52.6468C37.3655 52.55 36.4218 52.3312 35.5249 51.9906C36.628 51.475 37.6905 50.8843 38.703 50.2156C39.4718 50.5406 40.2749 50.7875 41.0968 50.9562C40.2937 51.6875 39.353 52.2625 38.3249 52.6468Z"
                                fill="url(#paint20_radial)"/>
                            <path
                                d="M41.6688 50.3812C40.872 50.2781 40.0907 50.0718 39.3501 49.7687C40.4345 49.0093 41.4563 48.1718 42.4095 47.2625C42.7407 47.3843 43.0751 47.4968 43.4157 47.5968C42.9938 48.6093 42.4032 49.55 41.6626 50.375L41.6688 50.3812Z"
                                fill="url(#paint21_radial)"/>
                            <path
                                d="M43.6594 46.975C43.4219 46.9031 43.1812 46.825 42.9375 46.7406C43.3625 46.3062 43.7625 45.8437 44.1281 45.3594C44.0062 45.9125 43.8469 46.4562 43.6531 46.9875L43.6594 46.975Z"
                                fill="url(#paint22_radial)"/>
                            <path
                                d="M44.4251 43.4656C44.2126 44.2874 43.4188 45.3781 42.2782 46.5156C41.1751 46.075 40.1063 45.5562 39.0845 44.9593C40.1095 44.0843 41.0532 43.1218 41.9063 42.0906C42.7126 42.5718 43.5532 42.9937 44.4251 43.35V43.4656Z"
                                fill="url(#paint23_radial)"/>
                            <path
                                d="M44.2279 38.2937C44.4217 39.375 44.5154 40.475 44.5092 41.5718C44.5092 41.9468 44.5092 42.3125 44.4779 42.6656C43.7342 42.3468 43.0123 41.9812 42.3154 41.5718C43.1123 40.5656 43.7217 39.4375 44.1186 38.2312L44.2279 38.2937Z"
                                fill="url(#paint24_radial)"/>
                            <path
                                d="M41.7997 32.9437C42.6903 33.9906 43.3591 35.1969 43.7685 36.4938C43.7341 36.5406 43.7153 36.5969 43.7122 36.6531C43.7091 36.8406 43.6966 37.0281 43.6716 37.2125C42.7528 36.6063 41.8653 35.9563 41.0122 35.2656C41.3872 34.525 41.6497 33.7344 41.7935 32.9219L41.7997 32.9437Z"
                                fill="url(#paint25_radial)"/>
                            <path
                                d="M41.1998 32.297C41.1279 33.172 40.8904 34.0283 40.4998 34.822C39.9967 34.3876 39.4936 33.9501 39.0498 33.5189C38.8279 33.3064 38.6154 33.0908 38.4248 32.8814L38.1436 32.5658C38.4311 32.4689 38.7029 32.3345 38.9561 32.1658L39.0529 32.097C39.3529 31.9001 39.5404 31.5783 39.5561 31.2251C39.5561 31.1658 39.5436 31.1095 39.5217 31.0564C40.1311 31.4001 40.6936 31.8158 41.1998 32.297Z"
                                fill="url(#paint26_radial)"/>
                            <path
                                d="M34.8564 16.8938C35.5346 17.4375 36.8252 18.9188 36.9939 22.2C36.4596 22.6719 35.9721 23.1438 35.5252 23.6469L34.1846 23.6532C33.7377 23.1813 33.2502 22.7094 32.7158 22.2063C32.8846 18.9125 34.1971 17.4344 34.8564 16.8938Z"
                                fill="url(#paint27_linear)"/>
                            <path
                                d="M45.1341 16.2C42.1466 17.3812 39.5122 18.9468 37.3622 20.8125C37.1216 21.0125 36.8966 21.2156 36.6841 21.4156L36.6903 21.4218C36.4591 21.6437 36.231 21.8656 36.0216 22.0781C35.831 22.2875 35.6435 22.4968 35.456 22.7062C35.2341 22.4937 35.0247 22.3343 34.8528 22.2156C34.0716 22.7531 32.5091 24.2125 32.3091 27.4718C32.9435 27.9718 33.5247 28.4375 34.056 28.9031L35.6497 28.9C36.181 28.4 36.7591 27.9343 37.3966 27.4687C37.3528 26.7843 37.2497 26.1843 37.1091 25.65C37.8216 25.1312 38.5903 24.6531 39.4122 24.2218C40.6778 21.3468 42.6091 18.6375 45.1341 16.2Z"
                                fill="url(#paint28_linear)"/>
                            <path
                                d="M24.5747 16.2C27.5622 17.3812 30.1997 18.95 32.3466 20.8187C32.5778 21.0187 32.8028 21.2218 33.0247 21.4218C33.256 21.6437 33.4841 21.8593 33.7028 22.0812C33.9185 22.3031 34.1778 22.5875 34.381 22.8312C34.131 23.1562 33.906 23.4875 33.7028 23.8281C33.5403 24.0937 33.3841 24.375 33.2372 24.6812C33.1622 24.8312 33.0966 24.9875 33.0278 25.1531C32.9591 25.3187 32.8653 25.5687 32.7903 25.7906C32.0341 25.225 31.206 24.7093 30.3185 24.2437C29.0497 21.3593 27.1091 18.6437 24.5747 16.2Z"
                                fill="url(#paint29_linear)"/>
                            <path
                                d="M38.9935 28.5906L38.9122 28.7593C38.4247 28.8906 37.9497 29.05 37.4966 29.2312L37.1528 29.375C36.9185 29.475 36.6935 29.5781 36.4747 29.6875L36.2372 29.8093C36.0653 29.9 35.9028 29.9937 35.7497 30.0937L35.5685 29.8093C35.4528 29.6406 35.3466 29.4843 35.2372 29.3375L35.156 29.2281C35.0153 29.05 34.8841 28.8937 34.7622 28.7562C34.6403 28.6187 34.5403 28.5093 34.4497 28.4218L34.5372 28.275C34.8278 27.8937 35.1591 27.5062 35.5185 27.125L35.7747 26.8593L36.0372 26.5843L36.3966 26.25L36.5247 26.1312C36.6778 25.9968 36.8372 25.8625 36.9997 25.7312C37.4966 25.3312 38.031 24.9562 38.5966 24.6031C38.881 24.425 39.1778 24.2437 39.4903 24.075C39.8028 23.9062 40.0778 23.7593 40.3841 23.6031C42.2497 22.7062 44.3466 22.0656 46.556 21.7156C44.0841 23.0218 40.5653 25.3468 38.981 28.5906H38.9935Z"
                                fill="url(#paint30_linear)"/>
                            <path
                                d="M41.1782 27.9155C40.5563 28.2405 39.997 28.6217 39.5188 29.0467C39.3407 29.2092 39.1782 29.378 39.0313 29.553L38.8688 29.7561C38.5126 30.2311 37.2532 31.8499 36.8126 31.9217C36.7376 31.4999 36.6313 31.0842 36.4938 30.6717C36.4407 30.5124 36.3845 30.3592 36.3251 30.1999C36.2657 30.0405 36.1907 29.8686 36.122 29.728L36.0688 29.6186C36.2407 29.5061 36.4188 29.3967 36.6032 29.2874C37.122 28.9842 37.6907 28.7249 38.2938 28.5124C38.5376 28.428 38.7876 28.353 39.0532 28.2811C39.3188 28.2092 39.547 28.1592 39.8032 28.1061C40.2532 28.0186 40.7095 27.953 41.172 27.9124H41.1782V27.9155Z"
                                fill="url(#paint31_linear)"/>
                            <path
                                d="M34.9688 27.7969C34.5595 27.375 34.1188 26.9719 33.6657 26.5813L33.3063 26.275L33.1782 26.1562C33.0251 26.0219 32.8657 25.8875 32.7032 25.7562C32.2063 25.35 31.672 24.9656 31.1063 24.6062C30.822 24.4219 30.5251 24.2469 30.2126 24.0781C29.9282 23.9156 29.6313 23.7563 29.3188 23.6063C27.4532 22.7094 25.3563 22.0687 23.147 21.7188C25.5282 22.9781 28.8938 25.1938 30.5532 28.2656C30.3376 28.2094 30.0657 28.1562 29.8345 28.1125C29.3907 28.0187 29.0595 27.95 28.4345 27.9V27.9187C29.0595 28.2438 29.647 28.625 30.1188 29.05C30.297 29.2125 30.4813 29.3813 30.6282 29.5563L30.8032 29.7594C31.1032 30.1562 32.0407 31.3625 32.5938 31.7812C32.5938 31.7969 32.5938 31.8094 32.5907 31.825C33.1563 32.2 36.5438 32.1719 37.1063 31.8219C37.0001 30.2906 36.1126 28.975 34.9688 27.7969Z"
                                fill="url(#paint32_linear)"/>
                            <g opacity="0.2">
                                <path opacity="0.2"
                                      d="M34.825 18.3218C35.25 18.9031 35.7312 19.8687 35.9375 21.4062C35.9844 21.7531 36.2187 22.0437 36.5469 22.1625C36.65 22.2 36.7594 22.2187 36.8688 22.2187C37.1 22.2187 37.325 22.1343 37.5 21.975C37.6625 21.8281 37.8 21.7062 37.9437 21.5843C38.9562 20.7031 40.075 19.8968 41.2937 19.1656C40.2062 20.6343 39.3 22.1718 38.5844 23.7687C38.4187 24.1375 38.5094 24.5687 38.8031 24.8406C38.9812 25.0031 39.2094 25.0875 39.4375 25.0875C39.5906 25.0875 39.7469 25.05 39.8875 24.9718L39.9094 24.9593C40.2 24.8 40.4656 24.6593 40.7656 24.5062C40.9094 24.4375 41.0531 24.3718 41.1969 24.3062C39.7281 25.6437 38.8406 26.9 38.3031 27.8906C38.1281 28.2125 38.1594 28.6062 38.3781 28.8968C38.3437 28.9312 38.3125 28.9687 38.2781 29.0093C38.2719 29.0156 38.2688 29.0218 38.2625 29.025L38.1 29.2281C38.0937 29.2375 38.0875 29.2437 38.0813 29.2531C37.5562 29.9531 36.8375 30.8062 36.4875 31.0812C36.4813 31.0843 36.4781 31.0875 36.4719 31.0937C36.175 31.1531 35.5531 31.2156 34.7437 31.2156C33.9031 31.2156 33.3562 31.1468 33.1187 31.0968C33.1156 31.0937 33.1125 31.0937 33.1094 31.0906C32.7281 30.8 31.9187 29.825 31.4906 29.2531C31.4656 29.2187 31.4375 29.1875 31.4062 29.1562L31.2281 28.975C31.2219 28.9687 31.2156 28.9593 31.2094 28.9531C31.225 28.9375 31.2375 28.9187 31.2531 28.9031C31.4844 28.6093 31.5188 28.2062 31.3406 27.8781C30.6125 26.5281 29.5906 25.3406 28.4625 24.3156C28.6 24.3781 28.7375 24.4406 28.875 24.5062C29.1656 24.6468 29.4469 24.7937 29.7094 24.9468C29.7156 24.95 29.7187 24.95 29.725 24.9562L29.7594 24.975C29.9 25.0531 30.0562 25.0906 30.2094 25.0906C30.4406 25.0906 30.6687 25.0062 30.8469 24.8406C31.1437 24.5687 31.2312 24.1343 31.0656 23.7687C30.35 22.175 29.4438 20.6375 28.3563 19.1687C29.5688 19.8968 30.6844 20.7031 31.6937 21.5812C31.825 21.6968 31.9531 21.8125 32.0812 21.925L32.1469 21.9843C32.3219 22.1406 32.5469 22.225 32.775 22.225C32.8844 22.225 32.9937 22.2062 33.1 22.1656C33.425 22.0468 33.6594 21.7531 33.7063 21.4093C33.9062 19.8875 34.3937 18.9125 34.825 18.3218ZM45.0969 16.2625C42.1094 17.4437 39.475 19.0093 37.325 20.875C37.1656 21.0093 37.0125 21.1468 36.8625 21.2812C36.5156 18.6781 35.4219 17.4406 34.8156 16.9562C34.2281 17.4406 33.1187 18.6781 32.7688 21.2937C32.6156 21.1562 32.4656 21.0187 32.3094 20.8812C30.1625 19.0125 27.525 17.4437 24.5375 16.2625C27.0281 18.6625 28.9406 21.3312 30.2062 24.1562C30.1969 24.15 30.1844 24.1437 30.175 24.1375C29.8906 23.975 29.5938 23.8156 29.2812 23.6656C27.4156 22.7687 25.3188 22.1281 23.1094 21.7781C25.4906 23.0375 28.8563 25.2531 30.5156 28.325C30.3 28.2687 29.9219 28.2156 29.6906 28.1718C29.2469 28.0781 29.1969 27.9781 28.5063 27.9281C29.1969 28.2531 29.5031 28.6843 29.975 29.1093C30.1531 29.2718 30.3906 29.4406 30.5375 29.6156L30.7375 29.8187C31.0375 30.2156 31.9906 31.4218 32.5406 31.8406C32.5406 31.8562 32.5469 31.8687 32.5469 31.8843C32.8219 32.0687 33.775 32.1562 34.7406 32.1562C35.75 32.1562 36.775 32.0625 37.0656 31.8812C37.0656 31.8625 37.0594 31.8437 37.0594 31.825C37.6156 31.3937 38.5344 30.2125 38.8281 29.8187L38.9906 29.6156C39.1375 29.4406 39.3 29.3125 39.4781 29.15C39.9563 28.7218 40.5125 28.3281 41.1375 28.0562H41.1313C40.6688 28.0562 40.2125 28.1218 39.7625 28.2093C39.5437 28.2531 39.3406 28.2812 39.125 28.3343C40.7812 25.2687 44.1375 23.0375 46.5188 21.7781C44.3063 22.1281 42.2125 22.7687 40.3469 23.6656C40.0438 23.8218 39.7656 23.9687 39.4531 24.1375L39.4344 24.1468C40.7063 21.325 42.6125 18.6625 45.0969 16.2625Z"
                                      fill="#424242"/>
                            </g>
                            <defs>
                                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(31.1341 37.3846) scale(13.6059 13.1352)">
                                    <stop offset="0.0079526" stop-color="#BD9563"/>
                                    <stop offset="0.3192" stop-color="#AA8252"/>
                                    <stop offset="0.9492" stop-color="#795028"/>
                                    <stop offset="1" stop-color="#754C24"/>
                                </radialGradient>
                                <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.3723 38.6423) scale(3.81437 3.6824)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.6809 45.0138) scale(2.89703 2.79679)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2145" stop-color="#FFCC3A"/>
                                    <stop offset="0.4463" stop-color="#FEBF30"/>
                                    <stop offset="0.6862" stop-color="#FDA91F"/>
                                    <stop offset="0.9303" stop-color="#FB8B08"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint3_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(31.3426 35.2908) scale(4.51938 4.363)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(27.6188 37.9718) scale(3.27344 3.16018)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint5_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(30.7743 41.7495) scale(3.97219 3.83475)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint6_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(30.6483 47.11) scale(2.61291 2.5225)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.3139" stop-color="#FFCF3C"/>
                                    <stop offset="0.5152" stop-color="#FFCC3A"/>
                                    <stop offset="0.6571" stop-color="#FEC333"/>
                                    <stop offset="0.7807" stop-color="#FDB327"/>
                                    <stop offset="0.8932" stop-color="#FC9E16"/>
                                    <stop offset="0.9984" stop-color="#FA8100"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint7_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.6707 49.8944) scale(2.66781 2.57551)">
                                    <stop offset="0.0079681" stop-color="#FFFDE7"/>
                                    <stop offset="1" stop-color="#FFC400"/>
                                </radialGradient>
                                <radialGradient id="paint8_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(38.5202 47.4265) scale(2.73137 2.63687)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2461" stop-color="#FFCD39"/>
                                    <stop offset="0.5121" stop-color="#FFC52C"/>
                                    <stop offset="0.7865" stop-color="#FFB816"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint9_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(38.2559 41.9953) scale(2.90525 2.80473)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2651" stop-color="#FFCD3B"/>
                                    <stop offset="0.4769" stop-color="#FEC333"/>
                                    <stop offset="0.6701" stop-color="#FDB226"/>
                                    <stop offset="0.8514" stop-color="#FC9A14"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint10_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(41.0169 38.5345) scale(2.65453 2.56268)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2405" stop-color="#FFCB34"/>
                                    <stop offset="0.6254" stop-color="#FFBD1D"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint11_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(37.6462 35.6352) scale(2.76719 2.67144)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint12_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.6703 34.0664) scale(1.43 1.38052)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.1944" stop-color="#FFC937"/>
                                    <stop offset="0.4806" stop-color="#FDB528"/>
                                    <stop offset="0.8217" stop-color="#FB950F"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint13_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(29.6725 32.9331) scale(1.76181 1.70085)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2063" stop-color="#FEC635"/>
                                    <stop offset="0.5549" stop-color="#FDAC21"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint14_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(26.9741 35.0685) scale(1.83 1.76668)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2121" stop-color="#FFCB3A"/>
                                    <stop offset="0.4458" stop-color="#FEBE2F"/>
                                    <stop offset="0.6897" stop-color="#FCA81E"/>
                                    <stop offset="0.9392" stop-color="#FB8A07"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint15_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(25.9491 40.4411) scale(1.79141 1.72942)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint16_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(27.609 44.2987) scale(2.48353 2.3976)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.245" stop-color="#FFCC3A"/>
                                    <stop offset="0.4623" stop-color="#FEC232"/>
                                    <stop offset="0.6691" stop-color="#FDB024"/>
                                    <stop offset="0.8682" stop-color="#FB9610"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint17_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(25.8528 46.2031) scale(0.699969 0.675749)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint18_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(27.9842 48.8113) scale(1.82956 1.76626)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2887" stop-color="#FFCD3B"/>
                                    <stop offset="0.4952" stop-color="#FEC434"/>
                                    <stop offset="0.6761" stop-color="#FDB427"/>
                                    <stop offset="0.8412" stop-color="#FC9E17"/>
                                    <stop offset="0.996" stop-color="#FA8201"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint19_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(31.0732 51.433) scale(2.15253 2.07805)">
                                    <stop offset="0.0079681" stop-color="#FFFDE7"/>
                                    <stop offset="1" stop-color="#FFC400"/>
                                </radialGradient>
                                <radialGradient id="paint20_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(38.3087 51.433) scale(2.16228 2.08747)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2461" stop-color="#FFCD39"/>
                                    <stop offset="0.5121" stop-color="#FFC52C"/>
                                    <stop offset="0.7865" stop-color="#FFB816"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint21_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(41.3851 48.8234) scale(1.83597 1.77245)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2461" stop-color="#FFCD39"/>
                                    <stop offset="0.5121" stop-color="#FFC52C"/>
                                    <stop offset="0.7865" stop-color="#FFB816"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint22_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(43.5337 46.1762) scale(0.73 0.704742)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint23_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(41.7554 44.3011) scale(2.48875 2.40264)">
                                    <stop offset="1" stop-color="white"/>
                                    <stop offset="0.0862" stop-color="#FFFCF7"/>
                                    <stop offset="0.2177" stop-color="#FFF5E2"/>
                                    <stop offset="0.3781" stop-color="#FFEABF"/>
                                    <stop offset="0.5613" stop-color="#FFDA8F"/>
                                    <stop offset="0.7637" stop-color="#FFC652"/>
                                    <stop offset="0.9793" stop-color="#FFAD07"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint24_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(43.4154 40.4486) scale(1.80006 1.73778)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint25_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(42.3922 35.0684) scale(1.84888 1.7849)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint26_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(39.6714 32.938) scale(1.75228 1.69165)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.0581" stop-color="#FFCD38"/>
                                    <stop offset="0.442" stop-color="#FFBA19"/>
                                    <stop offset="0.7695" stop-color="#FFAF07"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <linearGradient id="paint27_linear" x1="34.8552" y1="16.8286" x2="34.8552" y2="22.9975"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.00729" stop-color="#AED581"/>
                                    <stop offset="0.3315" stop-color="#8EBD60"/>
                                    <stop offset="0.6783" stop-color="#73A743"/>
                                    <stop offset="0.8765" stop-color="#689F38"/>
                                </linearGradient>
                                <linearGradient id="paint28_linear" x1="32.3113" y1="22.5521" x2="45.1331" y2="22.5521"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.00729" stop-color="#AED581"/>
                                    <stop offset="0.3315" stop-color="#8EBD60"/>
                                    <stop offset="0.6783" stop-color="#73A743"/>
                                    <stop offset="0.8765" stop-color="#689F38"/>
                                </linearGradient>
                                <linearGradient id="paint29_linear" x1="25.9413" y1="15.5313" x2="34.4444" y2="26.16"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.1355" stop-color="#388E3C"/>
                                    <stop offset="0.27" stop-color="#439542"/>
                                    <stop offset="0.5064" stop-color="#60A654"/>
                                    <stop offset="0.8145" stop-color="#90C36F"/>
                                    <stop offset="0.9927" stop-color="#AED581"/>
                                </linearGradient>
                                <linearGradient id="paint30_linear" x1="36.2363" y1="29.67" x2="44.5144" y2="20.6256"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.1355" stop-color="#388E3C"/>
                                    <stop offset="0.27" stop-color="#439542"/>
                                    <stop offset="0.5064" stop-color="#60A654"/>
                                    <stop offset="0.8145" stop-color="#90C36F"/>
                                    <stop offset="0.9927" stop-color="#AED581"/>
                                </linearGradient>
                                <linearGradient id="paint31_linear" x1="35.9151" y1="31.492" x2="40.2863" y2="27.0955"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.1355" stop-color="#388E3C"/>
                                    <stop offset="0.27" stop-color="#439542"/>
                                    <stop offset="0.5064" stop-color="#60A654"/>
                                    <stop offset="0.8145" stop-color="#90C36F"/>
                                    <stop offset="0.9927" stop-color="#AED581"/>
                                </linearGradient>
                                <linearGradient id="paint32_linear" x1="25.4032" y1="21.0928" x2="35.9345" y2="32.3947"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.00729" stop-color="#AED581"/>
                                    <stop offset="0.3315" stop-color="#8EBD60"/>
                                    <stop offset="0.6783" stop-color="#73A743"/>
                                    <stop offset="0.8765" stop-color="#689F38"/>
                                </linearGradient>
                            </defs>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    MEME
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
                                    {(stakedAmount && total) && weiDiv(stakedAmount, total)} %
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
                            <path
                                d="M27.2781 32.3187C25.3094 34.4624 24.2656 37.6218 24.2656 41.4468C24.2656 45.2718 25.3094 48.4312 27.2781 50.5749C29.1594 52.5999 31.8687 53.7281 34.6875 53.653C37.5062 53.7281 40.2156 52.603 42.0969 50.5749C44.0656 48.4312 45.1094 45.2718 45.1094 41.4468C45.1094 37.6218 44.0656 34.4624 42.1 32.3187C38.9125 28.7999 31.2531 28.0374 27.2781 32.3187Z"
                                fill="url(#paint0_radial2)"/>
                            <g opacity="0.2">
                                <path opacity="0.2"
                                      d="M34.575 30.3218C37.3219 30.3218 39.9406 31.328 41.4094 32.9499C43.2156 34.9218 44.1719 37.8593 44.1719 41.4468C44.1719 45.0343 43.2156 47.9718 41.4094 49.9374C39.7688 51.7062 37.4156 52.7187 34.95 52.7187C34.8719 52.7187 34.7906 52.7187 34.7125 52.7155H34.6875H34.6625C34.5844 52.7187 34.5031 52.7187 34.425 52.7187C31.9625 52.7187 29.6062 51.7062 27.9688 49.9405C26.1594 47.9687 25.2031 45.0312 25.2031 41.4468C25.2031 37.8593 26.1594 34.9218 27.9656 32.9562C29.5406 31.2593 31.8906 30.3218 34.575 30.3218ZM34.575 29.3843C31.8937 29.3843 29.1719 30.278 27.2781 32.3155C25.3094 34.4593 24.2656 37.6187 24.2656 41.4437C24.2656 45.2687 25.3094 48.428 27.2781 50.5718C29.1 52.5343 31.7 53.653 34.425 53.653C34.5125 53.653 34.6 53.653 34.6875 53.6499C34.775 53.653 34.8625 53.653 34.95 53.653C37.6719 53.653 40.2719 52.5343 42.0969 50.5718C44.0656 48.428 45.1094 45.2687 45.1094 41.4437C45.1094 37.6155 44.0656 34.4593 42.1 32.3155C40.4281 30.4718 37.5281 29.3843 34.575 29.3843Z"
                                      fill="#424242"/>
                            </g>
                            <path
                                d="M31.7285 39.0252C32.7723 38.1471 33.7566 37.2096 34.6754 36.2158C35.5973 37.2096 36.5816 38.1502 37.6223 39.0252C36.7098 40.0283 35.7254 40.9721 34.6754 41.8439C33.6254 40.9721 32.641 40.0283 31.7285 39.0252Z"
                                fill="url(#paint1_radial2)"/>
                            <path
                                d="M37.9719 45.025C37.6688 45.2688 37.3625 45.5125 37.0438 45.75C36.2781 46.3281 35.4781 46.8688 34.6813 47.3688C33.8813 46.8813 33.0844 46.3219 32.3187 45.75C31.9969 45.5063 31.6875 45.2625 31.3906 45.025C32.5406 44.3031 33.6406 43.5125 34.6875 42.6562C35.7281 43.5125 36.825 44.3031 37.9719 45.025Z"
                                fill="url(#paint2_radial2)"/>
                            <path
                                d="M31.3251 38.5061C30.5032 37.5529 29.7813 36.5186 29.1782 35.4217C29.5813 35.0873 29.9782 34.7404 30.3532 34.3967C30.7251 34.0498 31.1532 33.6342 31.497 33.2623C31.6126 33.1373 31.7188 33.0154 31.8251 32.8936L31.9313 32.7686L32.1282 32.8186H32.1595L32.3345 33.1154C32.4313 33.2717 32.5345 33.4342 32.647 33.6029L32.7376 33.7279C33.1782 34.3592 33.6501 34.9686 34.1532 35.5529L34.2626 35.6779C33.347 36.6779 32.3657 37.6248 31.3251 38.5061Z"
                                fill="url(#paint3_radial2)"/>
                            <path
                                d="M30.8219 38.9C29.7969 39.7469 28.7188 40.525 27.5875 41.2344C26.7781 40.2344 26.1781 39.0938 25.8125 37.8719C26.7938 37.2375 27.7375 36.5562 28.6438 35.8281C29.2688 36.9187 29.9969 37.9469 30.8219 38.9Z"
                                fill="url(#paint4_radial2)"/>
                            <path
                                d="M31.2437 39.3877C32.1562 40.4033 33.1374 41.3564 34.1812 42.2439C33.128 43.0971 32.0187 43.8846 30.8593 44.5971C29.8187 43.7283 28.8593 42.7721 27.9937 41.7408C29.1312 41.0252 30.2218 40.2408 31.253 39.3908L31.2437 39.3877Z"
                                fill="url(#paint5_radial2)"/>
                            <path
                                d="M31.8939 46.2561C32.6033 46.8092 33.3408 47.2967 34.0564 47.7529C32.9877 48.3967 31.8752 48.9717 30.7252 49.4686C29.6158 48.7248 28.5689 47.8967 27.5908 46.9967C28.6971 46.5342 29.7658 45.9936 30.7908 45.3779C31.1471 45.6748 31.5158 45.9654 31.9002 46.2592L31.8939 46.2561Z"
                                fill="url(#paint6_radial2)"/>
                            <path
                                d="M34.672 48.1377C35.7345 48.7908 36.8376 49.3783 37.9782 49.8939C36.9282 50.5658 35.822 51.1533 34.672 51.6502C33.522 51.1533 32.4157 50.5658 31.3657 49.8939C32.5063 49.3783 33.6126 48.7939 34.6751 48.1439L34.672 48.1377Z"
                                fill="url(#paint7_radial2)"/>
                            <path
                                d="M35.2905 47.7496C36.0155 47.2621 36.7405 46.7777 37.4405 46.2559C37.828 45.9652 38.1905 45.6715 38.5499 45.3809C39.5749 45.9965 40.6437 46.5371 41.7499 46.9996C40.7718 47.8996 39.7249 48.7246 38.6155 49.4715C37.4718 48.9715 36.3655 48.3965 35.2999 47.7559L35.2905 47.7496Z"
                                fill="url(#paint8_radial2)"/>
                            <path
                                d="M38.4815 44.5971C37.3222 43.8846 36.2128 43.0971 35.1597 42.2439C36.2034 41.3564 37.1847 40.4033 38.0972 39.3877C39.1284 40.2408 40.2159 41.0252 41.3534 41.7408C40.4878 42.7721 39.5284 43.7314 38.4878 44.6002L38.4815 44.5971Z"
                                fill="url(#paint9_radial2)"/>
                            <path
                                d="M38.5156 38.9003C39.3375 37.9472 40.0656 36.919 40.6875 35.8315C41.5937 36.5597 42.5406 37.2409 43.5188 37.8753C43.1563 39.094 42.5531 40.2347 41.7438 41.2378C40.6188 40.5284 39.5437 39.7503 38.525 38.9034L38.5156 38.9003Z"
                                fill="url(#paint10_radial2)"/>
                            <path
                                d="M38.0405 38.506C36.9999 37.6216 36.0187 36.6716 35.103 35.6653L35.2124 35.5403C35.7155 34.9591 36.1874 34.3497 36.628 33.7216L36.7187 33.5903C36.8218 33.4341 36.9249 33.2716 37.0218 33.1028L37.203 32.806H37.2624L37.4374 32.7622L37.5468 32.8935C37.653 33.0153 37.7593 33.1403 37.8749 33.2685C38.2218 33.6435 38.6155 34.031 39.0343 34.4153C39.453 34.7997 39.7905 35.0903 40.1843 35.4185C39.5843 36.5153 38.8687 37.5528 38.0468 38.506H38.0405Z"
                                fill="url(#paint11_radial2)"/>
                            <path
                                d="M36.2591 33.1033L36.1185 33.3127L35.9278 33.5846L35.7528 33.8283C35.4247 34.2752 35.0685 34.7221 34.681 35.1721C34.2935 34.7252 33.9341 34.2721 33.6091 33.8252L33.4341 33.5877L33.2435 33.3158L33.1028 33.1064L33.0122 32.9658L33.4372 33.0096L33.9403 33.0439H34.6872C34.6872 33.0439 35.1903 33.0439 35.4341 33.0439L35.9372 33.0096L36.3403 32.9658L36.2591 33.1033Z"
                                fill="url(#paint12_radial2)"/>
                            <path
                                d="M29.8625 31.0342C29.8313 31.0998 29.8125 31.1717 29.8125 31.2436C29.8313 31.5936 30.0156 31.9154 30.3156 32.1154L30.4125 32.1842C30.6563 32.3467 30.925 32.4779 31.2031 32.5748L30.925 32.8811C30.7375 33.0842 30.5312 33.2936 30.3156 33.5029C29.8625 33.9404 29.3625 34.3936 28.8406 34.8311C28.45 34.0436 28.2125 33.1967 28.1406 32.3248C28.6563 31.8342 29.2375 31.4092 29.8625 31.0592V31.0342Z"
                                fill="url(#paint13_radial2)"/>
                            <path
                                d="M27.5562 32.9468C27.7062 33.7437 27.9719 34.5155 28.3438 35.2437C27.4906 35.9343 26.6031 36.5843 25.6844 37.1905C25.6594 37.0062 25.6469 36.8187 25.6438 36.6312C25.6438 36.5843 25.6312 36.5374 25.6094 36.4937C26.0094 35.1999 26.6719 33.9968 27.5562 32.9468Z"
                                fill="url(#paint14_radial2)"/>
                            <path
                                d="M24.866 41.5716C24.8598 40.4653 24.9566 39.3622 25.1535 38.2747L25.2285 38.231C25.6254 39.4372 26.2348 40.5685 27.0316 41.5716C26.3441 41.9747 25.6316 42.3372 24.8941 42.6528C24.8816 42.3028 24.866 41.9466 24.866 41.5716Z"
                                fill="url(#paint15_radial2)"/>
                            <path
                                d="M24.9468 43.3346C25.8093 42.9814 26.6405 42.5658 27.4374 42.0908C28.2968 43.1221 29.2437 44.0814 30.2749 44.9564C29.253 45.5533 28.1843 46.0721 27.0812 46.5127C26.1718 45.6939 25.453 44.7002 24.9749 43.5939C24.9655 43.5127 24.9593 43.4096 24.9499 43.3408V43.3346H24.9468Z"
                                fill="url(#paint16_radial2)"/>
                            <path
                                d="M25.2778 45.4253C25.631 45.8909 26.0153 46.3347 26.4278 46.7534C26.1935 46.8347 25.9591 46.9097 25.7278 46.9815C25.5466 46.4722 25.3966 45.9534 25.2778 45.4253Z"
                                fill="url(#paint17_radial2)"/>
                            <path
                                d="M25.9623 47.5843C26.2842 47.4874 26.6061 47.3812 26.9342 47.2593C27.8904 48.1687 28.9186 49.003 30.0092 49.7593C29.2748 50.0562 28.5061 50.2624 27.7154 50.3687C26.9748 49.5437 26.3779 48.6062 25.9561 47.5905L25.9623 47.5843Z"
                                fill="url(#paint18_radial2)"/>
                            <path
                                d="M28.3032 50.9408C29.1095 50.7752 29.8938 50.5314 30.6501 50.2158C31.6688 50.8814 32.7345 51.4752 33.8438 51.9877C32.947 52.3283 32.0095 52.5502 31.0532 52.6502C30.0313 52.2564 29.097 51.6752 28.3032 50.9408Z"
                                fill="url(#paint19_radial2)"/>
                            <path
                                d="M34.6904 53.2813C33.9498 53.2813 33.2123 53.2063 32.4873 53.0563C33.2342 52.8782 33.9654 52.6438 34.6748 52.3501C35.3842 52.6438 36.1186 52.8813 36.8654 53.0595C36.1529 53.2095 35.4217 53.2813 34.6904 53.2813Z"
                                fill="#FDD835"/>
                            <path
                                d="M38.3249 52.6471C37.3655 52.5502 36.4218 52.3314 35.5249 51.9908C36.628 51.4752 37.6905 50.8846 38.703 50.2158C39.4718 50.5408 40.2749 50.7877 41.0968 50.9564C40.2937 51.6877 39.353 52.2627 38.3249 52.6471Z"
                                fill="url(#paint20_radial2)"/>
                            <path
                                d="M41.6688 50.381C40.872 50.2778 40.0907 50.0716 39.3501 49.7685C40.4345 49.0091 41.4563 48.1716 42.4095 47.2622C42.7407 47.3841 43.0751 47.4966 43.4157 47.5966C42.9938 48.6091 42.4032 49.5497 41.6626 50.3747L41.6688 50.381Z"
                                fill="url(#paint21_radial2)"/>
                            <path
                                d="M43.6594 46.975C43.4219 46.9031 43.1812 46.825 42.9375 46.7406C43.3625 46.3062 43.7625 45.8437 44.1281 45.3594C44.0062 45.9125 43.8469 46.4562 43.6531 46.9875L43.6594 46.975Z"
                                fill="url(#paint22_radial2)"/>
                            <path
                                d="M44.4251 43.4658C44.2126 44.2877 43.4188 45.3783 42.2782 46.5158C41.1751 46.0752 40.1063 45.5564 39.0845 44.9596C40.1095 44.0846 41.0532 43.1221 41.9063 42.0908C42.7126 42.5721 43.5532 42.9939 44.4251 43.3502V43.4658Z"
                                fill="url(#paint23_radial2)"/>
                            <path
                                d="M44.2279 38.2935C44.4217 39.3747 44.5154 40.4747 44.5092 41.5716C44.5092 41.9466 44.5092 42.3122 44.4779 42.6653C43.7342 42.3466 43.0123 41.981 42.3154 41.5716C43.1123 40.5653 43.7217 39.4372 44.1186 38.231L44.2279 38.2935Z"
                                fill="url(#paint24_radial2)"/>
                            <path
                                d="M41.7997 32.9437C42.6903 33.9906 43.3591 35.1969 43.7685 36.4938C43.7341 36.5406 43.7153 36.5969 43.7122 36.6531C43.7091 36.8406 43.6966 37.0281 43.6716 37.2125C42.7528 36.6063 41.8653 35.9563 41.0122 35.2656C41.3872 34.525 41.6497 33.7344 41.7935 32.9219L41.7997 32.9437Z"
                                fill="url(#paint25_radial2)"/>
                            <path
                                d="M41.1998 32.2968C41.1279 33.1718 40.8904 34.028 40.4998 34.8218C39.9967 34.3874 39.4936 33.9499 39.0498 33.5187C38.8279 33.3062 38.6154 33.0905 38.4248 32.8812L38.1436 32.5655C38.4311 32.4687 38.7029 32.3343 38.9561 32.1655L39.0529 32.0968C39.3529 31.8999 39.5404 31.578 39.5561 31.2249C39.5561 31.1655 39.5436 31.1093 39.5217 31.0562C40.1311 31.3999 40.6936 31.8155 41.1998 32.2968Z"
                                fill="url(#paint26_radial2)"/>
                            <path
                                d="M34.8564 16.8936C35.5346 17.4373 36.8252 18.9186 36.9939 22.1998C36.4596 22.6717 35.9721 23.1436 35.5252 23.6467L34.1846 23.6529C33.7377 23.1811 33.2502 22.7092 32.7158 22.2061C32.8846 18.9123 34.1971 17.4342 34.8564 16.8936Z"
                                fill="url(#paint27_linear2)"/>
                            <path
                                d="M45.1341 16.1997C42.1466 17.381 39.5122 18.9466 37.3622 20.8122C37.1216 21.0122 36.8966 21.2153 36.6841 21.4153L36.6903 21.4216C36.4591 21.6435 36.231 21.8653 36.0216 22.0778C35.831 22.2872 35.6435 22.4966 35.456 22.706C35.2341 22.4935 35.0247 22.3341 34.8528 22.2153C34.0716 22.7528 32.5091 24.2122 32.3091 27.4716C32.9435 27.9716 33.5247 28.4372 34.056 28.9028L35.6497 28.8997C36.181 28.3997 36.7591 27.9341 37.3966 27.4685C37.3528 26.7841 37.2497 26.1841 37.1091 25.6497C37.8216 25.131 38.5903 24.6528 39.4122 24.2216C40.6778 21.3466 42.6091 18.6372 45.1341 16.1997Z"
                                fill="url(#paint28_linear2)"/>
                            <path
                                d="M24.5747 16.1997C27.5622 17.381 30.1997 18.9497 32.3466 20.8185C32.5778 21.0185 32.8028 21.2216 33.0247 21.4216C33.256 21.6435 33.4841 21.8591 33.7028 22.081C33.9185 22.3028 34.1778 22.5872 34.381 22.831C34.131 23.156 33.906 23.4872 33.7028 23.8278C33.5403 24.0935 33.3841 24.3747 33.2372 24.681C33.1622 24.831 33.0966 24.9872 33.0278 25.1528C32.9591 25.3185 32.8653 25.5685 32.7903 25.7903C32.0341 25.2247 31.206 24.7091 30.3185 24.2435C29.0497 21.3591 27.1091 18.6435 24.5747 16.1997Z"
                                fill="url(#paint29_linear2)"/>
                            <path
                                d="M38.9935 28.5908L38.9122 28.7596C38.4247 28.8908 37.9497 29.0502 37.4966 29.2314L37.1528 29.3752C36.9185 29.4752 36.6935 29.5783 36.4747 29.6877L36.2372 29.8096C36.0653 29.9002 35.9028 29.9939 35.7497 30.0939L35.5685 29.8096C35.4528 29.6408 35.3466 29.4846 35.2372 29.3377L35.156 29.2283C35.0153 29.0502 34.8841 28.8939 34.7622 28.7564C34.6403 28.6189 34.5403 28.5096 34.4497 28.4221L34.5372 28.2752C34.8278 27.8939 35.1591 27.5064 35.5185 27.1252L35.7747 26.8596L36.0372 26.5846L36.3966 26.2502L36.5247 26.1314C36.6778 25.9971 36.8372 25.8627 36.9997 25.7314C37.4966 25.3314 38.031 24.9564 38.5966 24.6033C38.881 24.4252 39.1778 24.2439 39.4903 24.0752C39.8028 23.9064 40.0778 23.7596 40.3841 23.6033C42.2497 22.7064 44.3466 22.0658 46.556 21.7158C44.0841 23.0221 40.5653 25.3471 38.981 28.5908H38.9935Z"
                                fill="url(#paint30_linear2)"/>
                            <path
                                d="M41.1782 27.9157C40.5563 28.2407 39.997 28.622 39.5188 29.047C39.3407 29.2095 39.1782 29.3782 39.0313 29.5532L38.8688 29.7563C38.5126 30.2313 37.2532 31.8501 36.8126 31.922C36.7376 31.5001 36.6313 31.0845 36.4938 30.672C36.4407 30.5126 36.3845 30.3595 36.3251 30.2001C36.2657 30.0407 36.1907 29.8688 36.122 29.7282L36.0688 29.6188C36.2407 29.5063 36.4188 29.397 36.6032 29.2876C37.122 28.9845 37.6907 28.7251 38.2938 28.5126C38.5376 28.4282 38.7876 28.3532 39.0532 28.2813C39.3188 28.2095 39.547 28.1595 39.8032 28.1063C40.2532 28.0188 40.7095 27.9532 41.172 27.9126H41.1782V27.9157Z"
                                fill="url(#paint31_linear2)"/>
                            <path
                                d="M34.9688 27.7969C34.5595 27.375 34.1188 26.9719 33.6657 26.5813L33.3063 26.275L33.1782 26.1562C33.0251 26.0219 32.8657 25.8875 32.7032 25.7562C32.2063 25.35 31.672 24.9656 31.1063 24.6062C30.822 24.4219 30.5251 24.2469 30.2126 24.0781C29.9282 23.9156 29.6313 23.7563 29.3188 23.6063C27.4532 22.7094 25.3563 22.0687 23.147 21.7188C25.5282 22.9781 28.8938 25.1938 30.5532 28.2656C30.3376 28.2094 30.0657 28.1562 29.8345 28.1125C29.3907 28.0187 29.0595 27.95 28.4345 27.9V27.9187C29.0595 28.2438 29.647 28.625 30.1188 29.05C30.297 29.2125 30.4813 29.3813 30.6282 29.5563L30.8032 29.7594C31.1032 30.1562 32.0407 31.3625 32.5938 31.7812C32.5938 31.7969 32.5938 31.8094 32.5907 31.825C33.1563 32.2 36.5438 32.1719 37.1063 31.8219C37.0001 30.2906 36.1126 28.975 34.9688 27.7969Z"
                                fill="url(#paint32_linear2)"/>
                            <g opacity="0.2">
                                <path opacity="0.2"
                                      d="M34.825 18.3221C35.25 18.9033 35.7312 19.8689 35.9375 21.4064C35.9844 21.7533 36.2187 22.0439 36.5469 22.1627C36.65 22.2002 36.7594 22.2189 36.8688 22.2189C37.1 22.2189 37.325 22.1346 37.5 21.9752C37.6625 21.8283 37.8 21.7064 37.9437 21.5846C38.9562 20.7033 40.075 19.8971 41.2937 19.1658C40.2062 20.6346 39.3 22.1721 38.5844 23.7689C38.4187 24.1377 38.5094 24.5689 38.8031 24.8408C38.9812 25.0033 39.2094 25.0877 39.4375 25.0877C39.5906 25.0877 39.7469 25.0502 39.8875 24.9721L39.9094 24.9596C40.2 24.8002 40.4656 24.6596 40.7656 24.5064C40.9094 24.4377 41.0531 24.3721 41.1969 24.3064C39.7281 25.6439 38.8406 26.9002 38.3031 27.8908C38.1281 28.2127 38.1594 28.6064 38.3781 28.8971C38.3437 28.9314 38.3125 28.9689 38.2781 29.0096C38.2719 29.0158 38.2688 29.0221 38.2625 29.0252L38.1 29.2283C38.0937 29.2377 38.0875 29.2439 38.0813 29.2533C37.5562 29.9533 36.8375 30.8064 36.4875 31.0814C36.4813 31.0846 36.4781 31.0877 36.4719 31.0939C36.175 31.1533 35.5531 31.2158 34.7437 31.2158C33.9031 31.2158 33.3562 31.1471 33.1187 31.0971C33.1156 31.0939 33.1125 31.0939 33.1094 31.0908C32.7281 30.8002 31.9187 29.8252 31.4906 29.2533C31.4656 29.2189 31.4375 29.1877 31.4062 29.1564L31.2281 28.9752C31.2219 28.9689 31.2156 28.9596 31.2094 28.9533C31.225 28.9377 31.2375 28.9189 31.2531 28.9033C31.4844 28.6096 31.5188 28.2064 31.3406 27.8783C30.6125 26.5283 29.5906 25.3408 28.4625 24.3158C28.6 24.3783 28.7375 24.4408 28.875 24.5064C29.1656 24.6471 29.4469 24.7939 29.7094 24.9471C29.7156 24.9502 29.7187 24.9502 29.725 24.9564L29.7594 24.9752C29.9 25.0533 30.0562 25.0908 30.2094 25.0908C30.4406 25.0908 30.6687 25.0064 30.8469 24.8408C31.1437 24.5689 31.2312 24.1346 31.0656 23.7689C30.35 22.1752 29.4438 20.6377 28.3563 19.1689C29.5688 19.8971 30.6844 20.7033 31.6937 21.5814C31.825 21.6971 31.9531 21.8127 32.0812 21.9252L32.1469 21.9846C32.3219 22.1408 32.5469 22.2252 32.775 22.2252C32.8844 22.2252 32.9937 22.2064 33.1 22.1658C33.425 22.0471 33.6594 21.7533 33.7063 21.4096C33.9062 19.8877 34.3937 18.9127 34.825 18.3221ZM45.0969 16.2627C42.1094 17.4439 39.475 19.0096 37.325 20.8752C37.1656 21.0096 37.0125 21.1471 36.8625 21.2814C36.5156 18.6783 35.4219 17.4408 34.8156 16.9564C34.2281 17.4408 33.1187 18.6783 32.7688 21.2939C32.6156 21.1564 32.4656 21.0189 32.3094 20.8814C30.1625 19.0127 27.525 17.4439 24.5375 16.2627C27.0281 18.6627 28.9406 21.3314 30.2062 24.1564C30.1969 24.1502 30.1844 24.1439 30.175 24.1377C29.8906 23.9752 29.5938 23.8158 29.2812 23.6658C27.4156 22.7689 25.3188 22.1283 23.1094 21.7783C25.4906 23.0377 28.8563 25.2533 30.5156 28.3252C30.3 28.2689 29.9219 28.2158 29.6906 28.1721C29.2469 28.0783 29.1969 27.9783 28.5063 27.9283C29.1969 28.2533 29.5031 28.6846 29.975 29.1096C30.1531 29.2721 30.3906 29.4408 30.5375 29.6158L30.7375 29.8189C31.0375 30.2158 31.9906 31.4221 32.5406 31.8408C32.5406 31.8564 32.5469 31.8689 32.5469 31.8846C32.8219 32.0689 33.775 32.1564 34.7406 32.1564C35.75 32.1564 36.775 32.0627 37.0656 31.8814C37.0656 31.8627 37.0594 31.8439 37.0594 31.8252C37.6156 31.3939 38.5344 30.2127 38.8281 29.8189L38.9906 29.6158C39.1375 29.4408 39.3 29.3127 39.4781 29.1502C39.9563 28.7221 40.5125 28.3283 41.1375 28.0564H41.1313C40.6688 28.0564 40.2125 28.1221 39.7625 28.2096C39.5437 28.2533 39.3406 28.2814 39.125 28.3346C40.7812 25.2689 44.1375 23.0377 46.5188 21.7783C44.3063 22.1283 42.2125 22.7689 40.3469 23.6658C40.0438 23.8221 39.7656 23.9689 39.4531 24.1377L39.4344 24.1471C40.7063 21.3252 42.6125 18.6627 45.0969 16.2627Z"
                                      fill="#424242"/>
                            </g>
                            <defs>
                                <radialGradient id="paint0_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(31.1341 37.3846) scale(13.6059 13.1352)">
                                    <stop offset="0.0079526" stop-color="#BD9563"/>
                                    <stop offset="0.3192" stop-color="#AA8252"/>
                                    <stop offset="0.9492" stop-color="#795028"/>
                                    <stop offset="1" stop-color="#754C24"/>
                                </radialGradient>
                                <radialGradient id="paint1_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.3723 38.6423) scale(3.81437 3.6824)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint2_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.6809 45.0138) scale(2.89703 2.79679)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2145" stop-color="#FFCC3A"/>
                                    <stop offset="0.4463" stop-color="#FEBF30"/>
                                    <stop offset="0.6862" stop-color="#FDA91F"/>
                                    <stop offset="0.9303" stop-color="#FB8B08"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint3_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(31.3426 35.2908) scale(4.51938 4.363)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint4_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(27.6188 37.9718) scale(3.27344 3.16018)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint5_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(30.7743 41.7497) scale(3.97219 3.83475)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint6_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(30.6483 47.1097) scale(2.61291 2.5225)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.3139" stop-color="#FFCF3C"/>
                                    <stop offset="0.5152" stop-color="#FFCC3A"/>
                                    <stop offset="0.6571" stop-color="#FEC333"/>
                                    <stop offset="0.7807" stop-color="#FDB327"/>
                                    <stop offset="0.8932" stop-color="#FC9E16"/>
                                    <stop offset="0.9984" stop-color="#FA8100"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint7_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.6707 49.8947) scale(2.66781 2.57551)">
                                    <stop offset="0.0079681" stop-color="#FFFDE7"/>
                                    <stop offset="1" stop-color="#FFC400"/>
                                </radialGradient>
                                <radialGradient id="paint8_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(38.5202 47.4263) scale(2.73137 2.63687)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2461" stop-color="#FFCD39"/>
                                    <stop offset="0.5121" stop-color="#FFC52C"/>
                                    <stop offset="0.7865" stop-color="#FFB816"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint9_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(38.2559 41.9956) scale(2.90525 2.80473)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2651" stop-color="#FFCD3B"/>
                                    <stop offset="0.4769" stop-color="#FEC333"/>
                                    <stop offset="0.6701" stop-color="#FDB226"/>
                                    <stop offset="0.8514" stop-color="#FC9A14"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint10_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(41.0169 38.5347) scale(2.65453 2.56268)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2405" stop-color="#FFCB34"/>
                                    <stop offset="0.6254" stop-color="#FFBD1D"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint11_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(37.6462 35.6349) scale(2.76719 2.67144)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint12_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(34.6703 34.0666) scale(1.43 1.38052)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.1944" stop-color="#FFC937"/>
                                    <stop offset="0.4806" stop-color="#FDB528"/>
                                    <stop offset="0.8217" stop-color="#FB950F"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint13_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(29.6725 32.9328) scale(1.76181 1.70085)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2063" stop-color="#FEC635"/>
                                    <stop offset="0.5549" stop-color="#FDAC21"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint14_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(26.9741 35.0683) scale(1.83 1.76668)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2121" stop-color="#FFCB3A"/>
                                    <stop offset="0.4458" stop-color="#FEBE2F"/>
                                    <stop offset="0.6897" stop-color="#FCA81E"/>
                                    <stop offset="0.9392" stop-color="#FB8A07"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint15_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(25.9491 40.4408) scale(1.79141 1.72942)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint16_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(27.609 44.299) scale(2.48353 2.3976)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.245" stop-color="#FFCC3A"/>
                                    <stop offset="0.4623" stop-color="#FEC232"/>
                                    <stop offset="0.6691" stop-color="#FDB024"/>
                                    <stop offset="0.8682" stop-color="#FB9610"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint17_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(25.8528 46.2033) scale(0.699969 0.675749)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint18_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(27.9842 48.8113) scale(1.82956 1.76626)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.2887" stop-color="#FFCD3B"/>
                                    <stop offset="0.4952" stop-color="#FEC434"/>
                                    <stop offset="0.6761" stop-color="#FDB427"/>
                                    <stop offset="0.8412" stop-color="#FC9E17"/>
                                    <stop offset="0.996" stop-color="#FA8201"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint19_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(31.0732 51.4333) scale(2.15253 2.07805)">
                                    <stop offset="0.0079681" stop-color="#FFFDE7"/>
                                    <stop offset="1" stop-color="#FFC400"/>
                                </radialGradient>
                                <radialGradient id="paint20_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(38.3087 51.4333) scale(2.16228 2.08747)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2461" stop-color="#FFCD39"/>
                                    <stop offset="0.5121" stop-color="#FFC52C"/>
                                    <stop offset="0.7865" stop-color="#FFB816"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint21_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(41.3851 48.8232) scale(1.83597 1.77245)">
                                    <stop offset="1" stop-color="#FFD03D"/>
                                    <stop offset="0.2461" stop-color="#FFCD39"/>
                                    <stop offset="0.5121" stop-color="#FFC52C"/>
                                    <stop offset="0.7865" stop-color="#FFB816"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint22_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(43.5337 46.1762) scale(0.73 0.704742)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint23_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(41.7554 44.3014) scale(2.48875 2.40264)">
                                    <stop offset="1" stop-color="white"/>
                                    <stop offset="0.0862" stop-color="#FFFCF7"/>
                                    <stop offset="0.2177" stop-color="#FFF5E2"/>
                                    <stop offset="0.3781" stop-color="#FFEABF"/>
                                    <stop offset="0.5613" stop-color="#FFDA8F"/>
                                    <stop offset="0.7637" stop-color="#FFC652"/>
                                    <stop offset="0.9793" stop-color="#FFAD07"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint24_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(43.4154 40.4484) scale(1.80006 1.73778)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <radialGradient id="paint25_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(42.3922 35.0684) scale(1.84888 1.7849)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="1" stop-color="#FA8100"/>
                                </radialGradient>
                                <radialGradient id="paint26_radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(39.6714 32.9377) scale(1.75228 1.69165)">
                                    <stop offset="1.5563e-05" stop-color="#FFD03D"/>
                                    <stop offset="0.0581" stop-color="#FFCD38"/>
                                    <stop offset="0.442" stop-color="#FFBA19"/>
                                    <stop offset="0.7695" stop-color="#FFAF07"/>
                                    <stop offset="1" stop-color="#FFAB00"/>
                                </radialGradient>
                                <linearGradient id="paint27_linear2" x1="34.8552" y1="16.8283" x2="34.8552" y2="22.9973"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.00729" stop-color="#AED581"/>
                                    <stop offset="0.3315" stop-color="#8EBD60"/>
                                    <stop offset="0.6783" stop-color="#73A743"/>
                                    <stop offset="0.8765" stop-color="#689F38"/>
                                </linearGradient>
                                <linearGradient id="paint28_linear2" x1="32.3113" y1="22.5519" x2="45.1331" y2="22.5519"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.00729" stop-color="#AED581"/>
                                    <stop offset="0.3315" stop-color="#8EBD60"/>
                                    <stop offset="0.6783" stop-color="#73A743"/>
                                    <stop offset="0.8765" stop-color="#689F38"/>
                                </linearGradient>
                                <linearGradient id="paint29_linear2" x1="25.9413" y1="15.531" x2="34.4444" y2="26.1597"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.1355" stop-color="#388E3C"/>
                                    <stop offset="0.27" stop-color="#439542"/>
                                    <stop offset="0.5064" stop-color="#60A654"/>
                                    <stop offset="0.8145" stop-color="#90C36F"/>
                                    <stop offset="0.9927" stop-color="#AED581"/>
                                </linearGradient>
                                <linearGradient id="paint30_linear2" x1="36.2363" y1="29.6702" x2="44.5144" y2="20.6258"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.1355" stop-color="#388E3C"/>
                                    <stop offset="0.27" stop-color="#439542"/>
                                    <stop offset="0.5064" stop-color="#60A654"/>
                                    <stop offset="0.8145" stop-color="#90C36F"/>
                                    <stop offset="0.9927" stop-color="#AED581"/>
                                </linearGradient>
                                <linearGradient id="paint31_linear2" x1="35.9151" y1="31.4923" x2="40.2863" y2="27.0957"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.1355" stop-color="#388E3C"/>
                                    <stop offset="0.27" stop-color="#439542"/>
                                    <stop offset="0.5064" stop-color="#60A654"/>
                                    <stop offset="0.8145" stop-color="#90C36F"/>
                                    <stop offset="0.9927" stop-color="#AED581"/>
                                </linearGradient>
                                <linearGradient id="paint32_linear2" x1="25.4032" y1="21.0928" x2="35.9345" y2="32.3947"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.00729" stop-color="#AED581"/>
                                    <stop offset="0.3315" stop-color="#8EBD60"/>
                                    <stop offset="0.6783" stop-color="#73A743"/>
                                    <stop offset="0.8765" stop-color="#689F38"/>
                                </linearGradient>
                            </defs>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    MEME
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
                                    {(stakedAmount && total) && weiDiv(stakedAmount, total)} %
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
                            symbol={'MEME'}
                            tokenName={'Meme Token'}
                            icon={<PineappleLightIcon width={43} height={43}/>}
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
                            tokenName={'Meme Token'}
                            icon={<PineappleRedIcon width={43} height={43}/>}
                            symbol={'MEME'}
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
                            stakedTime={stakedTime}
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
                            symbol={'MEME'}
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
                            symbol={'MEME'}
                            onOk={() => {
                                setUnStaked(false)
                            }}/>
                    </div>
                </div>
            )}


        </article>
    )
}