import React, {useEffect, useRef, useState} from "react";
import {Grid} from "@material-ui/core";
import "./Bridge.scss";
import MainBlock from "../../components/MainBlock/MainBlock";
import BridgeNetworksList from "./BridgeNetworksList";
import AssetsList from "../../components/AssetsList/AssetsList";
import {NextBtn} from "../../components/LoginViaPIN/NextBtn";
import {useSelector} from "react-redux";
import sendAssetsimg from "../../images/sendAssets.svg";
import {GraphQLIncludeDirective} from "graphql";


// function Bridge() {
//
//     return (
//         <Grid className="container">
//
//             <Grid className="netContainer">
//                 <Grid className="mainblock addToMain">
//
//
//                     <Grid className="bridge_title_wrapper">
//                         Network bridge
//                     </Grid>
//                 </Grid>
//
//             </Grid>
//
//         </Grid>
//     );
// }
//
// export default Bridge;


function Bridge() {
    const walletIsConnected = useSelector((state) => state.appReducer.walletIsConnected);

    return (


        <div className="container">
            <MainBlock
                smallTitle={false}
                // title={'Assets'}
                content={
                    <div>

                        <div className="head_wrapper">
                            <div className="left_block boldFont">Bridge</div>
                        </div>

                        <Grid className="bridge_netSelector_wrapper">
                            <Grid>
                                Binance > Ethereum
                            </Grid>
                            <button className="btn input-btn" style={{fontSize:"12px", borderRadius:"13px"}}>
                                Network
                                <svg
                                    width="12"
                                    height="8"
                                    viewBox="0 0 16 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM15.0607 3.06066C15.6464 2.47487 15.6464 1.52513 15.0607 0.93934C14.4749 0.353553 13.5251 0.353553 12.9393 0.93934L15.0607 3.06066ZM0.93934 3.06066L6.93934 9.06066L9.06066 6.93934L3.06066 0.93934L0.93934 3.06066ZM9.06066 9.06066L15.0607 3.06066L12.9393 0.93934L6.93934 6.93934L9.06066 9.06066Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>

                        </Grid>


                        <BridgeNetworksList/>

                        <NextBtn
                            curBtnStyles={"curBtnStyles"}
                            btnsClass={"enterSPRegBox"}
                            btnText={"Next"}
                            errColor={null}
                            handleClickNext={null}
                        />
                    </div>
                }
            />
        </div>

    );
}

export default Bridge;
