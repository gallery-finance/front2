import React, {useState, useEffect} from 'react';
import StakingRewardsV2 from '../../web3/abi/StakingRewardsV2.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getBotAddress, getBotStakingAddress} from "../../web3/address";
import {getLeftTime} from '../../utils/time'
import ERC20 from "../../web3/abi/ERC20.json";

export const useBOTInfo = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ total, setTotal] = useState()
    const [time, setTime] = useState()
    const [apy, setApy] = useState()


    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.totalSupply().call().then(res =>{
                    console.log('bot totalSupply:',res)
                    setTotal(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }


            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.startAt().call().then(res =>{
                    console.log('bot startAt:',res)
                    setTime(res - 14*24*60*60*1000)
                })
            }catch (e) {
                console.log('load startAt error:',e)

            }

            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.startAt().call().then(res =>{
                    console.log('bot startAt:',res)
                    setTime(res - 14*24*60*60*1000)
                })
            }catch (e) {
                console.log('load startAt error:',e)

            }


            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.startAt().call().then(res =>{
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
    const [ stakedAmount, setStakedAmount] = useState()
    const [ rewards, setRewards] = useState()
    const [ stakedTime, setStakedTime] = useState()


    const [ total, setTotal] = useState()


    useEffect(()=>{

        try {
            const tokenContract = getContract(library, ERC20.abi, getBotAddress(chainId))
            tokenContract.methods.balanceOf(account).call().then(res =>{
                console.log('bot balanceOf:',res)
                setBalance(res)
            })
        }catch (e) {
            console.log('load events error:',e)
        }


        
        try {
            const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
            contract.events.Staked({}, {fromBlock: 0, toBlock: 'latest'}, (error, event)=>{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.balanceOf(account).call().then(res =>{
                    console.log('bot balanceOf:',res)
                    setStakedAmount(res)
                })
            })
        }catch (e) {
            console.log('load events error:',e)
        }
        
        if(active){
            try{
                const contract = getContract(library, StakingRewardsV2.abi, getBotStakingAddress(chainId))
                contract.methods.balanceOf(account).call().then(res =>{
                    console.log('bot balanceOf:',res)
                    setStakedAmount(res)
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
                contract.methods.lastUpdateAt(account).call().then().then(res =>{
                    console.log('bot lastUpdateAt:',res)
                    if(res === 0){
                        setStakedTime(res)
                    }else {
                        const time = res * 1000;
                        const date = new Date(time);
                        const now = new Date();
                        const lefttime = now - date;
                        let lefth = Math.floor(lefttime / (1000 * 60 * 60));
                        console.log('bot staked time ',time, lefttime, lefth)
                        setStakedTime(lefth)
                    }
                })
            }catch (e) {
                console.log('load startAt error:',e)

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



    return {balance, rewards, stakedAmount,stakedTime ,total}
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