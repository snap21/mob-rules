import ValidatorFactory from './ValidatorFactory';

test('make', () => {
    const data = {};
    const rules = {};
    const factory = new ValidatorFactory;
    const validator = factory.make(data, rules);
    expect(typeof validator).toBe('object');
});
