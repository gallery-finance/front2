import React from "react";
import { Link } from "react-router-dom";

import { StageCard } from "../components/Workshop";

import image1 from "../assets/img/workshop/first-workshop.webp";
import image2 from "../assets/img/workshop/first-workshop@2x.webp";
import image3 from "../assets/img/workshop/first-workshop.png";
import image4 from "../assets/img/workshop/first-workshop@2x.png";
import image5 from "../assets/img/workshop/first-workshop.png";

export const WorkshopPage = () => {
    return (
        <article className="center">
            <header className="workshop-head">
                <h1 className="workshop-head__title h1">The first workshop</h1>

                <p className="workshop-head__right">
                    <Link to="/" className="workshop-head__btn">
                        Propose A New&nbsp;&nbsp;Workshop
                    </Link>
                </p>
            </header>

            <div className="workshop-info">
                <dl className="workshop-info__dl">
                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Theme:</dt>

                        <dd className="workshop-info__dl-dd">
                            Arts of the 10 community most-wanted figures
                        </dd>
                    </div>

                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Date:</dt>

                        <dd className="workshop-info__dl-dd">
                            00/00/2020 - 00/00/2020
                        </dd>
                    </div>

                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Participants:</dt>

                        <dd className="workshop-info__dl-dd">GLF token holders</dd>
                    </div>

                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Workshop Prize:</dt>

                        <dd className="workshop-info__dl-dd">
                            14000 GLF tokens + NFT mining
                        </dd>
                    </div>
                </dl>

                <picture>
                    <source
                        srcSet={`${image1} 1x, ${image2} 2x`}
                        type="image/webp"
                    />
                    <source srcSet={`${image3} 1x, ${image4} 2x`} />

                    <img
                        className="workshop-info__img"
                        src={image5}
                        width="300"
                        height="168"
                        loading="lazy"
                        alt="First workshop"
                    />
                </picture>
            </div>

            <div className="workshop-cards">
                <div className="workshop-cards__list">
                    <StageCard
                        number={1}
                        stageText="Stage One"
                        title={
                            <>
                                Voting for the 10{" "}
                                <span className="white-space-nowrap">
                                    most-wanted
                                </span>{" "}
                                figures
                            </>
                        }
                        timeIn="00/00/20 - 00/00/20"
                        status="Ongoing"
                        description={
                            <>
                                You can propose a figure or you can vote for a figure
                                in the voting board. The top 10 figures that get most
                                votes will be selected to next stage. You need to
                                stake your GLF tokens for votes. Voters for the final
                                figures will together share 4000 GLF token rewards.{" "}
                                <Link to="/">Read details</Link>
                            </>
                        }
                    />
                    <StageCard
                        number={2}
                        stageText="Stage Two"
                        title="Voting for the Artwork"
                        timeIn="00/00/20 - 00/00/20"
                        status="Ongoing"
                        description={
                            <>
                                Artists can draw and submit their artworks those 10
                                figures, others can vote for the artwork they would
                                love. TOP3 mostly-voted arts for each figure will be
                                selected to next stage: their author and voters will
                                share 10,000 GLF tokens.{" "}
                                <Link to="/">Read details</Link>
                            </>
                        }
                        disabled
                    />
                    <StageCard
                        number={3}
                        stageText="Stage Three"
                        title="NFT mining"
                        timeIn="00/00/20 - 00/00/20"
                        status="Ongoing"
                        description="Selected artworks will be made into NFTs for GLF token holders to mine. GLF token holders can stake and earn reward points. You can use your reward points to redeem NFT artworks. Then you redeemed NFT will be in your wallet for collecting or auctioning."
                        disabled
                    />
                </div>
            </div>
        </article>
    );
};
