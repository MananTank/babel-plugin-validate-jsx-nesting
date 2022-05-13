const { testPlugin, testPluginWarnOnly } = require('./tester');

// validation logic is tested in `validate-html-nesting` package

test('elements are tested', () => {
	expect(() => testPlugin('<form> <form> </form> </form>')).toThrowError(
		'<form> can not be child of <form>'
	);

	expect(() => testPlugin('<p> <hr/> </p>')).toThrowError('<hr> can not be child of <p>');
	expect(() => testPlugin('<p> <a> </a> </p>')).not.toThrow();
});

test('components are ignored', () => {
	expect(() => testPlugin('<Form> <form> </form> </Form>')).not.toThrow();
	expect(() => testPlugin('<Foo.bar> <form> </form> </Foo.bar>')).not.toThrow();
});

test('warn only mode', () => {
	jest.spyOn(console, 'warn').mockImplementation();

	expect(() => testPluginWarnOnly('<form> <form> </form> </form>')).not.toThrow();

	expect(console.warn).toHaveBeenCalledWith(
		expect.stringContaining('<form> can not be child of <form>')
	);
});
