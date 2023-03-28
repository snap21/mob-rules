"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MobRules_1 = require("./MobRules");
const ValidatorFactory_1 = require("./ValidatorFactory");
class MobRulesFactory {
    make(original, rules) {
        return new MobRules_1.default(original, rules, new ValidatorFactory_1.default);
    }
}
exports.default = MobRulesFactory;
//# sourceMappingURL=MobRulesFactory.js.map