import React, {useContext, useEffect, useState} from 'react'
import {BackButton} from "../../components/BackButton";
import {mainContext} from "../../reducer";
import {useStaking} from "../../components/pool/Hooks";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getETHAddress, getETHStakingAddress} from "../../web3/address";
import StakingRewardsV2 from "../../web3/abi/StakingRewardsV2.json";
import {
    HANDLE_SHOW_CONNECT_MODAL,
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL, REQUESTING_DATA,
    waitingForApprove,
    waitingForConfirm, waitingForInit,
    waitingPending
} from "../../const";
import {
    ClaimRewardModal,
    FailedTransactionModal,
    StakedTokensModal,
    StakeModal, UnstakedTokensModal,
    UnstakeModal
} from "../../components/Modals";
import {UniswapBlackIcon, UniswapLightIcon} from "../../icons";
import {ClaimedTokensModal} from "../../components/Modals/ClaimedTokensModal";
import Web3 from "web3";
import {formatAmount} from "../../utils/format";
import {ChainId, Token, Pair, TokenAmount} from "@uniswap/sdk";

const {toWei, fromWei} = Web3.utils


export const StakingETH = () => {

    const {dispatch, state} = useContext(mainContext);
    const {showFailedTransactionModal} = state
    const {balance, rewards, stakedAmount, stakedTime, total} = useStaking('ETH')
    const [staking, setStaking] = useState(false)
    const [unStaking, setUnStaking] = useState(false)
    const [claiming, setClaiming] = useState(false)
    const [staked, setStaked] = useState(false)
    const [unStaked, setUnStaked] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const [txHash, setTxHash] = useState('')

    const [amount, setAmount] = useState()

    const {account, active, library, chainId} = useActiveWeb3React()


    useEffect(()=>{

        async function getPrice() {

            const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
            const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')

            const pair = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NOT, '1000000000000000000'))

            console.log('pair',pair)
        }

        getPrice()

    },[])


    const onLaunch = async () => {
        console.log('on stake launch')
        if (!amount) {
            return
        }

        const tokenContract = getContract(library, ERC20.abi, getETHAddress(chainId))
        const contract = getContract(library, StakingRewardsV2.abi, getETHStakingAddress(chainId))
        const weiAmount = toWei(amount, 'ether');

        console.log('starting StakingBOT ETH', account, weiAmount)
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: waitingForConfirm
        });
        try {
            const result = await tokenContract.methods.approve(
                getETHStakingAddress(chainId),
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

        const contract = getContract(library, StakingRewardsV2.abi, getETHStakingAddress(chainId))
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
        const contract = getContract(library, StakingRewardsV2.abi, getETHStakingAddress(chainId))
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


    return(
        <article className="center">

            <BackButton />

            <header className="head-page">

                <h1 className="head-page__title h1">
                    GLF / ETH Liquidity Pool
                </h1>

                <p className="head-page__intro">
                    Buy GLF tokens now on Uniswap
                </p>

                <div className="head-page__btn">

                    <a target="_blank" href=" https://etherscan.io/token/0x710980bb4a0866e9ec162ccd84439dda5a04b99c" className="btn">
                        Buy GLF
                    </a>

                </div>

            </header>

            <div className="statistics">
                <div className="statistics__list">

                    <div className="statistics__item column">
                        <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="34.5" cy="34.5" r="34.5" fill="url(#paint0_linear)"/>
                            <path
                                d="M33.0965 32.4538C33.7788 33.6605 32.2527 34.0346 31.5366 34.1034C30.4514 34.2094 30.2267 33.5811 30.4387 32.7918C30.5083 32.5092 30.6627 32.2549 30.8809 32.0636C31.0993 31.8721 31.3709 31.7527 31.659 31.7217C31.9428 31.6956 32.2283 31.7504 32.4826 31.8798C32.7368 32.0094 32.9497 32.2083 33.0965 32.4538Z"
                                fill="white"/>
                            <path
                                d="M37.3555 30.2212C36.5624 36.3152 47.2545 35.0471 47.051 39.8973C48.1057 38.52 48.5592 34.778 45.4543 32.8519C42.6879 31.1345 39.0831 32.0742 37.3555 30.2212Z"
                                fill="white"/>
                            <path
                                d="M43.5146 27.923C43.445 27.8583 43.3732 27.7948 43.3037 27.7312C43.3744 27.7958 43.445 27.8636 43.5146 27.923Z"
                                fill="white"/>
                            <path
                                d="M45.999 32.3653L45.9927 32.3557C45.8962 32.1756 45.7862 32.0031 45.6637 31.8398C45.3032 31.3492 44.7862 30.9976 44.1988 30.8438C43.8077 30.7425 43.4079 30.6793 43.0048 30.6553C42.5967 30.6256 42.1801 30.6086 41.7593 30.5864C40.9156 30.5397 40.0518 30.4529 39.2081 30.2113C38.9971 30.1509 38.7863 30.0852 38.5827 30.0058C38.4773 29.9677 38.3792 29.9264 38.2748 29.8818C38.1704 29.8374 38.0638 29.7864 37.9583 29.7324C37.5616 29.5142 37.1941 29.2461 36.8647 28.9347C36.215 28.3276 35.7046 27.6389 35.1931 26.9715C34.7109 26.3014 34.1933 25.6578 33.6427 25.0432C33.0994 24.4412 32.4573 23.9374 31.7444 23.5536C31.006 23.1801 30.2041 22.95 29.3809 22.8756C30.235 22.7824 31.099 22.8883 31.9057 23.1849C32.7197 23.5024 33.4639 23.9772 34.0962 24.5824C34.5089 24.9713 34.8965 25.3864 35.2563 25.8251C37.9351 25.2954 40.1077 25.7658 41.7772 26.6791L41.8153 26.6981C42.3466 26.9877 42.8446 27.3352 43.3001 27.7343C43.3729 27.7979 43.4447 27.8614 43.5111 27.9261C43.8667 28.2543 44.1977 28.6084 44.5014 28.9855L44.5246 29.0163C45.5108 30.2706 45.998 31.5748 45.999 32.3653Z"
                                fill="white"/>
                            <path d="M45.9979 32.3642L45.9917 32.3516L45.9979 32.3642Z" fill="white"/>
                            <path
                                d="M29.5171 23.6606C30.2005 23.7602 30.8977 24.0336 31.3469 24.5548C31.7962 25.0761 31.9618 25.7542 32.0915 26.3994C32.197 26.8994 32.2803 27.409 32.4765 27.8826C32.5714 28.1136 32.7106 28.3159 32.8266 28.5342C32.9226 28.7153 33.0976 28.8786 33.1651 29.0724C33.1773 29.1003 33.1818 29.1308 33.1782 29.1609C33.1747 29.1911 33.1633 29.2198 33.1451 29.2441C32.9068 29.5089 32.2634 29.2144 32.0209 29.0957C31.6015 28.8869 31.226 28.5992 30.9146 28.2481C29.9411 27.1622 29.438 25.5995 29.4686 24.1766C29.4754 24.0039 29.4916 23.8316 29.5171 23.6606Z"
                                fill="white"/>
                            <path
                                d="M40.9471 35.9065C39.4705 40.0458 46.1677 42.8228 43.6586 47.0309C46.233 45.963 47.4553 42.7369 46.387 40.1772C45.4526 37.9301 42.6894 37.1111 40.9471 35.9065Z"
                                fill="white"/>
                            <path
                                d="M31.625 41.2307C32.0273 40.926 32.4673 40.6749 32.9338 40.4838C33.4058 40.294 33.8955 40.152 34.3955 40.06C35.388 39.8703 36.3699 39.8238 37.1946 39.49C37.6021 39.3301 37.9771 39.0968 38.301 38.8014C38.6145 38.5088 38.8545 38.1456 39.0013 37.7418C39.1516 37.3158 39.2127 36.8631 39.1805 36.4122C39.1433 35.9279 39.0341 35.4519 38.8567 35C39.2244 35.3841 39.4921 35.8533 39.6361 36.3661C39.7801 36.879 39.7961 37.4195 39.6826 37.94C39.5535 38.491 39.275 38.9952 38.8779 39.3967C38.4848 39.7857 38.0107 40.0824 37.49 40.2656C36.9929 40.4406 36.4745 40.5476 35.9491 40.5834C35.4428 40.6258 34.9534 40.6374 34.4726 40.6659C33.5003 40.707 32.5398 40.8974 31.625 41.2307Z"
                                fill="white"/>
                            <path
                                d="M41.5367 48.5957C41.388 48.7144 41.2393 48.8405 41.0758 48.9507C40.9113 49.0596 40.7389 49.1559 40.5601 49.2389C40.1877 49.4214 39.7783 49.5145 39.3641 49.5111C38.2419 49.49 37.4488 48.6509 36.9849 47.7026C36.6684 47.0564 36.4501 46.3581 36.0746 45.7426C35.5378 44.8622 34.6192 44.1535 33.5435 44.2847C33.1047 44.3399 32.6934 44.538 32.4498 44.9205C31.8085 45.9196 32.7293 47.3191 33.9031 47.121C34.0029 47.1057 34.1006 47.0787 34.1942 47.0404C34.2874 47.0006 34.3744 46.9474 34.4526 46.8826C34.6165 46.7454 34.7401 46.566 34.8101 46.3635C34.8872 46.1523 34.9044 45.9237 34.8596 45.7034C34.8115 45.4731 34.6761 45.2706 34.4821 45.1387C34.7077 45.2448 34.8835 45.4347 34.9726 45.6685C35.0648 45.9089 35.0886 46.1706 35.0411 46.4238C34.995 46.6877 34.8792 46.9344 34.7057 47.138C34.6136 47.2426 34.507 47.3336 34.3893 47.4081C34.2726 47.4818 34.1476 47.5412 34.017 47.585C33.7521 47.676 33.4701 47.7053 33.1923 47.6709C32.8021 47.6151 32.4342 47.4548 32.1271 47.2068C31.7643 46.9186 31.4943 46.5415 31.1662 46.2173C30.7903 45.8209 30.3467 45.4955 29.8564 45.2563C29.5183 45.1071 29.1645 44.997 28.8017 44.9279C28.6192 44.8898 28.4347 44.8622 28.2501 44.8389C28.1658 44.8305 27.7523 44.7382 27.6943 44.7922C28.2648 44.2647 28.8867 43.7963 29.5505 43.3937C30.2322 42.9874 30.9641 42.6729 31.7274 42.4583C32.5187 42.2345 33.3465 42.1707 34.1626 42.2708C34.5826 42.3214 34.9941 42.4284 35.3859 42.5886C35.7965 42.7534 36.1755 42.9885 36.5059 43.2836C36.8331 43.5931 37.0974 43.9633 37.2843 44.3738C37.4531 44.758 37.5791 45.1599 37.6597 45.5721C37.9003 46.8042 37.8116 48.7144 39.4179 48.9962C39.5016 49.0125 39.5861 49.0246 39.671 49.0322L39.9336 49.0386C40.1142 49.0257 40.2936 48.9998 40.4704 48.9612C40.8369 48.8747 41.194 48.7522 41.5367 48.5957Z"
                                fill="white"/>
                            <path d="M32.2032 47.253L32.1611 47.22L32.2032 47.253Z" fill="white"/>
                            <path
                                d="M30.7614 29.8628C30.7029 30.0886 30.6007 30.3007 30.4608 30.4868C30.2003 30.8265 29.8555 31.0913 29.461 31.255C29.1062 31.4085 28.7304 31.5078 28.3462 31.5495C28.2629 31.5601 28.1764 31.5664 28.0931 31.5728C27.8498 31.582 27.6159 31.6693 27.4255 31.8219C27.2352 31.9744 27.0984 32.1841 27.0353 32.4204C27.0064 32.5379 26.9849 32.6572 26.971 32.7774C26.933 33.0888 26.9267 33.4131 26.8929 33.805C26.8103 34.4722 26.6182 35.1208 26.3245 35.7248C25.9427 36.5321 25.5145 37.1826 25.6136 38.1129C25.679 38.7168 25.987 39.1214 26.3962 39.5389C27.1344 40.2975 28.7871 40.6365 28.418 42.5054C28.1954 43.621 26.354 44.7918 23.7659 45.2007C24.0232 45.1615 23.4357 44.1666 23.3988 44.1031C23.1215 43.6666 22.8177 43.2555 22.5973 42.782C22.1649 41.8634 21.9645 40.8007 22.1417 39.7942C22.3284 38.7348 23.1088 37.9232 23.7574 37.1138C24.5294 36.1508 25.3394 34.889 25.5187 33.6387C25.5609 33.3358 25.5904 32.9564 25.6579 32.5792C25.7223 32.1614 25.8526 31.7565 26.0439 31.38C26.1745 31.1329 26.3465 30.9104 26.5523 30.7221C26.6595 30.6221 26.7303 30.4887 26.7533 30.3435C26.7762 30.1983 26.75 30.0496 26.6788 29.9211L22.553 22.4667L28.4791 29.813C28.5466 29.8981 28.6319 29.9673 28.729 30.0156C28.826 30.0638 28.9326 30.0902 29.0408 30.0924C29.1491 30.0948 29.2566 30.0732 29.3557 30.0291C29.4547 29.985 29.5429 29.9195 29.614 29.8374C29.689 29.7494 29.7316 29.6381 29.7345 29.5224C29.7373 29.4066 29.7004 29.2933 29.6297 29.2017C29.2427 28.7048 28.8335 28.1984 28.4369 27.7004L26.9457 25.8464L23.9525 22.1446L19.8711 17L24.3364 21.813L27.5225 25.3516L29.1119 27.1251C29.6392 27.7216 30.1666 28.299 30.6939 28.9262L30.7804 29.0322L30.7994 29.1963C30.8251 29.4191 30.8122 29.6446 30.7614 29.8628Z"
                                fill="white"/>
                            <path
                                d="M32.1278 47.2022C31.8415 46.98 31.5867 46.7193 31.3706 46.4277C31.6025 46.7054 31.8556 46.9644 32.1278 47.2022Z"
                                fill="white"/>
                            <defs>
                                <linearGradient id="paint0_linear" x1="-5.5" y1="56" x2="69" y2="18.5"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="1" stop-color="#301E2C"/>
                                    <stop offset="1" stop-color="#B20B5E"/>
                                </linearGradient>
                            </defs>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    {stakedAmount && formatAmount(stakedAmount)}
                                </dt>
                                <dd className="statistics__dl-dd" >
                                    Staked
                                </dd>
                            </div>
                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    Stake GLF / ETH Uniswap LP Tokens
                                </dt>
                                <dd></dd>
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
                            <circle opacity="0.2" cx="34.5" cy="34.5" r="34.5" fill="#FA6A6A"/>
                            <path
                                d="M33.0965 32.4538C33.7788 33.6605 32.2527 34.0346 31.5366 34.1034C30.4514 34.2094 30.2267 33.5811 30.4387 32.7918C30.5083 32.5092 30.6627 32.2549 30.8809 32.0636C31.0993 31.8721 31.3709 31.7527 31.659 31.7217C31.9428 31.6956 32.2283 31.7504 32.4826 31.8798C32.7368 32.0094 32.9497 32.2083 33.0965 32.4538Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M37.3555 30.2212C36.5624 36.3152 47.2545 35.0471 47.051 39.8973C48.1057 38.52 48.5592 34.778 45.4543 32.8519C42.6879 31.1345 39.0831 32.0742 37.3555 30.2212Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M43.5146 27.9232C43.445 27.8586 43.3732 27.795 43.3037 27.7314C43.3744 27.7961 43.445 27.8639 43.5146 27.9232Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M45.999 32.3653L45.9927 32.3557C45.8962 32.1756 45.7862 32.0031 45.6637 31.8398C45.3032 31.3492 44.7862 30.9976 44.1988 30.8438C43.8077 30.7425 43.4079 30.6793 43.0048 30.6553C42.5967 30.6256 42.1801 30.6086 41.7593 30.5864C40.9156 30.5397 40.0518 30.4529 39.2081 30.2113C38.9971 30.1509 38.7863 30.0852 38.5827 30.0058C38.4773 29.9677 38.3792 29.9264 38.2748 29.8818C38.1704 29.8374 38.0638 29.7864 37.9583 29.7324C37.5616 29.5142 37.1941 29.2461 36.8647 28.9347C36.215 28.3276 35.7046 27.6389 35.1931 26.9715C34.7109 26.3014 34.1933 25.6578 33.6427 25.0432C33.0994 24.4412 32.4573 23.9374 31.7444 23.5536C31.006 23.1801 30.2041 22.95 29.3809 22.8756C30.235 22.7824 31.099 22.8883 31.9057 23.1849C32.7197 23.5024 33.4639 23.9772 34.0962 24.5824C34.5089 24.9713 34.8965 25.3864 35.2563 25.8251C37.9351 25.2954 40.1077 25.7658 41.7772 26.6791L41.8153 26.6981C42.3466 26.9877 42.8446 27.3352 43.3001 27.7343C43.3729 27.7979 43.4447 27.8614 43.5111 27.9261C43.8667 28.2543 44.1977 28.6084 44.5014 28.9855L44.5246 29.0163C45.5108 30.2706 45.998 31.5748 45.999 32.3653Z"
                                fill="#1D1D1D"/>
                            <path d="M45.9979 32.3642L45.9917 32.3516L45.9979 32.3642Z" fill="#1D1D1D"/>
                            <path
                                d="M29.5171 23.6606C30.2005 23.7602 30.8977 24.0336 31.3469 24.5548C31.7962 25.0761 31.9618 25.7542 32.0915 26.3994C32.197 26.8994 32.2803 27.409 32.4765 27.8826C32.5714 28.1136 32.7106 28.3159 32.8266 28.5342C32.9226 28.7153 33.0976 28.8786 33.1651 29.0724C33.1773 29.1003 33.1818 29.1308 33.1782 29.1609C33.1747 29.1911 33.1633 29.2198 33.1451 29.2441C32.9068 29.5089 32.2634 29.2144 32.0209 29.0957C31.6015 28.8869 31.226 28.5992 30.9146 28.2481C29.9411 27.1622 29.438 25.5995 29.4686 24.1766C29.4754 24.0039 29.4916 23.8316 29.5171 23.6606Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M40.9471 35.9062C39.4705 40.0456 46.1677 42.8225 43.6586 47.0307C46.233 45.9627 47.4553 42.7367 46.387 40.177C45.4526 37.9299 42.6894 37.1109 40.9471 35.9062Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M31.625 41.2307C32.0273 40.926 32.4673 40.6749 32.9338 40.4838C33.4058 40.294 33.8955 40.152 34.3955 40.06C35.388 39.8703 36.3699 39.8238 37.1946 39.49C37.6021 39.3301 37.9771 39.0968 38.301 38.8014C38.6145 38.5088 38.8545 38.1456 39.0013 37.7418C39.1516 37.3158 39.2127 36.8631 39.1805 36.4122C39.1433 35.9279 39.0341 35.4519 38.8567 35C39.2244 35.3841 39.4921 35.8533 39.6361 36.3661C39.7801 36.879 39.7961 37.4195 39.6826 37.94C39.5535 38.491 39.275 38.9952 38.8779 39.3967C38.4848 39.7857 38.0107 40.0824 37.49 40.2656C36.9929 40.4406 36.4745 40.5476 35.9491 40.5834C35.4428 40.6258 34.9534 40.6374 34.4726 40.6659C33.5003 40.707 32.5398 40.8974 31.625 41.2307Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M41.5367 48.596C41.388 48.7147 41.2393 48.8408 41.0758 48.9509C40.9113 49.0598 40.7389 49.1561 40.5601 49.2391C40.1877 49.4216 39.7783 49.5148 39.3641 49.5114C38.2419 49.4902 37.4488 48.6511 36.9849 47.7028C36.6684 47.0566 36.4501 46.3584 36.0746 45.7429C35.5378 44.8624 34.6192 44.1537 33.5435 44.285C33.1047 44.3401 32.6934 44.5382 32.4498 44.9207C31.8085 45.9198 32.7293 47.3193 33.9031 47.1212C34.0029 47.1059 34.1006 47.0789 34.1942 47.0407C34.2874 47.0008 34.3744 46.9476 34.4526 46.8828C34.6165 46.7457 34.7401 46.5663 34.8101 46.3638C34.8872 46.1526 34.9044 45.924 34.8596 45.7036C34.8115 45.4733 34.6761 45.2708 34.4821 45.139C34.7077 45.2451 34.8835 45.435 34.9726 45.6687C35.0648 45.9091 35.0886 46.1708 35.0411 46.4241C34.995 46.688 34.8792 46.9347 34.7057 47.1382C34.6136 47.2428 34.507 47.3338 34.3893 47.4083C34.2726 47.482 34.1476 47.5414 34.017 47.5853C33.7521 47.6763 33.4701 47.7055 33.1923 47.6711C32.8021 47.6153 32.4342 47.455 32.1271 47.2071C31.7643 46.9188 31.4943 46.5417 31.1662 46.2175C30.7903 45.8212 30.3467 45.4957 29.8564 45.2565C29.5183 45.1074 29.1645 44.9972 28.8017 44.9281C28.6192 44.89 28.4347 44.8624 28.2501 44.8392C28.1658 44.8307 27.7523 44.7385 27.6943 44.7925C28.2648 44.265 28.8867 43.7965 29.5505 43.394C30.2322 42.9876 30.9641 42.6732 31.7274 42.4585C32.5187 42.2348 33.3465 42.171 34.1626 42.271C34.5826 42.3216 34.9941 42.4286 35.3859 42.5888C35.7965 42.7536 36.1755 42.9888 36.5059 43.2838C36.8331 43.5933 37.0974 43.9636 37.2843 44.3741C37.4531 44.7583 37.5791 45.1601 37.6597 45.5723C37.9003 46.8044 37.8116 48.7147 39.4179 48.9965C39.5016 49.0128 39.5861 49.0248 39.671 49.0325L39.9336 49.0389C40.1142 49.026 40.2936 49.0001 40.4704 48.9615C40.8369 48.875 41.194 48.7525 41.5367 48.596Z"
                                fill="#1D1D1D"/>
                            <path d="M32.2032 47.2533L32.1611 47.2202L32.2032 47.2533Z" fill="#1D1D1D"/>
                            <path
                                d="M30.7614 29.8628C30.7029 30.0886 30.6007 30.3007 30.4608 30.4868C30.2003 30.8265 29.8555 31.0913 29.461 31.255C29.1062 31.4085 28.7304 31.5078 28.3462 31.5495C28.2629 31.5601 28.1764 31.5664 28.0931 31.5728C27.8498 31.582 27.6159 31.6693 27.4255 31.8219C27.2352 31.9744 27.0984 32.1841 27.0353 32.4204C27.0064 32.5379 26.9849 32.6572 26.971 32.7774C26.933 33.0888 26.9267 33.4131 26.8929 33.805C26.8103 34.4722 26.6182 35.1208 26.3245 35.7248C25.9427 36.5321 25.5145 37.1826 25.6136 38.1129C25.679 38.7168 25.987 39.1214 26.3962 39.5389C27.1344 40.2975 28.7871 40.6365 28.418 42.5054C28.1954 43.621 26.354 44.7918 23.7659 45.2007C24.0232 45.1615 23.4357 44.1666 23.3988 44.1031C23.1215 43.6666 22.8177 43.2555 22.5973 42.782C22.1649 41.8634 21.9645 40.8007 22.1417 39.7942C22.3284 38.7348 23.1088 37.9232 23.7574 37.1138C24.5294 36.1508 25.3394 34.889 25.5187 33.6387C25.5609 33.3358 25.5904 32.9564 25.6579 32.5792C25.7223 32.1614 25.8526 31.7565 26.0439 31.38C26.1745 31.1329 26.3465 30.9104 26.5523 30.7221C26.6595 30.6221 26.7303 30.4887 26.7533 30.3435C26.7762 30.1983 26.75 30.0496 26.6788 29.9211L22.553 22.4667L28.4791 29.813C28.5466 29.8981 28.6319 29.9673 28.729 30.0156C28.826 30.0638 28.9326 30.0902 29.0408 30.0924C29.1491 30.0948 29.2566 30.0732 29.3557 30.0291C29.4547 29.985 29.5429 29.9195 29.614 29.8374C29.689 29.7494 29.7316 29.6381 29.7345 29.5224C29.7373 29.4066 29.7004 29.2933 29.6297 29.2017C29.2427 28.7048 28.8335 28.1984 28.4369 27.7004L26.9457 25.8464L23.9525 22.1446L19.8711 17L24.3364 21.813L27.5225 25.3516L29.1119 27.1251C29.6392 27.7216 30.1666 28.299 30.6939 28.9262L30.7804 29.0322L30.7994 29.1963C30.8251 29.4191 30.8122 29.6446 30.7614 29.8628Z"
                                fill="#1D1D1D"/>
                            <path
                                d="M32.1278 47.2022C31.8415 46.98 31.5867 46.7193 31.3706 46.4277C31.6025 46.7054 31.8556 46.9644 32.1278 47.2022Z"
                                fill="#1D1D1D"/>
                        </svg>


                        <dl className="statistics__dl">

                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    {stakedAmount && formatAmount(stakedAmount)}
                                </dt>
                                <dd className="statistics__dl-dd">
                                    Staked
                                </dd>
                            </div>
                            <div className="statistics__dl-column">
                                <dt className="statistics__dl-dt">
                                    Unstake GLF / ETH Uniswap LP Tokens
                                </dt>
                                <dd></dd>
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
                            <circle cx="34.5" cy="34.5" r="34.5" fill="#ECEFF0"/>
                            <path d="M34.9972 18L34.7788 18.7596V40.8003L34.9972 41.0234L44.9942 34.9758L34.9972 18Z"
                                  fill="#343434"/>
                            <path d="M34.9971 18L25 34.9758L34.9971 41.0235V30.3255V18Z" fill="#8C8C8C"/>
                            <path
                                d="M34.9971 42.9605L34.874 43.114V50.9654L34.9971 51.3333L45.0001 36.916L34.9971 42.9605Z"
                                fill="#3C3C3B"/>
                            <path d="M34.9971 51.3333V42.9605L25 36.916L34.9971 51.3333Z" fill="#8C8C8C"/>
                            <path d="M34.9966 41.0232L44.9935 34.9757L34.9966 30.3254V41.0232Z" fill="#141414"/>
                            <path d="M25 34.9757L34.9969 41.0232V30.3254L25 34.9757Z" fill="#393939"/>
                        </svg>

                        <dl className="statistics__dl">

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    ETH per GLF
                                </dt>

                                <dd className="statistics__dl-dd">
                                    {REQUESTING_DATA}
                                </dd>

                            </div>

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    GLF per ETH
                                </dt>

                                <dd className="statistics__dl-dd">
                                    {REQUESTING_DATA}
                                </dd>

                            </div>

                            <div className="statistics__dl-row">

                                <dt className="statistics__dl-dt">
                                    Share of Pool
                                </dt>

                                <dd className="statistics__dl-dd">
                                    {REQUESTING_DATA}
                                </dd>

                            </div>

                        </dl>
                        <a target="_blank" href="https://app.uniswap.org/#/add/0x47fd85128312ee72aa0e0382a531a8f848b8b2cb/ETH" className="statistics__btn btn">
                            Add/Remove Liquidity
                        </a>

                    </div>

                </div>

            </div>

            {staking && (
                <div className="modal-show">
                    <div className="wrapper">
                        <StakeModal
                            amount={amount}
                            symbol={'ETH'}
                            tokenName={'GLF-ETH UniSwap LP Token'}
                            icon={<UniswapBlackIcon width={43} height={43}/>}
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
                            tokenName={'GLF-ETH UniSwap LP Token'}
                            icon={<UniswapLightIcon width={43} height={43}/>}
                            symbol={'ETH'}
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
                            symbol={'ETH'}
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
                            symbol={'ETH'}
                            onOk={() => {
                                setUnStaked(false)
                            }}/>
                    </div>
                </div>
            )}

        </article>
    )
}