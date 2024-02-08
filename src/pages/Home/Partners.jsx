import React from "react";
import styled from "styled-components";
import Logo1 from "./img/partner-1.png";
import Logo2 from "./img/partner-2.png";
import Logo3 from "./img/partner-3.png";
import Logo4 from "./img/partner-4.png";
import Logo5 from "./img/partner-5.png";
import Logo6 from "./img/partner-6.png";
import Logo7 from "./img/partner-7.png";
import Logo8 from "./img/partner-8.png";
import Logo9 from "./img/partner-9.png";
import Logo10 from "./img/partner-10.png";
import Logo11 from "./img/partner-11.png";
import Logo12 from "./img/partner-12.png";
import Logo13 from "./img/partner-13.png";
import Logo14 from "./img/partner-14.png";
import Logo15 from "./img/partner-15.png";
import Logo16 from "./img/partner-16.png";
import Logo17 from "./img/partner-17.png";

const Partners = () => {
  const list = [
    { image: Logo1, 
      urlLink: "https://swap.qroni.org" },
    { image: Logo2, 
      urlLink: "https://www.pinksale.finance/launchpad/0x5A91B2D3f0B4C66Fb72001b1c520a397b0E6565b?chain=BSC" },
    { image: Logo3, 
      urlLink: "" },
    { image: Logo4, 
      urlLink: "" },
    { image: Logo5, 
      urlLink: "" },
    { image: Logo6, 
      urlLink: "https://github.com/interfinetwork/smart-contract-audits/blob/audit-updates/Qroni_0x98343e3EaF0Aa8AF6e93fAFf70C8FF70D98862F1.pdf" },
    { image: Logo7, 
      urlLink: "https://medium.com/@qroniswap/qroniswap-onramp-payment-why-we-chose-onramper-f2dbbf2bf39d" },
    { image: Logo8, 
      urlLink: "https://pancakeswap.finance/liquidity" },
    { image: Logo9, 
      urlLink: "https://github.com/expelee-co/Smart-Contract-Audit/tree/main/Qroniswap%20Audit" },
    { image: Logo10, 
      urlLink: "https://t.me/azbit_news/1076" },
    { image: Logo11, 
      urlLink: "https://dappradar.com/binance-smart-chain/defi/qroniswap" },
    { image: Logo12, 
      urlLink: "" },
    { image: Logo13, 
      urlLink: "https://www.marketwatch.com/press-release/qroni-launches-robust-ecosystem-allowing-its-users-seamless-crypto-transactions-2022-09-23?mod=search_headline" },
    { image: Logo14, 
      urlLink: "https://www.benzinga.com/pressreleases/22/09/28996293/qroni-launches-robust-ecosystem-allowing-its-users-seamless-crypto-transactions" },
    { image: Logo15, 
      urlLink: "https://www.digitaljournal.com/pr/qroni-launches-robust-ecosystem-allowing-its-users-seamless-crypto-transactions" },
    { image: Logo16, 
      urlLink: "https://finance.yahoo.com/news/qroni-launches-robust-ecosystem-allowing-210842672.html" },
    { image: Logo17, 
      urlLink: "https://t.co/q2Rh2AN46D" },
  ];
  const Heading = styled.h2`
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;

    @media (min-width: 991px) {
      font-size: 48px;
    }
  `;

  return (
    <section>
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <Heading>Partners</Heading>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col partnersImg">
          {list &&
            list.map((img, i) => (
              <div key={i}>
                <a target="_blank" rel="noreferrer" href={img.urlLink}>
                  <img src={img.image} alt="" />
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
