import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import value from "../../value.json";
import qniAbi from "../../qnitokenAbi.json";
import {
  useSigner,
  useProvider,
  useContract,
  useBalance,
  erc20ABI,
} from "wagmi";
import routerAbi from "../../routerAbi.json";
import {
  getCakePrice,
  getEthPrice,
  getBnbPrice,
  getQniPrice,
  getBtcPrice,
} from "../../utils/price";

const Stats = () => {
  //   let provider = createContext();
  //   let setProvider = createContext();
  //   let signer = createContext();
  //   let setSigner = createContext();

  //   let _provider = React.useContext(provider);
  //   let _setProvider = React.useContext(setProvider);
  //   let _signer = React.useContext(signer);
  //   let _setSigner = React.useContext(setSigner);

  const [fetchPrice, setfetchPrice] = useState("");

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=qroni&vs_currencies=usd";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.qroni);
        setfetchPrice(json.qroni);
      } catch (error) {
        // console.log("error", error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const qroniTotalSupply = 50000000;

  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();

  const [currentprice, setCurrentprice] = useState(0);
  const [vallocked, setVallocked] = useState();
  const [marketCap, setMarketcap] = useState();
  const [volume, setVolume] = useState();

  const [cakeLocked, setCakeLocked] = useState(0);
  const [ethLocked, setEthLocked] = useState(0);
  const [bnbLocked, setBnbLocked] = useState(0);
  const [qniLocked, setQNILocked] = useState(0);
  const [btcLocked, setBtcLocked] = useState(0);
  useEffect(() => {
    async function fetchLockedAmount() {
      try {
        let rpcUrl = value.rpcUrl;
        let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
        let QNI = new ethers.Contract(value.qniTokenAddress, qniAbi, provider_);
        let CAKE = new ethers.Contract(value.cake, erc20ABI, provider_);
        let wBNB = new ethers.Contract(value.bnb, erc20ABI, provider_);
        let Eth = new ethers.Contract(value.eth, erc20ABI, provider_);
        let Btc = new ethers.Contract(value.btc, erc20ABI, provider_);

        // get QNI token amount
        let lockedQNI = await QNI.balanceOf(value.stakingAddress);
        let lockedCAKE = await CAKE.balanceOf(value.stakingAddress);
        let lockedBNB = await wBNB.balanceOf(value.stakingAddress);
        let lockedEth = await Eth.balanceOf(value.stakingAddress);
        let lockedBtc = await Btc.balanceOf(value.stakingAddress);

        // console.log("fetched price", fetchPrice?.usdPrice)
        // console.log("locked QNI", ethers.utils.formatUnits(lockedQNI, "9"))
        // console.log("locked cake", ethers.utils.formatEther(lockedCAKE))
        // cake price
        let cakePrice = await getCakePrice();
        if (cakePrice) {
          // console.log("cakeprice", cakePrice.usdPrice)
          const lockedCakeAmount = ethers.utils.formatEther(lockedCAKE);
          const lockedCakeUSD =
            cakePrice?.usdPrice * parseFloat(lockedCakeAmount);
          // console.log("lockedcakeUSD", lockedCakeUSD)
          setCakeLocked(lockedCakeUSD);
        } else {
          console.log("no price");
        }
        //eth price
        let ethPrice = await getEthPrice();
        if (ethPrice) {
          const lockedEthAmount = ethers.utils.formatEther(lockedEth);
          const lockedEthUSD = ethPrice?.usdPrice * parseFloat(lockedEthAmount);
          setEthLocked(lockedEthUSD);
        } else {
          console.log("no eth price");
        }

        //BNB price
        let bnbPrice = await getBnbPrice();
        if (bnbPrice) {
          const lockedBnbAmount = ethers.utils.formatEther(lockedBNB);
          const lockedBnbUSD = bnbPrice?.usdPrice * parseFloat(lockedBnbAmount);
          setBnbLocked(lockedBnbUSD);
        } else {
          console.log("no eth price");
        }

        if (fetchPrice) {
          const lockedQniAmount = ethers.utils.formatUnits(lockedQNI, "9");
          const lockedQniUSD =
            fetchPrice?.usd * parseFloat(lockedQniAmount);
          setQNILocked(lockedQniUSD);
        } else {
          console.log("no qni price");
        }
        // BTC price
        let btcPrice = await getBtcPrice();
        if (btcPrice) {
          const lockedBtcAmount = ethers.utils.formatEther(lockedBtc);
          const lockedBtcUSD = btcPrice?.usdPrice * parseFloat(lockedBtcAmount);
          setBtcLocked(lockedBtcUSD);
        } else {
          console.log("no eth price");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchLockedAmount();
  }, [fetchPrice]);

  async function totalSupply() {
    try {
      let rpcUrl = value.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(value.qniTokenAddress, qniAbi, provider_);
      let supply = await token.totalSupply();
      console.log("Supply", supply.toString());
      let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      supply = ethers.utils.formatUnits(supply, decimals);
      setVolume(parseInt(supply));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchprice() {
    try {
      let rpcUrl = value.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      console.log(provider_);
      let router = new ethers.Contract(value.router, routerAbi, provider_);
      //   const router = useContract({
      //     addressOrName: value.router,
      //     contractInterface: routerAbi,
      //     signerOrProvider: provider_,
      //   });

      //needs to be sorted
      const tokenIn = value.qniTokenAddress;
      console.log(tokenIn);
      const tokenOut = value.wbnb;
      const amountIn = ethers.utils.parseUnits("1", 9);
      let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
      let busd = value.busd;
      let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
      console.log(`
            tokenIn: ${ethers.utils.formatEther(
              amountIn.toString()
            )} ${tokenIn} (QNI)
            tokenOut: ${ethers.utils.formatEther(
              amounts2[1].toString()
            )} ${busd} (BUSD)
          `);
      setCurrentprice(
        parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(8)
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function marketcap() {
    try {
      let _mcap = volume * currentprice;
      setMarketcap(_mcap);
      console.log("Current Market Capitalization: ", _mcap);
    } catch (error) {
      console.log(error);
    }
  }

  //   fetchprice();
  useEffect(() => {
    marketcap();
    // totalvallocked();
    fetchprice();
    totalSupply();
  }, []);

  const list = [
    {
      count: vallocked,
      heading: "Total Value Locked",
    },
    {
      count: volume + ` QNI`,
      heading: "Total Supply",
    },
    {
      count: marketCap,
      heading: "Market Cap",
    },
    {
      count: currentprice,
      heading: "Price",
    },
  ];
  const Section = styled.section`
    padding-top: 30px;
    padding-bottom: 100px;
  `;
  const BoxRow = styled.div`
    @media (max-width: 777px) {
      & > li:first-child > div {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }
      & > li:not(:last-child) > div {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      }
      & > li:last-child > div {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
  `;
  const Box = styled.div`
    padding: 30px 40px;
    background: var(--gr-primary);
    text-align: center;

    @media (min-width: 778px) {
      border-radius: 12px;
    }

    h3 {
      font-size: 32px;
      line-height: 1.2;
      font-weight: 800;
      margin-bottom: 5px;
    }
    p {
      font-size: 18px;
      line-height: 32px;
      margin-bottom: 0px;
    }
  `;
  return (
    <Section>
      <div className="container">
        <BoxRow className="list-unstyled row justify-content-xl-between g-md-4">
          {/* {list &&
            list.map((item, i) => (
              <li
                key={i}
                className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token"
              >
                <Box>
                  {item.count && <h3 className="fw-bold">{item.count}</h3>}
                  {item.heading && <p className="mb-0">{item.heading}</p>}
                </Box>
              </li>
            ))} */}
          <li className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token">
            <Box>
              <p>Total Value Locked</p>
              <h3>
                $
                {parseFloat(
                  bnbLocked + ethLocked + qniLocked + cakeLocked + btcLocked
                ).toFixed(2)}
              </h3>
            </Box>
          </li>
          <li className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token">
            <Box>
              <p>Total Supply</p>
              <h3>50,000,000 QNI</h3>
            </Box>
          </li>
          <li className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token">
            <Box>
              <p>Market Cap</p>
              <h3>${(fetchPrice.usd * qroniTotalSupply).toLocaleString(undefined, {maximumFractionDigits:0})}</h3>
            </Box>
          </li>
          <li className="col-xxl-auto col-xl-4 col-lg-6 col-md-6 info_token">
            <Box>
              <p>Price</p>
              <h3>{(fetchPrice?.usd ?? 0).toFixed(5)}</h3>
            </Box>
          </li>
        </BoxRow>
      </div>
    </Section>
  );
};

export default Stats;
