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


export const weiDiv = (value1, value2) => {
    if(value1 == 0 || value2 == 0){
        return  0
    }
    console.log('weiDiv',value1, value2)
    return new BigNumber(new BigNumber(value1).dividedBy(new BigNumber(value2)).toFixed(6)).multipliedBy(100).toString()
};