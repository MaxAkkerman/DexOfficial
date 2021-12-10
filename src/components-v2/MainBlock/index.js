import "./index.scss";

import cls from "classnames";
import PropTypes from "prop-types";
import React from "react";

function MainBlock(
	{
		button,
		class: className,
		classHeader,
		classTitle,
		content,
		footer,
		normalTitle,
		smallTitle,
		title,
		...rest
	},
	ref,
) {
	return (
		<div className={cls("mainblock", className)} ref={ref} {...rest}>
			{(title || button) && (
				<div className={cls("mainblock-header", classHeader)}>
					<h2
						className={cls("mainblock-title", classTitle, {
							"mainblock-title--normal": normalTitle,
							"mainblock-title--small": smallTitle,
						})}
					>
						{title}
					</h2>
					{button}
				</div>
			)}
			{content}
			{footer}
		</div>
	);
}

MainBlock.propTypes = {
	button: PropTypes.element,
	class: PropTypes.string,
	classHeader: PropTypes.string,
	classTitle: PropTypes.string,
	content: PropTypes.element.isRequired,
	footer: PropTypes.element,
	normalTitle: PropTypes.string,
	smallTitle: PropTypes.string,
	title: PropTypes.string,
};

MainBlock.defaultProps = {
	button: null,
	class: null,
	classHeader: null,
	classTitle: null,
	footer: null,
	normalTitle: null,
	smallTitle: null,
	title: null,
};

export default React.forwardRef(MainBlock);
