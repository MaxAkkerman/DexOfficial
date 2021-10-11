import {SvgIcon} from "@mui/material";

import SvgCopy from "!@svgr/webpack!../../images/icons/copyNew.svg";

export default function IconEdit(props) {
	return (
		<SvgIcon
			component={SvgCopy}
			viewBox="0 0 14 14"
			sx={{display: "block"}}
			{...props}
		/>
	);
}
