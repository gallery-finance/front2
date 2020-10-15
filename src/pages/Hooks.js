import React, {useState, useEffect} from 'react';
import StakingRewardsV2 from '../web3/abi/StakingRewardsV2.json'
import {getContract, useActiveWeb3React} from "../web3";
import {getGLFStakingAddress} from "../web3/address";

export const useGLFBalance = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ glfBalance, setGLFBalance] = useState()



    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, StakingRewardsV2.abi, getGLFStakingAddress(chainId))
                contract.methods.balanceOf(account).call().then(res =>{
                    console.log('bot totalSupply:',res)
                    setGLFBalance(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

        }
    },[active])

    return {glfBalance}
}
