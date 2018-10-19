"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = require("validatorjs");
class ValidatorFactory {
    make(data, rules) {
        return new Validator(data, rules);
    }
}
exports.default = ValidatorFactory;
//# sourceMappingURL=ValidatorFactory.js.map