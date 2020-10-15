import React from "react";
import { Link } from "react-router-dom";

import image1 from "../assets/img/exhibition-hall/img--mobile.webp";
import image2 from "../assets/img/exhibition-hall/img--mobile@2x.webp";
import image3 from "../assets/img/exhibition-hall/img--mobile.png";
import image4 from "../assets/img/exhibition-hall/img--mobile@2x.png";
import image5 from "../assets/img/exhibition-hall/img.webp";
import image6 from "../assets/img/exhibition-hall/img@2x.webp";
import image7 from "../assets/img/exhibition-hall/img.png";
import image8 from "../assets/img/exhibition-hall/img@2x.png";

export const ExhibitionHallPage = () => (
    <article className="exhibition-hall center">
        <div className="auction__body">
            <h1 className="h1">
                Experience <br />
                is more important than money.
            </h1>

            <p>
                We believe that the artists should always be rewarded. That is why
                when you create an art piece, you will earn money every time it is
                sold via the auction: we allocate 50% of the transaction fees to the
                original creators of sold NFTs.
            </p>

            <p>
                Additionally, creators can share their personal story and give more
                background on their work, getting more people to talk about it.
            </p>

            <div className="auction__btn">
                <Link to="/" className="">
                    Coming Soon!
                </Link>
            </div>
        </div>

        <div className="exhibition-hall__img">
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
