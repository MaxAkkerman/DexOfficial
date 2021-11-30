const path = require("path");
const {merge} = require("webpack-merge");

module.exports = {
	stories: ["../src/components-v2/**/*.stories.js", "../src/components/**/*.stories.js"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-scss",
	],
	core: {
		builder: "webpack5",
	},
	webpackFinal: async (config) => {
		return merge(config, {
			resolve: {
				alias: {
					"@emotion/core": getPackageDir("@emotion/react"),
					"@emotion/styled": getPackageDir("@emotion/styled"),
					"emotion-theming": getPackageDir("@emotion/react"),
					"@": path.resolve(__dirname, "../src/"),
				},
			},
		});
	},
};

function getPackageDir(package) {
	return path.dirname(require.resolve(path.join(package, "package.json")));
}
