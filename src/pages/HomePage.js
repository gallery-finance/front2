import React from "react";
import { Link } from "react-router-dom";

import imageHead1 from "../assets/img/home/header/img--320x240.98581828.webp";
import imageHead2 from "../assets/img/home/header/img--320x240.9b29229b.jpg";
import imageHead3 from "../assets/img/home/header/img--1456x800.de4ea038.webp";
import imageHead4 from "../assets/img/home/header/img--728x400.037e419c.jpg";
import imageHead5 from "../assets/img/home/header/img--1380x623.10a4f1a1.webp";
import imageHead6 from "../assets/img/home/header/img--2760x1246.6d1ff26d.webp";
import imageHead7 from "../assets/img/home/header/img--1380x623.67d85562.jpg";
import imageHead8 from "../assets/img/home/header/img--1456x800.58c248ea.jpg";
import imageHead9 from "../assets/img/home/header/img--2760x1246.1b689d0a.jpg";
import imageHead10 from "../assets/img/home/header/img--728x400.527e4fad.webp";

import image1 from "../assets/img/home/img.webp";
import image2 from "../assets/img/home/img@2x.webp";
import image3 from "../assets/img/home/img.png";
import image4 from "../assets/img/home/img@2x.png";

export const HomePage = () => (
    <div className="wrapper__container">
        <div>
            <aside className="billboard">
                <div className="center">
                    <div className="billboard__box">
                        <div className="billboard__content">
                            <h1 className="billboard__title h1">
                                <span className="text-uppercase h1-main">
                                    Gallery Finance
                                </span>
                                <br />
                                <span className="billboard__subtitle">
                                    Where your{" "}
                                    <span className="gold-color">ideas</span> become{" "}
                                    <span className="gold-color">art</span>
                                </span>
                            </h1>
                            <a
                                href="https://t.me/gallery_finance"
                                target="_blank"
                                className="btn btn--medium d-inline-block billboard__button"
                            >
                                Join early adopters
                            </a>
                        </div>
                        <picture>
                            <source
                                srcSet={`${imageHead1} 1x, ${imageHead1} 2x`}
                                type="image/webp"
                                media="(max-width: 360px)"
                            />
                            <source
                                srcSet={`${imageHead2} 1x, ${imageHead2} 2x`}
                                media="(max-width: 360px)"
                            />
                            <source
                                srcSet={`${imageHead10} 1x, ${imageHead3} 2x`}
                                type="image/webp"
                                media="(max-width: 768px)"
                            />
                            <source
                                srcSet={`${imageHead4} 1x, ${imageHead8} 2x`}
                                media="(max-width: 768px)"
                            />
                            <source
                                srcSet={`${imageHead5} 1x, ${imageHead6} 2x`}
                                type="image/webp"
                            />
                            <source srcSet={`${imageHead7} 1x, ${imageHead9} 2x`} />
                            <img
                                src={imageHead7}
                                width="1380"
                                height="623"
                                loading="lazy"
                                alt=""
                                className="billboard__img"
                            />
                        </picture>
                    </div>
                </div>
            </aside>
            <aside className="home-service">
                <div className="center">
                    <ul className="home-service__list">
                        <li className="home-service__item">
                            <a href="/workshop" className="home-service__ico">
                                <svg width="36" height="36" viewBox="0 0 36 36">
                                    <path d="M17.25 27.38h-.23c-2.87 0-5.42-2.52-5.74-5.52C9.96 21.4 9 19.8 9 18.38v-1.5c0-.98.63-1.82 1.5-2.13v-1.93c0-2.59 1.45-4.35 3.62-4.42l1.27-.46c1.58-.6 3.22-1.22 4.7-1.22 2.6 0 3.91 1.9 3.91 5.66v2.54c.6.34 1.5 1.02 1.5 1.96v1.5a4.01 4.01 0 01-2.5 3.48c-.33 3-2.87 5.52-5.75 5.52zm2.84-19.16c-1.2 0-2.72.57-4.18 1.12l-1.42.52a.73.73 0 01-.24.04C12.59 9.9 12 11.4 12 12.82v2.55c0 .41-.34.75-.75.75a.75.75 0 00-.75.75v1.5c0 .9.74 2.1 1.5 2.1.41 0 .75.34.75.75 0 2.48 2 4.65 4.27 4.65h.23c2.28 0 4.27-2.17 4.27-4.65 0-.41.34-.75.75-.75.76 0 1.73-1.18 1.73-2.1v-1.5c-.03-.18-.58-.6-1.06-.81a.75.75 0 01-.44-.69v-3c0-4.15-1.7-4.15-2.41-4.15z"></path>
                                    <path d="M30.07 34.88H4.5a.75.75 0 01-.75-.76 8.1 8.1 0 018.32-8.24.75.75 0 010 1.5c-3.7 0-6.44 2.48-6.78 6h24c-.35-3.52-3.1-6-6.79-6a.75.75 0 010-1.5 8.1 8.1 0 018.32 8.25c0 .4-.34.74-.75.74zM.75 16.12a.75.75 0 01-.75-.75 4.5 4.5 0 014.5-4.5.75.75 0 010 1.5 3 3 0 00-3 3c0 .42-.34.75-.75.75zM35.25 16.12a.75.75 0 01-.75-.75 3 3 0 00-3-3 .75.75 0 010-1.5 4.5 4.5 0 014.5 4.5c0 .42-.34.75-.75.75z"></path>
                                    <path d="M17.25 27.38h-.23c-2.87 0-5.42-2.52-5.74-5.52C9.96 21.4 9 19.8 9 18.38v-1.5c0-.98.63-1.82 1.5-2.13v-1.93c0-2.59 1.45-4.35 3.62-4.42l1.27-.46c1.58-.6 3.22-1.22 4.7-1.22 2.6 0 3.91 1.9 3.91 5.66v2.54c.6.34 1.5 1.02 1.5 1.96v1.5a4.01 4.01 0 01-2.5 3.48c-.33 3-2.87 5.52-5.75 5.52zm2.84-19.16c-1.2 0-2.72.57-4.18 1.12l-1.42.52a.73.73 0 01-.24.04C12.59 9.9 12 11.4 12 12.82v2.55c0 .41-.34.75-.75.75a.75.75 0 00-.75.75v1.5c0 .9.74 2.1 1.5 2.1.41 0 .75.34.75.75 0 2.48 2 4.65 4.27 4.65h.23c2.28 0 4.27-2.17 4.27-4.65 0-.41.34-.75.75-.75.76 0 1.73-1.18 1.73-2.1v-1.5c-.03-.18-.58-.6-1.06-.81a.75.75 0 01-.44-.69v-3c0-4.15-1.7-4.15-2.41-4.15z"></path>
                                    <path d="M30.07 34.88H4.5a.75.75 0 01-.75-.76 8.1 8.1 0 018.32-8.24.75.75 0 010 1.5c-3.7 0-6.44 2.48-6.78 6h24c-.35-3.52-3.1-6-6.79-6a.75.75 0 010-1.5 8.1 8.1 0 018.32 8.25c0 .4-.34.74-.75.74zM.75 16.12a.75.75 0 01-.75-.75 4.5 4.5 0 014.5-4.5.75.75 0 010 1.5 3 3 0 00-3 3c0 .42-.34.75-.75.75zM35.25 16.12a.75.75 0 01-.75-.75 3 3 0 00-3-3 .75.75 0 010-1.5 4.5 4.5 0 014.5 4.5c0 .42-.34.75-.75.75zM7.5 11.63c-2.42 0-3.75-5.08-3.75-6.76a3.75 3.75 0 017.5 0c0 1.68-1.33 6.75-3.75 6.75zm0-9a2.25 2.25 0 00-2.25 2.25c0 1.76 1.37 5.25 2.25 5.25.88 0 2.25-3.5 2.25-5.26 0-1.24-1-2.25-2.25-2.25zM28.5 11.63c-2.42 0-3.75-5.08-3.75-6.76a3.75 3.75 0 017.5 0c0 1.68-1.33 6.75-3.75 6.75zm0-9a2.25 2.25 0 00-2.25 2.25c0 1.76 1.37 5.25 2.25 5.25.88 0 2.25-3.5 2.25-5.26 0-1.24-1-2.25-2.25-2.25z"></path>
                                </svg>
                            </a>
                            <h2 className="home-service__title h4">
                                Custom art workshop
                            </h2>
                            <p className="home-service__text">
                                Propose contest themes for artists and vote for the
                                art you want to see created.
                            </p>
                        </li>
                        <li className="home-service__item">
                            <a href="/exhibition-hall" className="home-service__ico">
                                <svg width="36" height="36" viewBox="0 0 36 36">
                                    <path d="M21.75 30h-7.5a.75.75 0 01-.75-.75V22.5c0-.41.34-.75.75-.75s.75.34.75.75v6h6v-6c0-.41.34-.75.75-.75s.75.34.75.75v6.75c0 .41-.34.75-.75.75z"></path>
                                    <path d="M18 33.75a4.5 4.5 0 01-4.5-4.5c0-.41.34-.75.75-.75s.75.34.75.75a3 3 0 006 0c0-.41.34-.75.75-.75s.75.34.75.75a4.5 4.5 0 01-4.5 4.5zM10.5 5.25a.75.75 0 01-.53-.22l-1.5-1.5a.75.75 0 011.06-1.06l1.5 1.5a.75.75 0 01-.53 1.28zM25.5 5.25a.75.75 0 01-.53-1.28l1.5-1.5c.29-.29.77-.29 1.06 0 .29.3.29.77 0 1.06l-1.5 1.5a.75.75 0 01-.53.22zM9 23.25a.75.75 0 01-.53-1.28l1.5-1.5c.29-.29.77-.29 1.06 0 .29.3.29.77 0 1.06l-1.5 1.5a.75.75 0 01-.53.22zM27 23.25a.75.75 0 01-.53-.22l-1.5-1.5a.75.75 0 011.06-1.06l1.5 1.5a.75.75 0 01-.53 1.28zM6 13.5H4.5a.75.75 0 01-.75-.75c0-.41.34-.75.75-.75H6a.75.75 0 010 1.5zM31.5 13.5H30a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM21.75 24h-7.5a.75.75 0 01-.75-.75v-1.88a9.59 9.59 0 01-5.25-8.62 9.7 9.7 0 012.86-6.9A9.69 9.69 0 0118 3c2.6 0 5.05 1.01 6.9 2.85a9.69 9.69 0 012.85 6.9 9.7 9.7 0 01-5.25 8.62v1.88c0 .41-.34.75-.75.75zM15 22.5h6v-1.6c0-.29.17-.56.44-.68a8.2 8.2 0 004.81-7.47 8.2 8.2 0 00-2.42-5.83A8.2 8.2 0 0018 4.5a8.2 8.2 0 00-5.83 2.41 8.2 8.2 0 00-2.42 5.84 8.2 8.2 0 004.81 7.47c.27.12.44.39.44.68v1.6z"></path>
                                    <path d="M13.76 17.74a.76.76 0 01-.53-.22 6.71 6.71 0 010-9.55.75.75 0 011.06 1.06 5.21 5.21 0 000 7.43.75.75 0 01-.53 1.28zM21.75 27.66a.78.78 0 01-.33-.08l-7.5-3.66a.75.75 0 11.66-1.35l7.5 3.66c.37.18.53.63.34 1a.75.75 0 01-.67.43zM20.4 30a.8.8 0 01-.32-.08l-6.16-3a.75.75 0 01-.34-1 .75.75 0 011-.34l6.15 3a.75.75 0 01-.32 1.42z"></path>
                                </svg>
                            </a>
                            <h2 className="home-service__title h4">
                                Exhibition hall
                            </h2>
                            <p className="home-service__text">
                                Showcase your art and engage with the community.
                            </p>
                        </li>
                        <li className="home-service__item">
                            <a href="/auction" className="home-service__ico">
                                <svg width="36" height="36" viewBox="0 0 36 36">
                                    <path d="M27 19.75a.75.75 0 01-.75-.75v-1.13c0-.4.34-.75.75-.75s.75.34.75.75V19c0 .41-.34.75-.75.75zM27 11.88a.75.75 0 01-.75-.76V10c0-.41.34-.75.75-.75s.75.34.75.75v1.13c0 .4-.34.74-.75.74zM31.5 15.25h-1.13a.75.75 0 01-.75-.75c0-.41.34-.75.75-.75h1.13c.41 0 .75.34.75.75s-.34.75-.75.75zM23.63 15.25H22.5a.75.75 0 01-.75-.75c0-.41.34-.75.75-.75h1.13c.4 0 .75.34.75.75s-.34.75-.75.75zM30.18 18.43a.75.75 0 01-.53-.22l-.8-.8a.75.75 0 011.06-1.06l.8.8c.3.3.3.77 0 1.06a.75.75 0 01-.53.22zM24.62 12.87a.76.76 0 01-.53-.22l-.8-.8a.75.75 0 010-1.06.76.76 0 011.06 0l.8.8a.75.75 0 01-.53 1.28zM29.39 12.86a.75.75 0 01-.53-1.28l.8-.8a.75.75 0 011.06 1.06l-.8.8a.75.75 0 01-.53.22zM23.82 18.43a.75.75 0 01-.53-.22.75.75 0 010-1.06l.8-.8a.75.75 0 011.05 1.07l-.8.8a.75.75 0 01-.52.21z"></path>
                                    <path d="M27 18.63a4.13 4.13 0 110-8.26 4.13 4.13 0 010 8.26zm0-6.75a2.63 2.63 0 100 5.25 2.63 2.63 0 000-5.25z"></path>
                                    <path d="M35.25 25H.75a.75.75 0 01-.75-.75V4.75C0 4.34.34 4 .75 4h34.5c.41 0 .75.34.75.75v19.5c0 .41-.34.75-.75.75zM1.5 23.5h33v-18h-33v18z"></path>
                                    <path d="M27 32.5H9A.75.75 0 019 31h1.66a2.85 2.85 0 002.84-2.84V25a.75.75 0 011.5 0v3.16c0 1.09-.4 2.08-1.06 2.84h8.44A3.9 3.9 0 0121 28.16V25a.75.75 0 011.5 0v3.16c0 1.53 1.98 2.84 3.6 2.84h.9c.41 0 .75.34.75.75s-.34.75-.75.75zM6.75 21.25A.75.75 0 016 20.5v-3a.75.75 0 011.5 0v3c0 .41-.34.75-.75.75zM9.75 21.25A.75.75 0 019 20.5V10a.75.75 0 011.5 0v10.5c0 .41-.34.75-.75.75zM12.75 21.25a.75.75 0 01-.75-.75v-6a.75.75 0 011.5 0v6c0 .41-.34.75-.75.75zM15.75 21.25a.75.75 0 01-.75-.75V13a.75.75 0 011.5 0v7.5c0 .41-.34.75-.75.75zM18.75 21.25a.75.75 0 01-.75-.75v-12a.75.75 0 011.5 0v12c0 .41-.34.75-.75.75z"></path>
                                </svg>
                            </a>
                            <h2 className="home-service__title h4">
                                Auction platform
                            </h2>
                            <p className="home-service__text">
                                Earn rewards on every sale of your artwork.
                            </p>
                        </li>
                    </ul>
                </div>
            </aside>
            <aside className="home-cards">
                <div className="center">
                    <div className="home-cards__box">
                        <div className="home-cards__item home-cards__token">
                            <h2 className="h3"> GLF token distribution </h2>
                            <p>
                                GLF is our native token. It's a purely community
                                asset used for most internal operations, like voting
                                and art submission. You can farm free GLF tokens
                                through liquidity mining.
                            </p>
                            <div className="home-cards__btn">
                                <Link to='/pools' type="button" className="btn btn--medium">
                                    Earn free tokens
                                </Link>
                            </div>
                        </div>
                        <div className="home-cards__item home-cards__first-workshop">
                            <h2 className="h3"> First workshop </h2>
                            <p>
                                Our first themed contest is upcoming! The rules are
                                simple: the community picks 10 most interesting
                                characters, the artists have a go at drawing them.
                            </p>
                            <div className="home-cards__btn">
                                <Link to="/workshop" className="btn btn--medium">
                                    Check Out
                                </Link>
                            </div>
                            <picture>
                                <source
                                    srcSet={`${image1} 1x, ${image2} 2x`}
                                    type="image/webp"
                                />
                                <source srcSet={`${image3} 1x, ${image4} 2x`} />
                                <img
                                    src={image3}
                                    width="202"
                                    height="240"
                                    loading="lazy"
                                    alt="First workshop"
                                    className="home-cards__img"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
);
