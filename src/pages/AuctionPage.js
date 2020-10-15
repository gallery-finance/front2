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
    <article className="auction center">
        <div className="auction__body">
            <h1 className="h1">Decentralized NFT Auction</h1>

            <p>
                We believe that the artists should always be rewarded. That is why
                when you create an art piece, you will earn money every time it is
                sold via the auction: we allocate 50% of the transaction fees to the
                original creators of sold NFTs.
            </p>

            <div className="auction__btn">
                <Link to="/" className="">
                    Coming Soon!
                </Link>
            </div>
        </div>

        <div className="auction__img">
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
