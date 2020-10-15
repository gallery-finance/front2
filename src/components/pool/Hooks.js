import React, {useState, useEffect} from 'react';
import StakingRewardsV2 from '../../web3/abi/StakingRewardsV2.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getBotStakingAddress} from "../../web3/address";
import {getLeftTime} from '../../utils/time'

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


export const useBOTStaking = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ balance, setBalance] = useState()
    const [ rewards, setRewards] = useState()

    const [ total, setTotal] = useState()


    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.balanceOf(account).call().then().then(res =>{
                    console.log('bot balanceOf:',res)
                    setBalance(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

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
                contract.methods.earned(account).call().then().then(res =>{
                    console.log('bot earned:',res)
                    setRewards(res)
                })
            }catch (e) {
                console.log('load startAt error:',e)

            }

        }
    },[active])



    return {balance, rewards, total}
}

export const useLeftTime = () => {
    const initRenderTime = {
        days: 0,
        hours: 0,
        minutes: 0,
    }

    const [time, setTime] = useState();
    const [leftTime, setLeftTime] = useState(initRenderTime);

    const calcuTime = ()=>{
        console.log('calcuTime', time)
        const formatTime = getLeftTime(time)
        if(!formatTime){
            setLeftTime(initRenderTime)
        }else {
            setLeftTime(formatTime)
        }
    }


    useEffect(()=>{
        calcuTime()
    }, [time])

    return {setTime, leftTime}
}