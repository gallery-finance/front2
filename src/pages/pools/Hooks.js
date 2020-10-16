import React, {useState, useEffect} from 'react';
import StakingRewardsV2 from '../../web3/abi/StakingRewardsV2.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {
    getBotStakingAddress, getDEGOStakingAddress, getDONUTStakingAddress,
    getETHStakingAddress, getGLFStakingAddress,
    getMEMOStakingAddress,
    getUSDTStakingAddress
} from "../../web3/address";
import BigNumber from "bignumber.js";
import ERC20 from "../../web3/abi/ERC20.json";
import Web3 from 'web3'

const {fromWei} = Web3.utils

export const useStatistics = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [totalStaked] = useState()
    const [glfBalance, setGLFBalance] = useState()
    const [curPrice, setCurPrice] = useState()
    const [totalSupply, setTotalSupply] = useState()
    const [curSupply, setCurSupply] = useState()
    const [totalBurned, setTotalBurned] = useState()

    const [burnedTotal, setBurnedTotal] = useState()


    async function queryTotalSupply() {
        console.log('queryTotalSupply')
        const botContract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
        const botStaked = await botContract.methods.totalSupply().call()

        const ethContract = getContract(library, StakingRewardsV2.abi, getETHStakingAddress(chainId))
        const ethStaked = await ethContract.methods.totalSupply().call()

        const usdtContract = getContract(library, StakingRewardsV2.abi, getUSDTStakingAddress(chainId))
        const usdtStaked = await usdtContract.methods.totalSupply().call()

        const memeContract = getContract(library, StakingRewardsV2.abi, getMEMOStakingAddress(chainId))
        const memeStaked = await memeContract.methods.totalSupply().call()

        const donutContract = getContract(library, StakingRewardsV2.abi, getDONUTStakingAddress(chainId))
        const donutStaked = await donutContract.methods.totalSupply().call()

        const degoContract = getContract(library, StakingRewardsV2.abi, getDEGOStakingAddress(chainId))
        const degoStaked = await degoContract.methods.totalSupply().call()

        const total = new BigNumber(fromWei(botStaked))
            .plus(new BigNumber(fromWei(ethStaked)))
            .plus(new BigNumber(fromWei(usdtStaked)))
            .plus(new BigNumber(fromWei(memeStaked)))
            .plus(new BigNumber(fromWei(donutStaked)))
            .plus(new BigNumber(fromWei(degoStaked)))
        console.log('total supply----->',total.toString())

        setTotalSupply(total)
    }




    useEffect(()=>{
        if(active){
            queryTotalSupply()

            const glfContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
             glfContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call().then((res)=>{
                 console.log('total burned',res)
                 setBurnedTotal(res)
             })
        }
    },[active])

    return {totalStaked, burnedTotal}
}


export const useBOTInfo = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ total, setTotal] = useState()
    const [time, setTime] = useState()
    const [apy, setApy] = useState()


    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.totalSupply().call().then().then(res =>{
                    console.log('bot totalSupply:',res)
                    setTotal(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }


            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.startAt().call().then().then(res =>{
                    console.log('bot startAt:',res)
                    setTime(res)
                })
            }catch (e) {
                console.log('load startAt error:',e)

            }


            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.startAt().call().then().then(res =>{
                    console.log('bot apy:',res)
                    setApy(res)
                })
            }catch (e) {
                console.log('load apy error:',e)

            }

        }
    },[active])

    return {total, time, apy}
}


