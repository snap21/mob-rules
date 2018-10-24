import MobRulesFactory from './MobRulesFactory';
import MobRules from './MobRules';

test('make', () => {
    const original = {};
    const rules = {};
    const factory = new MobRulesFactory;
    const mobRules = factory.make(original, rules);
    expect(typeof mobRules).toBe('object');
});
