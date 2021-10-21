import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {
    Box,
    Grid,
    TextField,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";

function PasswordEnterPopup(props) {
    const history = useHistory();
    const dispatch = useDispatch();
console.log("PasswordEnterPopup")
    return (

        <Grid
            container
            spacing={3}
            sx={{
                justifyContent: "center",
                width: "100%",
                margin: 0,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "24px",
                }}
            >
                <TextField
                    label="Decryption password"
                    error={!props.validPassword}
                    sx={{width: "100%"}}
                    placeholder={
                        "Your password"
                    }
                    type="password"
                    inputProps={{style: {color: "var(--primary-color)"}}}
                    onChange={props.passwordChange}
                    inputRef={(input) => {
                        if (input != null) {
                            input.focus();
                        }
                    }}
                    value={props.seedPhrasePassword}
                    onKeyDown={props.enterClick}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "24px",
                }}
            >
                <button
                    style={{fontSize: "18px"}}
                    onClick={props.goIntoApp}
                    className="btn wallet-btn"
                >
                    {props.submitText}
                </button>
                {props.cancelText ? <button
                    style={{fontSize: "18px", marginLeft:"10px"}}
                    onClick={props.handleBack}
                    className="btn wallet-btn"
                >
                    {props.cancelText}
                </button>
                    : null
                }
            </Box>
        </Grid>
    )
}

export default PasswordEnterPopup;
