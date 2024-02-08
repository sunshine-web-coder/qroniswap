import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import pancakeImg from "./img/pancakeswap-cake-logo.png";
import coingeckoImg from "./img/coingecko.png";
import CountdownTimer from "./CountdownTimer";

const Hero = () => {
  const endTime = new Date("September 24, 2022 15:00:00").getTime();
  const [currentTime, setcurrentTime] = useState(new Date().getTime());
  const gap = endTime - currentTime; //177670892

  const seconds = 1000; // in milliseconds
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const remainingDays = Math.floor(gap / days);
  const remainingHours = Math.floor((gap % days) / hours);
  const remainingMinutes = Math.floor((gap % hours) / minutes);
  const remainingSeconds = Math.floor((gap % minutes) / seconds);

  useEffect(() => {
    setTimeout(() => setcurrentTime(new Date().getTime()), 1000);
  }, [currentTime]); // 11:30:55

  const Section = styled.section`
    padding: 200px 0 100px;
    position: relative;
    z-index: 1;

    &:before {
      content: "";
      width: 25vw;
      height: 25vw;
      left: -15%;
      top: 47px;
      position: absolute;
      background: #9f2dfe;
      filter: blur(127px);
      z-index: -1;
    }

    &:after {
      position: absolute;
      content: "";
      width: 25vw;
      height: 25vw;
      right: -15%;
      top: -90px;
      background: #3bb2f9;
      filter: blur(127px);
      z-index: -1;
    }
  `;
  const Heading = styled.div`
    margin-bottom: 50px;

    .homeBtn {
      margin-left: 20px;
    }

    h1 {
      font-size: 32px;
      line-height: 1;
      font-weight: 600;
      margin-bottom: 25px;

      @media (min-width: 991px) {
        font-size: 60px;
      }
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      font-weight: 400;

      @media (min-width: 991px) {
        font-size: 20px;
      }
    }
  `;
  return (
    <Section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <Heading>
              <h1>
                Next level digital marketplace to trade your favorite assets.
              </h1>
              <p>
                Multi-chain DEX. Get Exclusive NFT Tickets. Robust Pools
                Tailored for Your Favorite Tokens. Receive Eye-Catching Staking
                Rewards. High liquidity. Fast trade. Credit card support. No
                extra fees. Secure transaction.
              </p>
            </Heading>
            {/* <div>
              <CountdownTimer
                days={remainingDays}
                hours={remainingHours}
                minutes={remainingMinutes}
                seconds={remainingSeconds}
              />
            </div> */}
            <div className="SjnjMjj">
              <ConnectButton />

              <a
                target="_blank"
                rel="noreferrer"
                href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x98343e3eaf0aa8af6e93faff70c8ff70d98862f1&chainId=56"
                className="homeBtn"
              >
                Buy{" "}
                <img className="pancakeImg" src={pancakeImg} alt="pancakeImg" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://qroniswap.gitbook.io/qroniswap-whitepaper-1/"
                className="homeBtn"
              >
                Whitepaper
              </a>
              <a
                href="https://swap.qroni.org"
                className="homeBtn"
                target="_blank"
                rel="noreferrer"
              >
                Swap
              </a>

              <a
                href="https://nft.qroni.org"
                className="homeBtn nftBtn"
                target="_blank"
                rel="noreferrer"
              >
                NFT
              </a>

              {/* <a
                href="https://www.coingecko.com/en/coins/qroni"
                className="homeBtn"
                target="_blank"
                rel="noreferrer"
              >
                Coingecko{" "}
                <img
                  className="pancakeImg"
                  src={coingeckoImg}
                  alt="coingeckoImg"
                />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
