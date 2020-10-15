import React, {useContext} from 'react'

import {WalletConnect} from "../components/account/WalletConnect";
import {mainContext} from "../reducer";
import {
    StakeModal,
    UnstakeModal,
    ClaimRewardModal,
    StakedTokensModal,
    UnstakedTokensModal,
    FailedTransactionModal,
    WaitingWalletConfirmModal
} from "../components/Modals";
export const InitPage = () => {

    const { state } = useContext(mainContext);

    const {
        showConnectModal,
        showStakeModal,
        showUnstakeModal,
        showRewardModal,
        showStakedTokensModal,
        showUnstakedTokensModal,
        showFailedTransactionModal,
        showWaitingWalletConfirmModal
    } = state;

    return (
        <>
            {showConnectModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <WalletConnect/>
                    </div>
                </div>
            )}


            {showStakeModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <StakeModal />
                    </div>
                </div>
            )}
            {showUnstakeModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <UnstakeModal />
                    </div>
                </div>
            )}
            {showRewardModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ClaimRewardModal />
                    </div>
                </div>
            )}
            {showStakedTokensModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <StakedTokensModal />
                    </div>
                </div>
            )}
            {showUnstakedTokensModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <UnstakedTokensModal />
                    </div>
                </div>
            )}
            {showFailedTransactionModal && (
                <div className="modal-show">
                    <div className="wrapper">
                        <FailedTransactionModal />
                    </div>
                </div>
            )}
            {showWaitingWalletConfirmModal.show && (
                <div className="modal-show">
                    <div className="wrapper">
                        <WaitingWalletConfirmModal />
                    </div>
                </div>
            )}

            </>

    )
}