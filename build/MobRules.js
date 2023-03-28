"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class MobRules {
    constructor(original, rules, validatorFactory) {
        this.store = {
            errors: {}
        };
        // any fields that have had their values change at some point
        this.touched = {};
        this.original = original;
        this.data = Object.assign({}, original); // shallow copy
        this.rules = rules;
        this.validatorFactory = validatorFactory;
        // validate on initialization based on original values
        // but do not show errors for any fields that are empty
        this.runValidation(true);
    }
    validateOnChange(e) {
        // only update the validation for this field
        return this.validate(e, true);
    }
    validateOnSubmit(e) {
        // validate the entire form
        return this.runValidation(false);
    }
    validate(e, onlyDisplayDirty) {
        this.data[e.target.name] = e.target.value;
        this.touched[e.target.name] = true;
        return this.runValidation(onlyDisplayDirty);
    }
    runValidation(onlyDisplayDirty) {
        const validator = this.validatorFactory.make(this.data, this.rules);
        // clear display of any errors, forcing refresh of their contents
        this.store.errors = {};
        if (validator.passes()) {
            return true;
        }
        for (const name in this.rules) {
            const originalValue = this.original[name];
            if (!onlyDisplayDirty || originalValue || this.data[name] || this.touched[name]) {
                this.store.errors[name] = validator.errors.first(name);
            }
        }
        return false;
    }
    getError(fieldName) {
        return typeof this.store.errors[fieldName] !== 'undefined' ? this.store.errors[fieldName] : '';
    }
    hasErrors() {
        return Object.keys(this.store.errors).length > 0;
    }
}
__decorate([
    mobx_1.observable
], MobRules.prototype, "store", void 0);
exports.default = MobRules;
//# sourceMappingURL=MobRules.js.map