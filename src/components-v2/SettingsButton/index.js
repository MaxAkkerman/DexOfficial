import cls from "classnames";
import PropTypes from "prop-types";
import React from "react";

import settingsBtn from "@/images/Vector.svg";

import classes from "./index.module.scss";

export default function SettingsButton({disabled, onClick, ...rest}) {
	return (
		<button
			className={cls(classes.btn, {"btn--disabled": disabled})}
			onClick={onClick}
			aria-describedby={rest["aria-describedby"]}
		>
			<img src={settingsBtn} alt={"settings"} />
		</button>
	);
}

SettingsButton.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	"aria-describedby": PropTypes.string,
};

SettingsButton.defaultProps = {
	disabled: false,
	onClick: () => {},
	"aria-describedby": null,
};
