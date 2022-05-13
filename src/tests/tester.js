const { transform } = require('@babel/core');
const syntaxJSX = require('@babel/plugin-syntax-jsx');
const plugin = require('../index');

/**
 * @param {string} inputCode
 * @returns
 */
function testPlugin(inputCode) {
	return transform(inputCode, {
		plugins: [syntaxJSX, plugin],
	}).code;
}

module.exports = {
	testPlugin,
};
