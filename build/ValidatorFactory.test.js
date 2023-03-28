"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorFactory_1 = require("./ValidatorFactory");
test('make', () => {
    const data = {};
    const rules = {};
    const factory = new ValidatorFactory_1.default;
    const validator = factory.make(data, rules);
    expect(typeof validator).toBe('object');
});
//# sourceMappingURL=ValidatorFactory.test.js.map