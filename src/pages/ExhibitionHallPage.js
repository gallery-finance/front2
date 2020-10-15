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
        <div className="exhibition-hall__body">
            <h1 className="h1">Experience is more important than money</h1>

            <ol>
                <li>
                    If you just want to display your art and let people enjoy, here
                    is the place.
                </li>

                <li>
                    You can display your art, and write your story and the thoughts
                    of your arts.
                </li>

                <li>You can also choose to store it on a decentralized network.</li>
            </ol>

            <div className="exhibition-hall__btn">
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
