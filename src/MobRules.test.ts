import MobRules from './MobRules';
import ValidatorFactory from './ValidatorFactory';

test('length error', () => {
    const original = {name: 'foo'};
    const rules = {name: 'min:5'};
    const mobRules = new MobRules(original, rules, new ValidatorFactory);
    mobRules.validateInit();

    // async, so wait for errors to surface
    expect(mobRules.hasVisibleErrors()).toBe(true);
    expect(mobRules.getError('name')).toBe('The name must be at least 5 characters.');
});

test('ignore init empty fields even if required', () => {
    const original = {name: ''};
    const rules = {name: 'required'};
    const mobRules = new MobRules(original, rules, new ValidatorFactory);
    mobRules.validateInit();

    // async, so wait for errors to surface
    expect(mobRules.hasVisibleErrors()).toBe(false);
});

test('required if touched', () => {
    const original = {name: ''};
    const rules = {name: 'required'};
    const mobRules = new MobRules(original, rules, new ValidatorFactory);
    mobRules.validateInit();
    mobRules.validateOnChange({ target: {name: 'name', value: 'foo'} });
    mobRules.validateOnChange({ target: {name: 'name', value: ''} });

    // async, so wait for errors to surface
    expect(mobRules.hasVisibleErrors()).toBe(true);
});
