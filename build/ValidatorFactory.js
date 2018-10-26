"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = require("validatorjs");
class ValidatorFactory {
    make(data, rules, errorMessages) {
        return new Validator(data, rules, errorMessages);
    }
}
exports.default = ValidatorFactory;
//# sourceMappingURL=ValidatorFactory.js.map