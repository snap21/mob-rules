"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MobRules_1 = require("./MobRules");
const ValidatorFactory_1 = require("./ValidatorFactory");
test('length error', () => {
    const original = { name: 'foo' };
    const rules = { name: 'min:5' };
    const mobRules = new MobRules_1.default(original, rules, new ValidatorFactory_1.default);
    mobRules.validateInit();
    expect(mobRules.hasVisibleErrors()).toBe(true);
    expect(mobRules.getError('name')).toBe('The name must be at least 5 characters.');
});
test('ignore init empty fields even if required', () => {
    const original = { name: '' };
    const rules = { name: 'required' };
    const mobRules = new MobRules_1.default(original, rules, new ValidatorFactory_1.default);
    mobRules.validateInit();
    expect(mobRules.hasVisibleErrors()).toBe(false);
});
test('required if touched', () => {
    const original = { name: '' };
    const rules = { name: 'required' };
    const mobRules = new MobRules_1.default(original, rules, new ValidatorFactory_1.default);
    mobRules.validateInit();
    mobRules.validateOnChange({ target: { name: 'name', value: 'foo' } });
    mobRules.validateOnChange({ target: { name: 'name', value: '' } });
    expect(mobRules.hasVisibleErrors()).toBe(true);
});
//# sourceMappingURL=MobRules.test.js.map