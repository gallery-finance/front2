import React, {useReducer} from "react";
import {
  HANDLE_SHOW_CONNECT_MODAL,
  HANDLE_MY_NFTS_MODAL,
  HANDLE_WEB3_CONTEXT,
  HANDLE_SHOW_STAKE_MODAL,
  HANDLE_SHOW_UNSTAKE_MODAL,
  HANDLE_SHOW_REWARD_MODAL,
  HANDLE_SHOW_STAKED_TOKENS_MODAL,
  HANDLE_SHOW_UNSTAKED_TOKENS_MODAL,
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL
} from "./const";

const mainContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_SHOW_CONNECT_MODAL:
      return {...state, showConnectModal: action.showConnectModal}
    case HANDLE_SHOW_STAKE_MODAL:
      return { ...state, showStakeModal: action.showStakeModal };
    case HANDLE_SHOW_UNSTAKE_MODAL:
      return { ...state, showUnstakeModal: action.showUnstakeModal };
    case HANDLE_SHOW_REWARD_MODAL:
      return { ...state, showRewardModal: action.showRewardModal };
    case HANDLE_SHOW_STAKED_TOKENS_MODAL:
      return { ...state, showStakedTokensModal: action.showStakedTokensModal };
    case HANDLE_SHOW_UNSTAKED_TOKENS_MODAL:
      return { ...state, showUnstakedTokensModal: action.showUnstakedTokensModal };
    case HANDLE_SHOW_FAILED_TRANSACTION_MODAL:
      return { ...state, showFailedTransactionModal: action.showFailedTransactionModal };
    case HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL:
      return { ...state, showWaitingWalletConfirmModal: action.showWaitingWalletConfirmModal };
    default:

      return state
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, {
    showConnectModal: false,
    showStakeModal: false,
    showUnstakeModal: false,
    showRewardModal: false,
    showStakedTokensModal: false,
    showUnstakedTokensModal: false,
    showFailedTransactionModal: false,
    showWaitingWalletConfirmModal: {show:false, title: "", content: ""}
  });
  return (
      <mainContext.Provider value={{state, dispatch}}>
        {props.children}
      </mainContext.Provider>
  );
};

export {reducer, mainContext, ContextProvider};
