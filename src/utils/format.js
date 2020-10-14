export const formatAddress = (address)=>{
    return  address.slice(0, 6) + '...' + address.slice(-3)
}

export const formatAmount = (amount)=>{
    return  amount.slice(0, 6) + '...' + amount.slice(-3)
}
