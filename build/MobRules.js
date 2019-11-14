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
    /**
     * @param original JSON key-value pair object of field initial values on load
     * @param rules    JSON key-value pair of validatorjs rules for validation
     * @param validatorFactory Builds the validatorjs object.
     */
    constructor(original, rules, validatorFactory) {
        this.store = {
            errors: {}
        };
        // any fields that have had their values change at some point
        this.touched = {};
        // CSS class name for a field error
        this.errorClass = 'mob-rules-error';
        this.original = original;
        this.resetData();
        this.rules = rules;
        this.validatorFactory = validatorFactory;
    }
    /**
     * Run initial form load validation that skips over empty fields
     */
    validateInit() {
        this.runValidation(true);
    }
    /**
     * Event handler for onChange of an HTML element
     */
    validateOnChange(e) {
        // only update the validation for this field
        return this.validate(e, true);
    }
    /**
     * Event handler for onChange event of the form
     */
    validateOnSubmit(e) {
        // validate the entire form
        return this.runValidation(false);
    }
    /**
     * String value of the error message for a specific field name
     *
     * Returns empty string if not exists
     */
    getError(fieldName) {
        return typeof this.store.errors[fieldName] !== 'undefined' ? this.store.errors[fieldName] : '';
    }
    /**
     * Return a string modifier indicating if a field has an error
     */
    getErrorClass(fieldName) {
        return this.getError(fieldName) ? this.errorClass : '';
    }
    /**
     * CSS class returned via getErrorClass() when the given field is invalid
     */
    setErrorClass(errorClass) {
        this.errorClass = errorClass;
        return this;
    }
    /**
     * Return true if there are any errors displayed
     *
     * This is not the same as if the form is currently valid
     */
    hasVisibleErrors() {
        return Object.keys(this.store.errors).length > 0;
    }
    /**
     * Data to validate
     *
     * @param data Basic key-value object
     */
    setData(data) {
        this.data = data;
        return this;
    }
    /**
     * Names of elements used in validation error messages
     *
     * @param attributeNames e.g. { 'fieldName': 'Label to Show' }
     */
    setAttributeNames(attributeNames) {
        this.attributeNames = attributeNames;
        return this;
    }
    /**
     * Customize message to display per field on error
     *
     * @param errorMessages Key-value object e.g. { 'fieldName.required': "Foo is required" }
     */
    setErrorMessages(errorMessages) {
        this.errorMessages = errorMessages;
        return this;
    }
    /**
     * Validation rules per field for validationjs
     *
     * @param rules Key-value object e.g. { 'fieldName': 'required' }
     */
    setRules(rules) {
        this.rules = rules;
        return this;
    }
    /**
     * Reset all validation
     */
    clear() {
        this.clearErrors();
        this.touched = {};
        this.resetData();
        return this;
    }
    /**
     * Clear display of any errors, forcing refresh of their contents
     */
    clearErrors() {
        this.store.errors = {};
    }
    /**
     * Mirror original data
     */
    resetData() {
        this.data = this.shallowClone(this.original);
    }
    validate(e, onlyDisplayDirty) {
        this.data[e.target.name] = e.target.value;
        this.touched[e.target.name] = true;
        return this.runValidation(onlyDisplayDirty);
    }
    runValidation(onlyDisplayDirty) {
        const validator = this.validatorFactory.make(this.data, this.rules, this.errorMessages);
        if (this.attributeNames) {
            validator.setAttributeNames(this.attributeNames);
        }
        this.clearErrors();
        if (validator.passes()) {
            return true;
        }
        for (const name in this.rules) {
            const originalValue = this.original[name];
            // when specified only show errors for fields that have been modified in some way
            // for example, on page load there may be a partially filled in form where any fields
            // with existing values should be validated, but empty fields shouldn't. Also, if
            // an empty field is then modified, it should be validated, but not any other of the
            // untouched fields. If the field is then cleared by deleting values, it should still
            // show validation errors even though it's empty
            if (!onlyDisplayDirty || originalValue || this.data[name] || this.touched[name]) {
                this.store.errors[name] = validator.errors.first(name);
                this.touched[name] = true;
            }
        }
        return false;
    }
    shallowClone(obj) {
        return Object.assign({}, obj);
    }
}
__decorate([
    mobx_1.observable
], MobRules.prototype, "store", void 0);
exports.default = MobRules;
//# sourceMappingURL=MobRules.js.map