import React, {useEffect, useRef, useState} from "react";
import {GraphQLIncludeDirective} from "graphql";
import {Grid} from "@material-ui/core";
import arrowRight from "../../images/icons/arrowRight.png";
import "./Bridge.scss";


function Bridge() {

    return (
        <Grid className="container">
            <Grid className="bridge_title_wrapper">
                Network bridge
            </Grid>
            <Grid className="netContainer">
                <Grid className="mainblock addToMain">
                </Grid>

                <img className="arrowRightSt" src={arrowRight} alt="" />

                <Grid className="mainblock addToMain">
                </Grid>
            </Grid>

        </Grid>
    );
}

export default Bridge;
