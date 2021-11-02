import React, {useEffect, useState} from "react";
import {batch, useDispatch, useSelector} from "react-redux";
import MainBlock from "../MainBlock/MainBlock";
import "./PinPopup.scss"

import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Grid, TextField,
} from "@material-ui/core";

import {useHistory} from "react-router-dom";
import {numPadArr, pincodeArray} from "../../constants/defaultData";
import Button from "@material-ui/core/Button";


function LoginViaPin(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [pinArr, setPinArr] = useState(pincodeArray)

    return (
        <div className="select-wrapper">
            {/*{true ?*/}
            {/*    <WaitingPopup*/}
            {/*        title={"Connecting to blockchain"}*/}
            {/*        text={`Loading user data...`}*/}
            {/*        hide={true}*/}
            {/*    />*/}
            {/*    :*/}
            <MainBlock
                title={props.title ? props.title : "default"}
                classHeader={"fixFontSize"}
                classTitle={"fixFontSize"}
                content={

                    <>
                        <Grid className="numsInputContainer">

                                {pinArr.map(item => {
                                    return <TextField
                                        // size={"small"}
                                        style={{width: "50px", height:"50px"}}
                                        error={item.error}
                                        id="standard-basic"
                                        value={item.value}
                                        label=""
                                        variant="standard"
                                        onChange={() => console.log("ONCHANGE")}
                                    />
                                })
                                }
                        </Grid>
                        <Grid className="gridContainer" sx={{justifyContent: "center"}}>

                            {numPadArr.map(item => {
                                return <div style={{margin:"auto",marginTop: "20px"}}>
                                <Button
                                    className="gridItem"
                                    variant="outlined"
                                    // style={{width: "40px"}}
                                    // value={item.value}
                                    onClick={() => console.log("onClick")}
                                >{item.value}</Button>
                                </div>
                            })
                            }
                        </Grid>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "24px",
                            }}
                        >
                            <Alert severity={"warning"} sx={{width: "100%"}}>
                                <AlertTitle>Important information</AlertTitle>
                                It is very important to keep the seed phrase. It cannot be
                                restored. The DefiSpace service does not store the seed
                                phrase, and will not be able to help if it is lost.
                                Remember this.
                            </Alert>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "24px",
                            }}
                        >
                            <Grid container className={"enterSPRegBox"} spacing={2}>
                                <Grid item>
                                    <button
                                        style={{fontSize: "16px"}}
                                        onClick={() => console.log("ONCLICK")}
                                        className="btn wallet-btn"
                                    >
                                        NEXT
                                    </button>
                                </Grid>

                            </Grid>
                        </Box>
                    </>

                }
            />
            {/*}*/}
        </div>
    )
}

export default LoginViaPin;
