import { observable } from 'mobx';
import ValidatorFactory from './ValidatorFactory';

export default class MobRules {
    @observable private store = {
        errors: {}
    };

    // any data that is prepopulated on form initialization
    private original;

    // the current state of any form data
    private data;

    // any fields that have had their values change at some point
    private touched = {};

    // validation rules
    private rules;

    // any custom attribute names for display
    private attributeNames;

    // CSS class name for a field error
    private errorClass = 'mob-rules-error';

    private validatorFactory: ValidatorFactory;

    /**
     * @param original JSON key-value pair object of field initial values on load
     * @param rules    JSON key-value pair of validatorjs rules for validation
     * @param validatorFactory Builds the validatorjs object.
     */
    public constructor(original, rules, validatorFactory: ValidatorFactory) {
        this.original = original;
        this.data = this.shallowClone(original);
        this.rules = rules;
        this.validatorFactory = validatorFactory;
    }

    /**
     * Run initial form load validation that skips over empty fields
     */
    public validateInit(): void {
        this.runValidation(true);
    }

    public validateOnChange(e): boolean {
        // only update the validation for this field
        return this.validate(e, true);
    }

    public validateOnSubmit(e): boolean {
        // validate the entire form
        return this.runValidation(false);
    }

    private validate(e, onlyDisplayDirty: boolean): boolean {
        this.data[e.target.name] = e.target.value;
        this.touched[e.target.name] = true;
        return this.runValidation(onlyDisplayDirty);
    }

    private runValidation(onlyDisplayDirty: boolean) {
        const validator = this.validatorFactory.make(this.data, this.rules);

        if (this.attributeNames) {
            validator.setAttributeNames(this.attributeNames);
        }

        // clear display of any errors, forcing refresh of their contents
        this.store.errors = {};

        if (validator.passes()) {
            return true;
        }

        for (const name in this.rules) {
            const originalValue = <string>this.original[name];

            // when specified only show errors for fields that have been modified in some way
            // for example, on page load there may be a partially filled in form where any fields
            // with existing values should be validated, but empty fields shouldn't. Also, if
            // an empty field is then modified, it should be validated, but not any other of the
            // untouched fields. If the field is then cleared by deleting values, it should still
            // show validation errors even though it's empty
            if (!onlyDisplayDirty || originalValue || this.data[name] || this.touched[name]) {
                this.store.errors[name] = validator.errors.first(name);
            }
        }

        return false;
    }

    private shallowClone(obj) {
        return  Object.assign({}, obj);
    }

    private setRules(rules) {
        this.rules = rules;
    }

    /**
     * String value of the error message for a specific field name
     *
     * Returns empty string if not exists
     */
    public getError(fieldName): string {
        return typeof this.store.errors[fieldName] !== 'undefined' ? this.store.errors[fieldName] : '';
    }

    /**
     * Return a string modifier indicating if a field has an error
     */
    public getErrorClass(fieldName): string {
        return this.getError(fieldName) ? this.errorClass : '';
    }

    /**
     * Return true if there are any errors displayed
     *
     * This is not the same as if the form is currently valid
     */
    public hasVisibleErrors(): boolean {
        return Object.keys(this.store.errors).length > 0;
    }

    public setAttributeNames(attributeNames): void {
        this.attributeNames = attributeNames;
    }
}
