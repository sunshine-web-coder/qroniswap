import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CBCheckbox } from "../../styled-components";
import bnbicon from "./img/bnb.png";
import qroniicon from "./img/qroni.png";
import btcicon from "./img/btc.png";
import vceicon from "./img/vce.png";
import ethicon from "./img/eth.png";
import cakeicon from "./img/cake.png";
import farm1icon from "./img/farm1.png";
import farm2icon from "./img/farm2.png";
import LinkIcon from "./img/link-icon.svg";
import { FiSearch } from "react-icons/fi";
import { ethers } from "ethers";
import stakingAbi from "../../stakingAbi.json";
import erc20 from "../../erc20.json";
import tokenAbi from "../../tokenAbi.json";
import value from "../../value.json";
import { useSigner, useProvider, useContract, useBalance } from "wagmi";
import { _nameprepTableA1 } from "@ethersproject/strings/lib/idna";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useHistory, useLocation } from 'react-router-dom';
import { event } from "jquery";

const DataTable = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(null);
  const [laptop, setLaptop] = useState(
    window.matchMedia("(min-width: 778px)").matches
  );
  const { data: signer, isError, isLoading } = useSigner();

  const provider = useProvider();
  const staking = new ethers.Contract(value.stakingAddress, stakingAbi, signer);
  let token = new ethers.Contract(value.qniTokenAddress, tokenAbi, signer);
  const ethContract = new ethers.Contract(value.eth, erc20, signer);
  const bnbContract = new ethers.Contract(value.bnb, erc20, signer);
  const cakeContract = new ethers.Contract(value.cake, erc20, signer);
  const btcContract = new ethers.Contract(value.btc, erc20, signer);
  const vceContract = new ethers.Contract(value.vce, erc20, signer);
  // const staking = useContract({
  //   addressOrName: value.stakingAddress,
  //   contractInterface: stakingAbi,
  //   signer
  // });


  // const token = useContract({
  //   addressOrName: value.qniTokenAddresstestnet,
  //   contractInterface: tokenAbi,
  //   signerOrProvider: provider,
  // });

  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [vceBalance, setVceBalance] = useState(0);
  const [cakeBalance, setCakeBalance] = useState(0);
  const [bnbBalance, setBnbBalance] = useState(0);

  const [iswalletconnected, setIswalletconnected] = useState(false);
  const [poolId, setPoolId] = useState(0);
  const [poolLength, setPoolLength] = useState(0);
  const [amount, setAmount] = useState();
  const [amountloc, setAmountloc] = useState(0);
  const [istokenapproved, settokenapproved] = useState(false);
  const [myaddress, setMyaddress] = useState();
  const [poolinfo, setPoolinfo] = useState();
  const [tokenaddress, setTokenaddress] = useState();
  const [allocpoint, setAllocpoint] = useState();
  const [depositfee, setDepositfee] = useState();
  const [qnipershare, setQnipershare] = useState();
  const [lastrewardblock, setLastrewardblock] = useState();
  const [feeadress, setfeeaddress] = useState();
  const [rewarddebt, setRewarddebt] = useState(0);
  // const [devaddr, setDevaddr] = useState(0);
  const [errors, setError] = useState();
  const [qronibalance, setqronibalance] = useState(0);
  const [reward_pool1, setreward_pool1] = useState(0);
  const [reward_pool2, setreward_pool2] = useState(0);
  const [reward_pool3, setreward_pool3] = useState(0);
  const [reward_pool4, setreward_pool4] = useState(0);
  const [reward_pool5, setreward_pool5] = useState(0);
  const [reward_pool6, setreward_pool6] = useState(0);
  const [reward_pool7, setreward_pool7] = useState(0);
  const [reward_pool8, setreward_pool8] = useState(0);
  const [amountstaked1, setamountstaked1] = useState(0);
  const [amountstaked2, setamountstaked2] = useState(0);
  const [amountstaked3, setamountstaked3] = useState(0);
  const [amountstaked4, setamountstaked4] = useState(0);
  const [amountstaked5, setamountstaked5] = useState(0);
  const [amountstaked6, setamountstaked6] = useState(0);
  const [amountstaked7, setamountstaked7] = useState(0);
  const [amountstaked8, setamountstaked8] = useState(0);
  const [fee1, setfee1] = useState(0);
  const [fee2, setfee2] = useState(0);
  const [fee3, setfee3] = useState(0);
  const [fee4, setfee4] = useState(0);
  const [fee5, setfee5] = useState(0);
  const [fee6, setfee6] = useState(0);
  const [fee7, setfee7] = useState(0);
  const [fee8, setfee8] = useState(0);
  const [share1, setShare1] = useState(0);
  const [share2, setShare2] = useState(0);
  const [share3, setShare3] = useState(0);
  const [share4, setShare4] = useState(0);
  const [share5, setShare5] = useState(0);
  const [share6, setShare6] = useState(0);
  const [share7, setShare7] = useState(0);
  const [share8, setShare8] = useState(0);
  const [isStake, setIsStake] = useState(true);
  const [inputStakeAmount, setInputStakeAmount] = useState(0);

  useEffect(() => {
    refreshData(signer);
    if(location.pathname === "/farming"){
      token = new ethers.Contract(value.lpPair, tokenAbi, signer);
      setIsStake(false)
    }
    else{
      token = new ethers.Contract(value.qniTokenAddress, tokenAbi, signer);
      setIsStake(true)
    }



  if(signer){
    setIswalletconnected(true)
  }
  }, [signer, poolId, location]);



  async function refreshData(signer) {
    if (signer) {
      signer.getAddress().then((res) => {
        setMyaddress(res);
      });
      getAllTokens();
      getRewards(0)

      const fetch1 = async() => {
        const {reward: rewards1} = await getRewards(0);
        const {amount: amount1} = await getuserinfo(0);
        const {depositfee: fee1, acc_qni_per_share: share1} = await getpoolinfo(0);
        setreward_pool1(rewards1)
        setamountstaked1(amount1)
        setfee1(fee1)
        setShare1(share1)
      }
      
      const fetch2 = async() => {
        const {reward: rewards2} = await getRewards(6);
        const {amount: amount2} = await getuserinfo(6);
        const {depositfee: fee2, acc_qni_per_share: share2} = await getpoolinfo(6);
        setreward_pool2(rewards2)
        setamountstaked2(amount2)
        setfee2(fee2)
        setShare2(share2)
      }
      
      const fetch3 = async() => {
        const {reward: rewards3} = await getRewards(2);
        const {amount: amount3} = await getuserinfo(2);
        setreward_pool3(rewards3)
        setamountstaked3(amount3)
        const {depositfee: fee3, acc_qni_per_share: share3} = await getpoolinfo(2);
        setfee3(fee3)
        setShare3(share3)
      }


      const fetch4 = async() => {
        const {reward: rewards4} = await getRewards(3);
        const {amount: amount4} = await getuserinfo(3);
        setreward_pool4(rewards4)
        setamountstaked4(amount4)
        const {depositfee: fee4, acc_qni_per_share: share4} = await getpoolinfo(3);
        setfee4(fee4)
        setShare4(share4)
      }

      const fetch5 = async() => {
        const {reward: rewards5} = await getRewards(4);
        const {amount: amount5} = await getuserinfo(4);
        setreward_pool5(rewards5)
        setamountstaked5(amount5)
        const {depositfee: fee5, acc_qni_per_share: share5} = await getpoolinfo(4);
        setfee5(fee5)
        setShare5(share5)  
      }

      const fetch6 = async() => {
        const {reward: rewards6} = await getRewards(5);
      const {amount: amount6} = await getuserinfo(5);
      setreward_pool6(rewards6)
      setamountstaked6(amount6)
      const {depositfee: fee6, acc_qni_per_share: share6} = await getpoolinfo(5);
      setfee6(fee6)
      setShare6(share6)
      }


      const fetch7 = async() => {
        const {reward: rewards7} = await getRewards(6);
      const {amount: amount7} = await getuserinfo(6);
      setreward_pool7(rewards7)
      setamountstaked7(amount7)
      const {depositfee: fee7, acc_qni_per_share: share7} = await getpoolinfo(6);
      setfee7(fee7)
      setShare7(share7)
  
      }

      const fetch8 = async() => {
        const {reward: rewards8} = await getRewards(7);
        const {amount: amount8} = await getuserinfo(7);
        setreward_pool8(rewards8)
        setamountstaked8(amount8)
        const {depositfee: fee8, acc_qni_per_share: share8} = await getpoolinfo(7);
        setfee8(fee8)
        setShare8(share8)
  
      }
      fetch1()
      fetch2()
      fetch3()
      fetch4()
      fetch5()
      fetch6()
      fetch7()
      fetch8()
      getpoollength();
      getfeeaddress();
      // getdevaddr();
      getqroniBalance()
      
    }
  }

  const hanglechange = (event) => {
    setInputStakeAmount(event.target.value)
  }


  async function deposit(poolId_selected, tokens) {
    try {
      console.log (poolId_selected)
          console.log(inputStakeAmount)
        const amount = inputStakeAmount;
        await approve(tokens);
        let _amount = 0;
        if (poolId_selected == 0) {
          _amount = ethers.utils.parseUnits(amount.toString(), 9);  
        } else {
          _amount = ethers.utils.parseUnits(amount.toString(), 18);  
        }
        //  let _amount = ethers.utils.parseUnits(amount.toString(), 9);
        let tx = await staking.deposit(poolId_selected, _amount);
        let receipt = await tx.wait();
        console.log("Stake Tx receipt: ", receipt);
        refreshData(signer);
    } catch (error) {
      console.log(error);
      try {
        alert(error.error.data.message);
      } catch {
        console.log("Something went wrong, please try again!");
      }
    }
  }

  async function harvest(poolId_selected, tokens) {
    try {
      console.log (poolId_selected)
          console.log(inputStakeAmount)
        const amount = inputStakeAmount;
        await approve(tokens);
        let _amount = ethers.utils.parseUnits(amount.toString(), 9);
        let tx = await staking.deposit(poolId_selected, '0');
        let receipt = await tx.wait();
        console.log("Stake Tx receipt: ", receipt);
        refreshData(signer);
    } catch (error) {
      console.log(error);
      try {
        alert(error.error.data.message);
      } catch {
        console.log("Something went wrong, please try again!");
      }
    }
  }


  async function approve(tokens) {
    try{
    let userAddress = await signer.getAddress()
    const isApproved = await tokens.allowance(userAddress, value.stakingAddress);
    const totaltokenapproved = isApproved.toString()
    if(totaltokenapproved.length > 2){
      console.log("approved", totaltokenapproved);
    }
    else{
      let _amount = ethers.utils.parseUnits("10000000000000000000", 18);
      let tx = await tokens.approve(value.stakingAddress, _amount);
      let receipt = await tx.wait();
      console.log("Approve tx receipt: ", receipt);
    }
  }
  catch(err){
    console.log(err)
  }
  }


  async function getqroniBalance(){
    try{
      let qroni = await token.balanceOf(await signer.getAddress());
      const qroniconverted = ethers.utils.formatUnits(qroni, 9)
      console.log("Qroni Balance:",qroniconverted)
      setqronibalance(qroniconverted);
    }
    catch(err){
      console.log ("qroni balance error",err)
      try{
        alert(err.error.data.message);
      }

      catch{
        
      }
    }
    
  }




  async function getAllTokens() {
      try {
       
        let btc = await btcContract.balanceOf(await signer.getAddress());
        let eth = await ethContract.balanceOf(await signer.getAddress());
        let cake = await cakeContract.balanceOf(await signer.getAddress());
        let bnb = await bnbContract.balanceOf(await signer.getAddress());
        let vce = await vceContract.balanceOf(await signer.getAddress());
       
        const btcConverted = ethers.utils.formatUnits(btc, 18)
        const ethConverted = ethers.utils.formatUnits(eth, 18)
        const cakeConverted = ethers.utils.formatUnits(cake, 18)
        const bnbConverted = ethers.utils.formatUnits(bnb, 18)
        const vceConverted = ethers.utils.formatUnits(vce, 18)
       
        console.log("BTC Balance:", btcConverted)
        console.log("ETH Balance:", ethConverted)
        console.log("CAKE Balance:", cakeConverted)
        console.log("BNB Balance:", bnbConverted)
        console.log("VCE Balance:", vceConverted)
        
        setBtcBalance(btcConverted)
        setEthBalance(ethConverted)
        setBnbBalance(bnbConverted)
        setCakeBalance(cakeConverted)
        setVceBalance(vceConverted)

      } catch (error) {
        console.log(error);
      }
    } 


  async function withdraw(poolId_selected, amountunstake) {
    try {
      console.log(`amount to unstake`+amountunstake);
      let amountwithdraw = 0;
      if( poolId_selected == 0 ) {
        amountwithdraw = ethers.utils.parseUnits(amountunstake.toString(), 9);
      } else {
        amountwithdraw = ethers.utils.parseUnits(amountunstake.toString(), 18)
      }
      //  const amountwithdraw = ethers.utils.parseUnits(amountunstake.toString(), 9)
      console.log(amountwithdraw)
      let tx = await staking.withdraw(poolId_selected, amountwithdraw);
      let receipt = await tx.wait();
      console.log("Withdraw tx receipt: ", receipt);
      refreshData(signer);
    } catch (error) {
      console.log(error);
      try {
        alert(error.error.data.message);
      } catch {
        console.log("Something went wrong, please try again!");
      }
    }
  }





  async function getRewards(poolids){
    var rewards_fetched = await staking.pendingQNI(poolids, signer.getAddress());
    let reward = 0;
       reward = ethers.utils.formatUnits(rewards_fetched, 9);  
  
    return {reward}
  }



  async function getpoolinfo(poolids) {
    try {
      var _poolinfo = await staking.poolInfo(poolids);
      const token_address = _poolinfo.lpToken.toString();
      const last_reward_block = _poolinfo.lastRewardBlock.toString();
      const acc_qni_per_share = _poolinfo.accQNIPerShare.toString();
      const depositfee = _poolinfo.depositFeeBP.toString();
      console.log(depositfee);
      setDepositfee(depositfee);
      setPoolinfo(_poolinfo);
      setTokenaddress(token_address);
      setLastrewardblock(last_reward_block);
      setQnipershare(acc_qni_per_share);
      return {depositfee, acc_qni_per_share}
    } catch (err) {
      console.log(err);
      return {depositfee: 0, acc_qni_per_share: 0, }
    }
  }

  

  async function getpoollength() {
    try {
      var _poollength = await staking.poolLength();
      const poollength = _poollength.toString();
      console.log("pool length: ", poollength);
      setPoolLength(poollength);
    } catch (err) {
      try{
        alert(err.error.data.message);
      } catch {
        console.log("Something went wrong, please try again!");
      }
    }
  }

  async function getfeeaddress() {
    try {
      var _feeaddr = await staking.feeAddress.toString();
      console.log("Fee address: ", _feeaddr);
      setfeeaddress(_feeaddr);
    } catch (err) {
      console.log(err.message);
      try{
        alert(err.error.data.message);
      } catch {
        console.log("Something went wrong, please try again!");
      }
    }
  }

  async function getuserinfo(poolidindex) {
    try {
      var _userinfo = await staking.userInfo(poolidindex, signer.getAddress());
      console.log(_userinfo)
      const rewardfetched = await _userinfo.rewardDebt;
      let rewardDebt = 0;
      let amount = 0;
      const amountconverted = await _userinfo.amount;
      if (poolidindex == 0){
        rewardDebt = ethers.utils.formatUnits(rewardfetched.toString(), 9);  
        amount = ethers.utils.formatUnits(amountconverted.toString(), 9)
      }else {
        rewardDebt = ethers.utils.formatUnits(rewardfetched.toString(), 18);  
        amount = ethers.utils.formatUnits(amountconverted.toString(), 18)
      }
      // const rewardDebt = ethers.utils.formatUnits(rewardfetched.toString(), 9);
     
      
      // const amount = ethers.utils.formatUnits(amountconverted.toString(), 9)
      console.log(amountconverted)
      setRewarddebt(rewardDebt);
      console.log("Reward debt ", rewardDebt);
      console.log("Amount: ", amount);
      return {rewardDebt, amount};   
    } catch (err) {
      console.log(err.message);
      return {rewardDebt: 0, amount: 0}
    }
  }




  // async function getdevaddr() {
  //   try {
  //     const _devaddr = await staking.devaddr();
  //     setDevaddr(_devaddr);
  //     console.log("Dev address: ", devaddr);
  //   } catch (err) {
  //     console.log(err.message);
  //     try{
  //       alert(err.error.data.message);
  //     } catch {
  //       console.log("Something went wrong, please try again!");
  //     }
  //   }
  // }


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const handler = (e) => setLaptop(e.matches);
    window.matchMedia("(min-width: 778px)").addEventListener("change", handler);
  });

  const onClickRowOpenHandle = ($id) => {
    setIsOpen($id);
  };

  const onClickRowCloseHandle = () => {
    setIsOpen(null);
  };

  const stakedata = [
    {
      id: 1,
      stakeorfarmid:0,
      QniPerShare: share1,
      DepositFee: "2%",
      tokenlocked:amountstaked1,
      bsctoken:token,
      qroniEarned:reward_pool1,


      list: [
        {
          icon: qroniicon,
        },
        {
          title: "Earn Qroni",
          content: "Stake QNI",
        },
        {
          title: "Qroni Balance",
          content: `${parseFloat(qronibalance).toFixed(4)}`,
        },
        {
          title: "APR",
          content: "300%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked1}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool1}`,
        },
      ],
    },
    {
      id: 2,
      stakeorfarmid:6,
      QniPerShare: share2,
      DepositFee: "4%",
      tokenlocked:amountstaked2,
      bsctoken:vceContract,
      qroniEarned:reward_pool2,

      list: [
        {
          icon: vceicon,
        },
        {
          title: "Earn Qroni",
          content: "Stake VCE",
        },
        {
          title: "VCE Balance",
          content: `${parseFloat(vceBalance).toFixed(4)}`,
        },
        {
          title: "APR",
          content: "100%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked2}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool2}`,
        },
      ],
    },
    {
      id: 3,
      stakeorfarmid:2,
      QniPerShare: share3,
      DepositFee: "4%",
      tokenlocked:amountstaked3,
      bsctoken:bnbContract,
      qroniEarned:reward_pool3,

      list: [
        {
          icon: bnbicon,
        },
        {
          title: "Earn Qroni",
          content: "Stake BNB",
        },
        {
          title: "WBNB Balance",
          content: `${parseFloat(bnbBalance).toFixed(4)}`,
        },
        {
          title: "APR",
          content: "120%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked3}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool3}`,
        },
      ],
    },
    {
      id: 4,
      stakeorfarmid:3,
      QniPerShare: share4,
      DepositFee: "4%",
      tokenlocked:amountstaked4,
      bsctoken:btcContract,
      qroniEarned:reward_pool4,


      list: [
        {
          icon: btcicon,
        },
        {
          title: "Earn Qroni",
          content: "Stake BTC",
        },
        {
          title: "BTC Balance",
          content: `${parseFloat(btcBalance).toFixed(4)}`,
        },
        {
          title: "APR",
          content: "150%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked4}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool4}`,
        },
      ],
    },
    {
      id: 5,
      stakeorfarmid:4,
      QniPerShare: share5,
      DepositFee: "4%",
      tokenlocked:amountstaked5,
      bsctoken:ethContract,
      qroniEarned:reward_pool5,


      list: [
        {
          icon: ethicon,
        },
        {
          title: "Earn Qroni",
          content: "Stake ETH",
        },
        {
          title: "ETH Balance",
          content: `${parseFloat(ethBalance).toFixed(4)}`,
        },
        {
          title: "APR",
          content: "150%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked5}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool5}`,
        },
      ],
    },
    {
      id: 6,
      stakeorfarmid:5,
      QniPerShare: share6,
      DepositFee: "4%",
      tokenlocked:amountstaked6,
      bsctoken:cakeContract,
      qroniEarned:reward_pool6,


      list: [
        {
          icon: cakeicon,
        },
        {
          title: "Earn Qroni",
          content: "Stake CAKE",
        },
        {
          title: "CAKE Balance",
          content: `${parseFloat(cakeBalance).toFixed(4)}`,
        },
        {
          title: "APR",
          content: "170%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked6}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool6}`,
        },
      ],
    },
  ];
  const pooldata = [
    {
      id: 1,
      stakeorfarmid:6,
      QniPerShare: share7,
      DepositFee: "4%",
      tokenlocked:amountstaked7,
      bsctoken:token,
      qroniEarned:reward_pool7,


      list: [
        {
          icon: farm1icon,
        },
        {
          title: "Earn Qroni",
          content: "BNB-QNI Lp",
        },
        {
          title: "Qroni Balance",
          content: `${qronibalance}`,
        },
        {
          title: "APR",
          content: "300%",
        },
        {
          title: "Total Staked",
          content: `${amountstaked7}`,
        },
        {
          title: "Qroni Earned",
          content: `${reward_pool7}`,
        },
      ],
    },
    // {
    //   id: 8,
    //   stakeorfarmid:7,
    //   QniPerShare: share8,
    //   DepositFee: "4%",
    //   tokenlocked:amountstaked8,
    //   bsctoken:token,
    //   qroniEarned:reward_pool8,

    //   list: [
    //     {
    //       icon: farm2icon,
    //     },
    //     {
    //       title: "Earn Qroni",
    //       content: "VCE - QNI Lp",
    //     },
    //     {
    //       title: "Qroni Balance",
    //       content: `${qronibalance}`,
    //     },
    //     {
    //       title: "APR",
    //       content: "100%",
    //     },
    //     {
    //       title: "Total Staked",
    //       content: `${amountstaked8}`,
    //     },
    //     {
    //       title: "Qroni Earned",
    //       content: `${reward_pool8}`,
    //     },
    //   ],
    // },
    
  ];
  const Section = styled.section``;
  const TableBox = styled.div`
    width: 100%;
    background-color: #fdfdfd;
    color: #333333;
    border-radius: 8px;

    .btn {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 0.2px;
      padding: 10px 20px;
      border-radius: 4px;
      color: #fff;
    }

    h6 {
      color: #4f4f4f;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
    h5 {
      font-size: 16px;
      line-height: 1;
      letter-spacing: 0.2px;
    }

    table {
      width: 100%;

      td {
        padding: 10px 15px;
        border-bottom: 1px solid rgba(102, 112, 133, 0.2);
        @media (min-width: 991px) {
          padding: 20px;
        }

        &:last-child {
          text-align: center;
        }

        &:nth-child(2) {
          h4 {
            font-size: 12px;
            font-weight: 500;
            line-height: 1;
          }
        }
        &:not(:nth-child(2)) {
          h4 {
            font-size: 16px;
            font-weight: 500;
            line-height: 1;
          }
        }
      }
    }
  `;
  const ButtonBox = styled.div`
    display: inline-block;
    background-color: #f0eff0;
    border-radius: 4px;
    padding: 15px;
    text-align: start;
  `;
  const HeadingFilter = styled.div`
    display: flex;
    align-items: stretch;
    gap: 1rem;
    margin: 50px 0;

    .search-group {
      display: inline-flex;
      align-items: center;
      background-color: #fff;
      color: #000;
      padding: 10px 20px;
      border-radius: 8px;

      svg {
        font-size: 16px;
        min-width: 15px;
      }

      input {
        border: 0;
        outline: none;
        box-shadow: none;
        width: 100%;
      }
    }
    .select-group select {
      height: 100%;
      padding: 10px 20px;
      border-radius: 8px;
    }
  `;
  const Details = styled.tr``;
  const ListHeading = styled.div`
    font-size: 12px;
    line-height: 2;
    font-weight: 500;
    color: #364073;
  `;



  return (
    <div>
      {isStake ? 
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Heading */}
            <HeadingFilter>
              {/* Input Group */}
              <div className="search-group">
                <FiSearch className="me-1 me-md-3" />
                <input type="text" placeholder="Search" />
              </div>
              {/* Input Select */}
              <div className="select-group">
                <select name="" id="">
                  <option value="">Sort</option>
                  <option value="item-1">Hot</option>
                  <option value="item-2">Date</option>
                  <option value="item-3">Rate</option>
                  <option value="item-4">% APR</option>
                </select>
              </div>
              {/* Input Select */}
              <div className="checkbox-group align-self-center">
                <CBCheckbox>
                  <input id="checkbox-1" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cb-checkbox">
                    Staked
                  </label>
                </CBCheckbox>
              </div>
            </HeadingFilter>
            <TableBox>
              <table>
                <tbody>
                  {stakedata &&
                    stakedata.map((item, i) => (
                      <>
                        {!laptop ? (
                          <>
                            <tr
                              key={i}
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(0, 2).map((sub, subIdx) => (
                                  <td
                                  key={subIdx}
                                    className={sub.icon ? "pe-0" : "text-start"}
                                    width={sub.icon ? 53 : ""}
                                    colSpan={sub.icon ? 1 : 5}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                            <tr
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(2, 5).map((sub, subIdx) => (
                                  // {item.list && item.list.map((sub, subIdx) =>(
                                  <td
                                  key={subIdx}
                                    className={sub.icon ? "pe-0" : ""}
                                    width={sub.icon ? 53 : ""}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                          </>
                        ) : (
                          <tr
                            onClick={
                              isOpen !== null && isOpen === i
                                ? onClickRowCloseHandle
                                : () => onClickRowOpenHandle(i)
                            }
                          >
                            {item.list &&
                              item.list.map((sub, subIdx) => (
                                // {item.list && item.list.map((sub, subIdx) =>(
                                <td
                                  key={subIdx}
                                  className={sub.icon ? "pe-0" : ""}
                                  width={sub.icon ? 53 : ""}
                                >
                                  {sub.icon && (
                                    <img src={sub.icon} width={53} alt="" />
                                  )}
                                  {sub.title && <h6>{sub.title}</h6>}
                                  {sub.content && <h4>{sub.content}</h4>}
                                </td>
                              ))}
                          </tr>
                        )}
                        {isOpen !== null && isOpen === i && (
                          <Details>
                            <td colSpan={6}>
                              <div className="row align-items-center gy-4">
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <ListHeading>
                                      Total Locked: {item.tokenlocked}
                                    </ListHeading>
                                    <ListHeading>
                                      Qni Per Share: {item.QniPerShare} 
                                    </ListHeading>
                                    <ListHeading>Deposit Fee: {item.DepositFee}</ListHeading>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <div>
                                    <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>Get Qroni-BNB LP</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>View Contract</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>See Pair Info</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                  <input placeholder="Amount" value={inputStakeAmount} type="number" className="amount_input" onChange={e => hanglechange(e)} autoFocus="autofocus"/>

                                    <ButtonBox>
                                      <div className="d-flex flex-wrap gap-2 gap-lg-4">
                                        <div>
                                          <h6>Qroni Earned</h6>
                                          <h5>{parseFloat(item.qroniEarned).toFixed(2)}</h5>
                                        </div>
                                        <div className="align-self-end">
                                          <button
                                            className="btn btn-gr-primary"
                                            onClick={() => deposit(item.stakeorfarmid, item.bsctoken)}
                                          >
                                            Stake
                                          </button>
                                          {parseInt((item.list[5].content).toString()) != 0 && <button
                                            className="btn btn-gr-primary"
                                            onClick={() => deposit(item.stakeorfarmid, item.bsctoken)}
                                          >
                                            Harvest
                                          </button>}
                                        </div>
                                      </div>
                                    </ButtonBox>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                    <ButtonBox>
                                      
                                      <h6>Start Farming</h6>
                                        {iswalletconnected ? <button onClick={() => withdraw(item.stakeorfarmid, item.tokenlocked)} className="btn btn-gr-primary"> unstake </button>  : <ConnectButton />}
                                       
                                    </ButtonBox>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </Details>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </TableBox>
          </div>
        </div>
      </div>
    </Section>
    :<div>
      {/* pool section started  */}
      <Section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Heading */}
            <HeadingFilter>
              {/* Input Group */}
              <div className="search-group">
                <FiSearch className="me-1 me-md-3" />
                <input type="text" placeholder="Search" />
              </div>
              {/* Input Select */}
              <div className="select-group">
                <select name="" id="">
                  <option value="">Sort</option>
                  <option value="item-1">Hot</option>
                  <option value="item-2">Date</option>
                  <option value="item-3">Rate</option>
                  <option value="item-4">% APR</option>
                </select>
              </div>
              {/* Input Select */}
              <div className="checkbox-group align-self-center">
                <CBCheckbox>
                  <input id="checkbox-1" type="checkbox" />
                  <label htmlFor="checkbox-1" className="cb-checkbox">
                    Staked
                  </label>
                </CBCheckbox>
              </div>
            </HeadingFilter>
            <TableBox>
              <table>
                <tbody>
                  {pooldata &&
                    pooldata.map((item, i) => (
                      <>
                        {!laptop ? (
                          <>
                            <tr
                              key={i}
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(0, 2).map((sub, subIdx) => (
                                  <td
                                  key={subIdx}
                                    className={sub.icon ? "pe-0" : "text-start"}
                                    width={sub.icon ? 53 : ""}
                                    colSpan={sub.icon ? 1 : 5}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                            <tr
                              onClick={
                                isOpen !== null && isOpen === i
                                  ? onClickRowCloseHandle
                                  : () => onClickRowOpenHandle(i)
                              }
                            >
                              {item.list &&
                                item.list.slice(2, 5).map((sub, subIdx) => (
                                  // {item.list && item.list.map((sub, subIdx) =>(
                                  <td
                                  key={subIdx}

                                    className={sub.icon ? "pe-0" : ""}
                                    width={sub.icon ? 53 : ""}
                                  >
                                    {sub.icon && (
                                      <img src={sub.icon} width={53} alt="" />
                                    )}
                                    {sub.title && <h6>{sub.title}</h6>}
                                    {sub.content && <h4>{sub.content}</h4>}
                                  </td>
                                ))}
                            </tr>
                          </>
                        ) : (
                          <tr
                            onClick={
                              isOpen !== null && isOpen === i
                                ? onClickRowCloseHandle
                                : () => onClickRowOpenHandle(i)
                            }
                          >
                            {item.list &&
                              item.list.map((sub, subIdx) => (
                                // {item.list && item.list.map((sub, subIdx) =>(
                                <td
                                key={subIdx}
                                  className={sub.icon ? "pe-0" : ""}
                                  width={sub.icon ? 53 : ""}
                                >
                                  {sub.icon && (
                                    <img src={sub.icon} width={53} alt="" />
                                  )}
                                  {sub.title && <h6>{sub.title}</h6>}
                                  {sub.content && <h4>{sub.content}</h4>}
                                </td>
                              ))}
                          </tr>
                        )}
                        {isOpen !== null && isOpen === i && (
                          <Details>
                            <td colSpan={6}>
                              <div className="row align-items-center gy-4">
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <ListHeading>
                                      Total Locked: {item.tokenlocked}
                                    </ListHeading>
                                    <ListHeading>
                                      Qni Per Share: {item.QniPerShare} 
                                    </ListHeading>
                                    <ListHeading>Deposit Fee: {item.DepositFee}</ListHeading>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="d-flex align-items-start flex-column gap-1">
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>Get Qroni-BNB LP</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>View Contract</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="text-gr-primary text-nowrap"
                                      >
                                        <span>See Pair Info</span>
                                        <img
                                          src={LinkIcon}
                                          className="ms-2"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                    <ButtonBox>
                                    <input onChange={event=>{hanglechange(event.target.value)}}  placeholder="Amount" type="number" className="amount_input" autoFocus="autofocus"/>

                                      <div className="d-flex flex-wrap gap-2 gap-lg-4">
                                        <div>
                                          <h6>Qroni Earned</h6>
                                          <h5>{item.qroniEarned}</h5>
                                        </div>
                                        <div className="align-self-end">
                                        <button
                                            className="btn btn-gr-primary"
                                            onClick={() => deposit(item.stakeorfarmid, item.bsctoken)}
                                          >
                                            Stake
                                          </button>
                                          {parseInt((item.list[4].content).toString()) != 0 && <button
                                            className="btn btn-gr-primary"
                                            onClick={() => deposit(item.stakeorfarmid, item.bsctoken)}
                                          >
                                            Harvest
                                          </button>}
                                        </div>
                                      </div>
                                    </ButtonBox>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-lg-center text-start">
                                    <ButtonBox>
                                      <h6>Start Farming</h6>
                                        {iswalletconnected ? <button onClick={() => withdraw(item.stakeorfarmid, item.tokenlocked)} className="btn btn-gr-primary"> unstake </button>  : <ConnectButton />}
                                       
                                    </ButtonBox>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </Details>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </TableBox>
          </div>
        </div>
      </div>
    </Section>



    </div> }
    </div>
  );
};

export default DataTable;
