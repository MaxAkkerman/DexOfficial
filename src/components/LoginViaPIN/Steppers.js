import {Box} from "@material-ui/core";
import React, {memo} from "react";

function Steppers(props) {
    return <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: `${props.step === "1" || props.step === "4" ? "211px" : "140px"}`,
        }}
    >
        Step {props.step}/4
    </Box>
}
export default memo(Steppers)
