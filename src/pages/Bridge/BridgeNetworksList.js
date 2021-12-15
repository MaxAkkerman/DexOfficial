import React, {useEffect, useRef, useState} from "react";
import {Grid} from "@material-ui/core";
import "./Bridge.scss";
import bnb from "../../images/bridgeNets/bnb.png";
import eth from "../../images/tokens/wETH.svg";
import sendAssetsimg from "../../images/sendAssets.svg";
import receiveAssets from "../../images/receiveAssets.svg";
import goToExchange from "../../images/goToExchange.svg";
import {useSelector} from "react-redux";

const nets = [{netName:"bnb", img:bnb},{netName:"eth", img:eth}]

function BridgeNetworksList() {

    return (

        <Grid className="bridge_netItems_container">


            {nets.map(item=>{

                return <Grid className="bridge_net_item">
                    <Grid>
                        <img className="arrowRightSt" src={item.img} alt=""/>
                    </Grid>
                    <Grid className="bridge_text_wrap">{item.netName}
                    </Grid>
                </Grid>

            })}


        </Grid>
    );
}

export default BridgeNetworksList;
