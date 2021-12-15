import {useSnackbar} from "notistack";
import PropTypes from "prop-types";
import React from "react";

import classes from "./index.module.scss";

function BaseIcon(props) {
	let color = props.color,
		_ref$pushRight = props.pushRight,
		pushRight = _ref$pushRight === undefined ? true : _ref$pushRight,
		children = props.children;
	return React.createElement(
		"svg",
		{
			fill: "none",
			height: "24",
			stroke: color,
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: "2",
			style: {marginRight: pushRight ? "20px" : "0", minWidth: 24},
			viewBox: "0 0 24 24",
			width: "24",
			xmlns: "http://www.w3.org/2000/svg",
		},
		children,
	);
}

function InfoIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#2E9AFE"},
		React.createElement("circle", {cx: "12", cy: "12", r: "10"}),
		React.createElement("line", {x1: "12", y1: "16", x2: "12", y2: "12"}),
		React.createElement("line", {x1: "12", y1: "8", x2: "12", y2: "8"}),
	);
}

function SuccessIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#31B404"},
		React.createElement("path", {d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"}),
		React.createElement("polyline", {points: "22 4 12 14.01 9 11.01"}),
	);
}

function ErrorIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#FF0040"},
		React.createElement("circle", {cx: "12", cy: "12", r: "10"}),
		React.createElement("line", {x1: "12", y1: "8", x2: "12", y2: "12"}),
		React.createElement("line", {x1: "12", y1: "16", x2: "12", y2: "16"}),
	);
}

function CloseIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#000000", pushRight: false},
		React.createElement("line", {x1: "18", y1: "6", x2: "6", y2: "18"}),
		React.createElement("line", {x1: "6", y1: "6", x2: "18", y2: "18"}),
	);
}

function Alert(props, ref) {
	const {closeSnackbar} = useSnackbar();
	const {id, message, type, ...rest} = props;

	return (
		<div className={classes.alert__box} {...rest} ref={ref}>
			{type === "info" && <InfoIcon />}
			{type === "error" && <ErrorIcon />}
			{type === "success" && <SuccessIcon />}
			<span className={classes.alert__span}>{message || ""}</span>
			<button
				onClick={() => closeSnackbar(id)}
				className={classes.alert__button}
			>
				<CloseIcon />
			</button>
		</div>
	);
}

Alert.propTypes = {
	id: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["info", "error", "success"]).isRequired,
};

export default React.forwardRef(Alert);
