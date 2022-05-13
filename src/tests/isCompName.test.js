const { isCompName } = require('../index');

test('isCompName', () => {
	expect(isCompName('Foo')).toBe(true);
	expect(isCompName('foo')).toBe(false);
});
