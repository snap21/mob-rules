"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MobRulesFactory_1 = require("./MobRulesFactory");
test('make', () => {
    const original = {};
    const rules = {};
    const factory = new MobRulesFactory_1.default;
    const mobRules = factory.make(original, rules);
    expect(typeof mobRules).toBe('object');
});
//# sourceMappingURL=MobRulesFactory.test.js.map