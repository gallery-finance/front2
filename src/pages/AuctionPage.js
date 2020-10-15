import React from "react";
import { Link } from "react-router-dom";

import image1 from "../assets/img/auction/img--mobile.webp";
import image2 from "../assets/img/auction/img--mobile@2x.webp";
import image3 from "../assets/img/auction/img--mobile.png";
import image4 from "../assets/img/auction/img--mobile@2x.png";
import image5 from "../assets/img/auction/img.webp";
import image6 from "../assets/img/auction/img@2x.webp";
import image7 from "../assets/img/auction/img.png";
import image8 from "../assets/img/auction/img@2x.png";

export const AuctionPage = () => (
    <article class="auction center">
        <div class="auction__body">
            <h1 class="h1">Decentralized NFT Auction Environment</h1>

            <p>
                We think artist (the creator of the NFT) should always be rewarded.
                For all the auctions, we allocate 50% of transaction fees to the
                origial creators of the NFT.
            </p>

            <p>
                When you create a great art piece, you will earn money from every
                single hand-exchange sale from it.
            </p>

            <div class="auction__btn">
                <Link to="/" className="">
                    Coming Soon!
                </Link>
            </div>
        </div>

        <div class="auction__img">
            <picture>
                <source
                    srcSet={`${image1} 1x, ${image2} 2x`}
                    type="image/webp"
                    media="(max-width: 360px)"
                />
                <source
                    srcSet={`${image3} 1x, ${image4} 2x`}
                    media="(max-width: 360px)"
                />

                <source srcSet={`${image5} 1x, ${image6} 2x`} type="image/webp" />
                <source srcSet={`${image7} 1x, ${image8} 2x`} />

                <img src={image7} width="566" height="437" loading="lazy" alt="" />
            </picture>
        </div>
    </article>
);
