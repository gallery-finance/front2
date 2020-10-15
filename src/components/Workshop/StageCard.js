import React from "react";
import { Link } from "react-router-dom";

export const StageCard = ({
    number,
    stageText,
    title,
    timeIn,
    status,
    description
}) => {
    return (
        <div className="workshop-cards__item">
            <div className="workshop-cards__number">{number}</div>
            <h2 className="workshop-cards__title">{stageText}</h2>
            <p className="workshop-cards__name">
                <span>{title}</span>
            </p>
            <hr />
            <dl className="workshop-cards__dl">
                <div className="workshop-cards__dl-row">
                    <dt className="workshop-cards__dl-dt">Time in</dt>
                    <dd className="workshop-cards__dl-dd">{timeIn}</dd>
                </div>
                <div className="workshop-cards__dl-row">
                    <dt className="workshop-cards__dl-dt">Status</dt>
                    <dd className="workshop-cards__dl-dd workshop-cards__dl-dd--green">
                        {status}
                    </dd>
                </div>
            </dl>
            <hr />
            <p className="workshop-cards__text">{description}</p>
            <Link to="/" className="workshop-cards__btn btn">
                Join
            </Link>
        </div>
    );
};
