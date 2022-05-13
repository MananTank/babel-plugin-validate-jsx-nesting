const { isValidHTMLNesting } = require('validate-html-nesting');

/** @typedef {{ warnOnly: boolean} | undefined} PluginOptions */

/**
 * returns true if the tag is component's name
 * @param {string} tag
 * @returns
 */

function isCompName(tag) {
	return tag[0] !== tag[0].toUpperCase();
}

/**
 * jsx nesting validator plugin
 * @param {import('@babel/core')} babel
 */
module.exports = function (babel) {
	const { types: t } = babel;

	/**
	 * @type {import('@babel/core').Visitor<{}>} path
	 */
	const domValidator = {
		JSXElement(path, state) {
			const elName = path.node.openingElement.name;
			if (t.isJSXIdentifier(elName)) {
				const elTagName = elName.name;
				// if not a component
				if (isCompName(elTagName)) {
					const parent = path.parent;
					if (t.isJSXElement(parent)) {
						const parentElName = parent.openingElement.name;
						if (t.isJSXIdentifier(parentElName)) {
							const parentElTagName = parentElName.name;
							// if parent is not a component
							if (isCompName(parentElTagName)) {
								if (!isValidHTMLNesting(parentElName.name, elName.name)) {
									const pluginOptions = /** @type {PluginOptions} */ (state);

									const error = path.buildCodeFrameError(
										`Invalid HTML nesting: <${elName.name}> can not be child of <${parentElName.name}>`
									);

									if (pluginOptions && pluginOptions.warnOnly) {
										console.warn(error.message);
									} else {
										throw error;
									}
								}
							}
						}
					}
				}
			}
		},
	};

	return {
		name: 'validate-jsx-nesting', // not required
		visitor: domValidator,
	};
};
