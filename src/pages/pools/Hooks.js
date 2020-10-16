import React, {useState, useEffect} from 'react';
import StakingRewardsV2 from '../../web3/abi/StakingRewardsV2.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {
    getBotAddress,
    getBotStakingAddress, getDEGOAddress, getDEGOStakingAddress, getDONUTAddress, getDONUTStakingAddress, getETHAddress,
    getETHStakingAddress, getGLFStakingAddress, getMEMOAddress,
    getMEMOStakingAddress, getUSDTAddress,
    getUSDTStakingAddress, getUSDTTokenAddress
} from "../../web3/address";
import BigNumber from "bignumber.js";
import ERC20 from "../../web3/abi/ERC20.json";
import Web3 from 'web3'
import {ChainId, Fetcher, Route, Token, WETH} from "@uniswap/sdk";

const {fromWei} = Web3.utils

export const useStatistics = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [totalStaked] = useState()
    const [glfBalance, setGLFBalance] = useState()
    const [curPrice, setCurPrice] = useState()
    const [totalSupply, setTotalSupply] = useState()
    const [curSupply, setCurSupply] = useState()
    const [totalBurned, setTotalBurned] = useState()

    const [ETHPrice, setETHPrice] = useState()
    const [BOTPrice, setBOTPrice] = useState()
    const [USDTPrice, setUSDTPrice] = useState()
    const [DEGOPrice, setDEGOPrice] = useState()
    const [DONUTPrice, setDONUTPrice] = useState()
    const [MEMEPrice, setMEMEPrice] = useState()


    const [burnedTotal, setBurnedTotal] = useState()


    async function queryTotalSupply() {
        console.log('queryTotalSupply')
        const glfContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))

        const botStaked = await glfContract.methods.balanceOf(getBotAddress(chainId)).call()

        const ethStaked = await glfContract.methods.balanceOf(getETHAddress(chainId)).call()

        const usdtStaked = await glfContract.methods.balanceOf(getUSDTAddress(chainId)).call()

        const memeStaked = await glfContract.methods.balanceOf(getMEMOAddress(chainId)).call()

        const donutStaked = await glfContract.methods.balanceOf(getDONUTAddress(chainId)).call()

        const degoStaked = await glfContract.methods.balanceOf(getDEGOAddress(chainId)).call()

        const total = new BigNumber((botStaked))
            .plus(new BigNumber((ethStaked)))
            .plus(new BigNumber((usdtStaked)))
            .plus(new BigNumber((memeStaked)))
            .plus(new BigNumber((donutStaked)))
            .plus(new BigNumber((degoStaked)))
            .toFixed()
            .toString()

        setTotalSupply(total)
    }

    async function queryTokensPrice() {
        try{
            const USDT = new Token(ChainId.MAINNET, getUSDTTokenAddress(), 6)

            const BOT = await Fetcher.fetchTokenData(ChainId.MAINNET, getBotAddress(ChainId.MAINNET))
            const ETHWETHPair = await Fetcher.fetchPairData(WETH[ChainId.MAINNET], BOT)
            const USDTWETHPair = await Fetcher.fetchPairData(USDT, WETH[ChainId.MAINNET])
            const ETHRoute = new Route([ETHWETHPair, USDTWETHPair], BOT)
            const BOTPrice = ETHRoute.midPrice.toSignificant(6)
            console.log('botPrice',ETHRoute.midPrice.toSignificant(6))
            setBOTPrice(BOTPrice)

            const MEME = await Fetcher.fetchTokenData(ChainId.MAINNET, getMEMOAddress(ChainId.MAINNET))
            const MEMEpair = await Fetcher.fetchPairData(USDT, MEME)
            const MEMEroute = new Route([MEMEpair], MEME)
            console.log('cur meme price',MEMEroute.midPrice.toSignificant(6))
            setMEMEPrice(MEMEroute.midPrice.toSignificant(6))

            setDONUTPrice('0.006')
            setDEGOPrice('1.1')
            setUSDTPrice('1')
            setETHPrice('376')
            //
            // const ETH = await new Token(ChainId.MAINNET, getETHAddress(ChainId.MAINNET), 18)
            // const ETHpair = await Fetcher.fetchPairData(USDT, ETH)
            // const ETHroute = new Route([ETHpair], ETH)
            // console.log('ETH price',ETHroute.midPrice.toSignificant(6))
            // setDONUTPrice(ETHroute.midPrice.toSignificant(6))
            //
            // const DONUT = await Fetcher.fetchTokenData(ChainId.MAINNET, getDONUTAddress(ChainId.MAINNET))
            // const DONUTpair = await Fetcher.fetchPairData(USDT, DONUT)
            // const DONUTroute = new Route([DONUTpair], DONUT)
            // console.log('DONUT dego price',DONUTroute.midPrice.toSignificant(6))
            // setDONUTPrice(DONUTroute.midPrice.toSignificant(6))
            //
            // const DEGO = await Fetcher.fetchTokenData(ChainId.MAINNET, getDEGOAddress(ChainId.MAINNET))
            // const DEGOpair = await Fetcher.fetchPairData(USDT, DEGO)
            // const DEGOroute = new Route([DEGOpair], DEGO)
            // console.log('cur dego price',DEGOroute.midPrice.toSignificant(6))
            // setDEGOPrice(DEGOroute.midPrice.toSignificant(6))

        }catch (e) {
            console.log('queryTokensPrice error',e)
        }

        //const ETH = new Token(ChainId.MAINNET, '0x710980bb4a0866e9ec162ccd84439dda5a04b99c', 18)




    }

    async function queryGLFPrice(){
        try {
            const USDT = new Token(ChainId.MAINNET, getUSDTTokenAddress(), 6)
            const GLF = await Fetcher.fetchTokenData(ChainId.MAINNET, getGLFStakingAddress(ChainId.MAINNET))
            const pair = await Fetcher.fetchPairData(USDT, GLF)
            const route = new Route([pair], GLF)
            console.log('cur glf price',route.midPrice.toSignificant(6))
            setCurPrice(route.midPrice.toSignificant(6))
        }catch (e) {
            console.log('queryGLFPrice',e)
        }

    }


    useEffect(()=>{
        if(active){
            queryTokensPrice()
            queryTotalSupply()
            queryGLFPrice()
            const glfContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
             glfContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call().then((res)=>{
                 setBurnedTotal(res)
             })
        }
    },[active])

    return {totalStaked, burnedTotal, curPrice, BOTPrice, ETHPrice, MEMEPrice, DONUTPrice, DEGOPrice, USDTPrice, totalSupply}
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


