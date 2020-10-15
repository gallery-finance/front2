import React, {useContext, useEffect, useState} from 'react';
import {useWeb3React} from "@web3-react/core";
import {mainContext} from '../../reducer'
import {InjectedConnector} from "@web3-react/injected-connector";
import {GALLERY_SELECT_WEB3_CONTEXT, HANDLE_SHOW_CONNECT_MODAL, HANDLE_WEB3_CONTEXT} from "../../const";
import {formatAddress} from "../../utils/format";
import MetaMask from '../../assets/img/modal/MetaMask.png'
import walletConnectIcon from '../../assets/img/modal/walletConnectIcon.svg'
import ledger_icon from '../../assets/img/modal/Ledger.png'
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {LedgerConnector} from "@web3-react/ledger-connector";

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: "https://eth-mainnet.alchemyapi.io/v2/k2--UT_xVVXMOvAyoxJYqtKhlmyBbqnX",
    4: "https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884"
};

const walletconnect = new WalletConnectConnector({
    rpc: {1: RPC_URLS[1]},
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
});

const ledger = new LedgerConnector({
    chainId: 1,
    url: RPC_URLS[1],
    pollingInterval: POLLING_INTERVAL
});

const wallets = {
    MetaMask: injected,
    WalletConnect: walletconnect,
    Ledger: ledger,
    //TrustWallet: injected,
    //Squarelink: squarelink,
    //Torus: torus,
    //Aut
}

export const WalletConnect = () => {

    const {dispatch, state} = useContext(mainContext);
    const [connectedName, setConnectedName] = useState()

    const context = useWeb3React();

    const [activatingConnector, setActivatingConnector] = useState();
    const [currentConnector, setCurrentConnector] = useState();

    const {
        connector,
        library,
        account,
        activate,
        deactivate,
        active,
        error
    } = context;

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector]);

    useEffect(() => {
        const localContent = window && window.localStorage.getItem(GALLERY_SELECT_WEB3_CONTEXT)
        console.log('wallet content', localContent)
        if (localContent) {
            setConnectedName(localContent)
        }
    }, [])


    useEffect(() => {
        console.log(account, account, context, library)
        if (account && active && library) {
            console.log('tag---->')
            //dispatch({type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: false});
        }
    }, [account]);

    function onConnect(currentConnector, name) {
        console.log('onConnect:')
        setActivatingConnector(currentConnector);
        setConnectedName(name)
        window && window.localStorage.setItem(GALLERY_SELECT_WEB3_CONTEXT, name)
        activate(wallets[name]);
    }

    return (
            <div className="modal">

                <div className="modal__box">

                    <div className="modal__item modal__item--recieve">

                        <form className="form-recieve" action="/" novalidate="novalidate">

                            <h3 className="form-recieve__title">
                                You will recieve
                            </h3>

                            <label className="form-recieve__input" click="selectWallet('metamask', $event)">

                                <input
                                    type="radio"
                                    name="modal-form-recieve"
                                    className="visuallyhidden"
                                    value="MetaMask"
                                    value="WalletConnect" checked={connectedName === 'MetaMask'}/>

                                <span className="form-recieve__image">
                                <img src={MetaMask}
                                     srcSet="../../assets/img/modal/MetaMask@2x.png 2x" alt=""/>
                            </span>

                                {connectedName === 'MetaMask' ? (
                                    <p className="form-recieve__label">
                                        {account && formatAddress(account)}
                                    </p>
                                ) : (
                                    <span className="form-recieve__label" onClick={() => {
                                        onConnect(currentConnector, 'MetaMask')
                                    }}>MetaMask</span>
                                )}


                            </label>

                            <hr />

                            <label className="form-recieve__input" onClick={()=>{
                                onConnect(currentConnector, 'WalletConnect')
                            }}>

                                <input type="radio" name="modal-form-recieve" className="visuallyhidden"
                                       value="WalletConnect" checked={connectedName === 'WalletConnect'}/>

                                <span className="form-recieve__image">

                                    <img src={walletConnectIcon} alt=""/>

                                </span>

                                {connectedName === 'WalletConnect' ? (
                                    <p className="form-recieve__label">
                                        {account && formatAddress(account)}
                                    </p>
                                ) : (
                                    <span className="form-recieve__label" onClick={() => {
                                        console.log('connect to wallet')
                                        onConnect(currentConnector, 'WalletConnect')
                                    }}>WalletConnect</span>
                                )}

                            </label>

                            <hr />

                            <label className="form-recieve__input" onClick={()=>{
                                onConnect(currentConnector, 'Ledger')
                            }}>

                                <input type="radio" name="modal-form-recieve" className="visuallyhidden" value="Ledger"
                                       checked={connectedName === 'Ledger'}/>

                                <span className="form-recieve__image">
                                        <img src={ledger_icon} alt=""/>
                                    </span>

                                {connectedName === 'Ledger' ? (
                                    <p className="form-recieve__label">
                                        {account && formatAddress(account)}
                                    </p>
                                ) : (
                                    <span className="form-recieve__label" onClick={() => {
                                        onConnect(currentConnector, 'Ledger')
                                    }}>Ledger</span>
                                )}

                            </label>

                        </form>

                    </div>

                    <button type="button" className="modal__close modal__close-btn button" aria-label="Close modal"
                            onClick={() => {
                                dispatch({type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: false});
                            }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z"/>
                        </svg>
                    </button>

                </div>

        </div>
    )
}