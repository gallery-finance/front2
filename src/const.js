import React from 'react'
export const HANDLE_WEB3_CONTEXT = "HANDLE_WEB3_CONTEXT";

export const HANDLE_MY_NFTS_MODAL = "HANDLE_MY_NFTS_MODAL";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const HANDLE_SHOW_CONNECT_MODAL = "HANDLE_SHOW_CONNECT_MODAL";
export const HANDLE_SHOW_STAKE_MODAL = "HANDLE_SHOW_STAKE_MODAL";
export const HANDLE_SHOW_UNSTAKE_MODAL = "HANDLE_SHOW_UNSTAKE_MODAL";
export const HANDLE_SHOW_REWARD_MODAL = "HANDLE_SHOW_REWARD_MODAL";
export const HANDLE_SHOW_STAKED_TOKENS_MODAL = "HANDLE_SHOW_STAKED_TOKENS_MODAL";
export const HANDLE_SHOW_UNSTAKED_TOKENS_MODAL = "HANDLE_SHOW_UNSTAKED_TOKENS_MODAL";
export const HANDLE_SHOW_FAILED_TRANSACTION_MODAL = "HANDLE_SHOW_FAILED_TRANSACTION_MODAL";
export const HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL = "HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL";

export const REQUESTING_DATA = "requesting data……"

export const GALLERY_SELECT_WEB3_CONTEXT = "GALLERY_SELECT_WEB3_CONTEXT"

export const waitingForInit = {show: false, title: 'Waiting' ,content: ''}


export const waitingForApprove = {show: true, title: 'Waiting for Approve' ,content: 'Approving spending limits on your wallet'}

export const waitingForConfirm = {show: true, title: 'Waiting For Confirmation' ,content: 'Confirm this transaction in your wallet'}

export const waitingPending = {show: true, title: 'Transction submitted' ,content: 'View on Etherscan'}

export const glf_icon = (
    <svg className="statistics__logo" width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="34.5" r="34.5" fill="#1D1D1D"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M52.5 25.33V24h-4.18c-1.87 0-3.6.92-4.65 2.46l-4.96 7.37h-9.55v1.34h8.66l-4.47 6.63a4.24 4.24 0 01-3.52 1.87H28.1a9.22 9.22 0 01-9.25-9.17 9.22 9.22 0 019.25-9.17h10.91V24h-10.9c-5.85 0-10.61 4.71-10.61 10.5S22.26 45 28.1 45h1.73c1.87 0 3.6-.92 4.64-2.46l4.96-7.37h9.02v-1.34h-8.12l4.46-6.63a4.24 4.24 0 013.53-1.87h4.18z"
              fill="#fff" stroke="#fff"/>
    </svg>
)

export const bot_stake_icon = (
    <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.1" cx="34.5" cy="34.5" r="34.5" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M24.719 31.1865C32.079 30.3119 39.1692 28.3776 45.7916 25.4362C46.1398 25.282 46.3978 25.0118 46.5186 24.6769C46.6338 24.3589 46.6097 24.0188 46.4519 23.7204C46.2015 23.2471 45.6802 22.9658 45.1241 23.0033C44.956 23.0147 44.7929 23.0547 44.6386 23.1225C38.2399 25.9581 31.3866 27.8161 24.2704 28.6464C23.8647 28.694 23.4978 28.8888 23.263 29.1813C23.0563 29.4383 22.9668 29.7523 23.0111 30.0657C23.1095 30.7677 23.8882 31.287 24.719 31.1865ZM40.1655 31.6087C41.4513 31.1601 42.3154 30.7786 43.403 30.2982C43.6816 30.1752 43.975 30.0457 44.2938 29.9069C42.1302 29.521 39.9856 29.2654 37.7926 29.0396C34.9956 29.9031 33.1969 30.4051 30.2866 30.9349C33.7504 30.9615 36.7469 31.1744 40.1655 31.6087ZM40.1655 38.6997C41.4513 38.251 42.3154 37.8694 43.403 37.3892C43.6816 37.2662 43.975 37.1366 44.2938 36.9978C42.1302 36.6119 39.9856 36.3565 37.7926 36.1305C34.9956 36.9941 33.1969 37.4959 30.2866 38.0258C33.7504 38.0524 36.7469 38.2654 40.1655 38.6997ZM38.1085 43.4386H45.6684C46.4022 43.4386 46.9997 44.0134 47 44.7191C47 45.4262 46.4022 46 45.6684 46H27.254C31.3534 45.4782 34.1968 44.6224 38.1085 43.4386ZM41.3173 41.607C41.5982 41.5045 41.8783 41.4001 42.1581 41.2941C43.3834 40.8283 44.5951 40.3304 45.7916 39.7994C46.1398 39.6441 46.3978 39.3751 46.5186 39.0394C46.6338 38.7217 46.6097 38.382 46.4522 38.0833C46.2015 37.6097 45.6804 37.3283 45.1241 37.3658C44.956 37.3773 44.7929 37.4171 44.6389 37.4859C39.9589 39.5595 35.0356 41.1088 29.9445 42.1184C29.1988 42.2659 28.4497 42.4021 27.6973 42.5259C26.6322 42.7023 25.5605 42.8544 24.4829 42.9834L24.4275 42.9903C24.3753 42.997 24.3231 43.0033 24.2705 43.0094C24.1805 43.0201 24.0935 43.0388 24.0077 43.0633C23.7092 43.1493 23.4455 43.3167 23.2631 43.5441C23.0565 43.801 22.9669 44.1153 23.0112 44.4291C23.0868 44.9665 23.5604 45.3956 24.1517 45.5229C24.3072 45.5561 24.4709 45.5676 24.6382 45.5552L24.6509 45.5547L24.6611 45.5541C24.6803 45.5529 24.6996 45.5518 24.719 45.5492C24.8902 45.529 25.061 45.5079 25.232 45.4857C30.4611 44.8285 35.5516 43.6345 40.4312 41.923C40.7269 41.82 41.0228 41.7149 41.3173 41.607ZM45.7916 32.6173C39.1692 35.5585 32.079 37.4936 24.719 38.3679C23.8882 38.4677 23.1096 37.949 23.0111 37.2477C22.9668 36.934 23.0563 36.6191 23.263 36.362C23.4978 36.0702 23.8647 35.8754 24.2704 35.828C31.3866 34.9972 38.2399 33.1391 44.6389 30.3042C44.7929 30.236 44.956 30.1954 45.1241 30.1841C45.6802 30.1465 46.2015 30.4281 46.4519 30.9011C46.6097 31.1998 46.6338 31.5397 46.5186 31.8585C46.3978 32.1931 46.1398 32.4627 45.7916 32.6173Z"
              fill="#1D1D1D"/>
    </svg>
)


export const bot_unstake_icon = (
    <svg className="statistics__logo" width="69" height="69" viewBox="0 0 69 69" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <circle cx="34.5" cy="34.5" r="34.5" fill="#FA6A6A"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M24.719 31.1865C32.079 30.3119 39.1692 28.3776 45.7916 25.4362C46.1398 25.282 46.3978 25.0118 46.5186 24.6769C46.6338 24.3589 46.6097 24.0188 46.4519 23.7204C46.2015 23.2471 45.6802 22.9658 45.1241 23.0033C44.956 23.0147 44.7929 23.0547 44.6386 23.1225C38.2399 25.9581 31.3866 27.8161 24.2704 28.6464C23.8647 28.694 23.4978 28.8888 23.263 29.1813C23.0563 29.4383 22.9668 29.7523 23.0111 30.0657C23.1095 30.7677 23.8882 31.287 24.719 31.1865ZM40.1655 31.6087C41.4513 31.1601 42.3154 30.7786 43.403 30.2982C43.6816 30.1752 43.975 30.0457 44.2938 29.9069C42.1302 29.521 39.9856 29.2654 37.7926 29.0396C34.9956 29.9031 33.1969 30.4051 30.2866 30.9349C33.7504 30.9615 36.7469 31.1744 40.1655 31.6087ZM40.1655 38.6997C41.4513 38.251 42.3154 37.8694 43.403 37.3892C43.6816 37.2662 43.975 37.1366 44.2938 36.9978C42.1302 36.6119 39.9856 36.3565 37.7926 36.1305C34.9956 36.9941 33.1969 37.4959 30.2866 38.0258C33.7504 38.0524 36.7469 38.2654 40.1655 38.6997ZM38.1085 43.4386H45.6684C46.4022 43.4386 46.9997 44.0134 47 44.7191C47 45.4262 46.4022 46 45.6684 46H27.254C31.3534 45.4782 34.1968 44.6224 38.1085 43.4386ZM41.3173 41.607C41.5982 41.5045 41.8783 41.4001 42.1581 41.2941C43.3834 40.8283 44.5951 40.3304 45.7916 39.7994C46.1398 39.6441 46.3978 39.3751 46.5186 39.0394C46.6338 38.7217 46.6097 38.382 46.4522 38.0833C46.2015 37.6097 45.6804 37.3283 45.1241 37.3658C44.956 37.3773 44.7929 37.4171 44.6389 37.4859C39.9589 39.5595 35.0356 41.1088 29.9445 42.1184C29.1988 42.2659 28.4497 42.4021 27.6973 42.5259C26.6322 42.7023 25.5605 42.8544 24.4829 42.9834L24.4275 42.9903C24.3753 42.997 24.3231 43.0033 24.2705 43.0094C24.1805 43.0201 24.0935 43.0388 24.0077 43.0633C23.7092 43.1493 23.4455 43.3167 23.2631 43.5441C23.0565 43.801 22.9669 44.1153 23.0112 44.4291C23.0868 44.9665 23.5604 45.3956 24.1517 45.5229C24.3072 45.5561 24.4709 45.5676 24.6382 45.5552L24.6509 45.5547L24.6611 45.5541C24.6803 45.5529 24.6996 45.5518 24.719 45.5492C24.8902 45.529 25.061 45.5079 25.232 45.4857C30.4611 44.8285 35.5516 43.6345 40.4312 41.923C40.7269 41.82 41.0228 41.7149 41.3173 41.607ZM45.7916 32.6173C39.1692 35.5585 32.079 37.4936 24.719 38.3679C23.8882 38.4677 23.1096 37.949 23.0111 37.2477C22.9668 36.934 23.0563 36.6191 23.263 36.362C23.4978 36.0702 23.8647 35.8754 24.2704 35.828C31.3866 34.9972 38.2399 33.1391 44.6389 30.3042C44.7929 30.236 44.956 30.1954 45.1241 30.1841C45.6802 30.1465 46.2015 30.4281 46.4519 30.9011C46.6097 31.1998 46.6338 31.5397 46.5186 31.8585C46.3978 32.1931 46.1398 32.4627 45.7916 32.6173Z"
              fill="#1D1D1D"/>
    </svg>
)
