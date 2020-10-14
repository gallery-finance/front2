import React, {useContext} from 'react'
import {WalletConnect} from "../components/account/WalletConnect";
import {mainContext} from "../reducer";
export const InitPage = () => {

    const {state} = useContext(mainContext);
    const {showConnectModal} = state
    return (
        <>
            {showConnectModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <WalletConnect/>
                    </div>
                </div>
            )}
            </>

    )
}