import BigNumber from 'bignumber.js'
import Web3 from 'web3'

const {fromWei} = Web3.utils

export const formatAddress = (address)=>{
    return  address.slice(0, 6) + '...' + address.slice(-3)
}

export const formatAmount = (amount)=>{
    console.log('formatAmount',amount)
    return new BigNumber(new BigNumber(Web3.utils.fromWei(amount)).toFixed(6)).toNumber()
}
