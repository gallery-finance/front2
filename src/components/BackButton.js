import React from "react";
import { Link } from "react-router-dom";

import { ArrowBackIcon } from "../icons";

export const BackButton = () => (
    <div className="arrow-back">
        <Link to="/pools">
            <ArrowBackIcon /> Back
        </Link>
    </div>
);
