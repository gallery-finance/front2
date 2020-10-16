import React from "react";
import { Link } from "react-router-dom";

import image1 from "../assets/img/about/img.jpg";

export const AboutPage = () => {
    return (
        <article className="about center">
            <div className="auction__body">
                <h1 className="h1"> About Us </h1>
                <p>
                    {" "}
                    Gallery Finance is the first{" "}
                    <span className="gold-color">non-fungible token</span> (NFT)
                    workshop that combines innovative DeFi mechanisms to create
                    community-voted artworks. It is an open platform where community
                    ideas are turned into art, and all artists are rewarded.{" "}
                </p>
                <p>
                    {" "}
                    In addition to{" "}
                    <span className="gold-color">custom art workshops</span>, Gallery
                    Finance enables you to generate and{" "}
                    <span className="gold-color">auction off your own NFTs</span>, as
                    well as display your art via a decentralized exhibition hall.{" "}
                </p>
                <p>
                    {" "}
                    We ensure that intellectual property of artists is{" "}
                    <span className="gold-color">always protected</span>: that’s why
                    we allocate 30% of transaction fees from all the auctions to the
                    original creators of NFTs.{" "}
                </p>
                <p>
                    {" "}
                    Gallery Finance ecosystem is based on GLF community token. You
                    can learn about its main functionalities and utilities in{" "}
                    <a
                        href="https://medium.com/@gallery_finance/meet-glf-gallery-finance-community-token-12d46c1ddc15"
                        className="text-underline"
                    >
                        this guide
                    </a>
                    . GLF is distributed through{" "}
                    <span className="gold-color">liquidity mining</span> and the
                    first artist workshop, which will be launched in the near future.{" "}
                </p>
                <div classNamle="auction__btn">
                    <a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x47fd85128312ee72aa0e0382a531a8f848b8b2cb&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7">Get GLF</a>
                </div>
            </div>

            <div className="auction__img">
                <div className="auction__img transparent">
                    <img
                        src={image1}
                        width="400"
                        height="394"
                        loading="lazy"
                        alt=""
                    />
                </div>
            </div>
        </article>
    );
};
