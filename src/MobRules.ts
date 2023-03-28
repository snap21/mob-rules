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

    // any customer error messages for display
    private errorMessages;

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
        this.resetData();
        this.rules = rules;
        this.validatorFactory = validatorFactory;
    }

    /**
     * Run initial form load validation that skips over empty fields
     */
    public validateInit(): void {
        this.runValidation(true);
    }

    /**
     * Event handler for onChange of an HTML element
     */
    public validateOnChange(e): boolean {
        // only update the validation for this field
        return this.validate(e, true);
    }

    /**
     * Event handler for onChange event of the form
     */
    public validateOnSubmit(e): boolean {
        // validate the entire form
        return this.runValidation(false);
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
    public getErrorClass(fieldName: string): string {
        return this.getError(fieldName) ? this.errorClass : '';
    }

    /**
     * CSS class returned via getErrorClass() when the given field is invalid
     */
    public setErrorClass(errorClass: string): this {
        this.errorClass = errorClass;
        return this;
    }

    /**
     * Return true if there are any errors displayed
     *
     * This is not the same as if the form is currently valid
     */
    public hasVisibleErrors(): boolean {
        return Object.keys(this.store.errors).length > 0;
    }

    /**
     * Data to validate
     *
     * @param data Basic key-value object
     */
    public setData(data): this {
        this.data = data;
        return this;
    }

    /**
     * Names of elements used in validation error messages
     *
     * @param attributeNames e.g. { 'fieldName': 'Label to Show' }
     */
    public setAttributeNames(attributeNames): this {
        this.attributeNames = attributeNames;
        return this;
    }

    /**
     * Customize message to display per field on error
     *
     * @param errorMessages Key-value object e.g. { 'fieldName.required': "Foo is required" }
     */
    public setErrorMessages(errorMessages): this {
        this.errorMessages = errorMessages;
        return this;
    }

    /**
     * Validation rules per field for validationjs
     *
     * @param rules Key-value object e.g. { 'fieldName': 'required' }
     */
    public setRules(rules): this {
        this.rules = rules;
        return this;
    }

    /**
     * Reset all validation
     */
    public clear(): this {
        this.clearErrors();
        this.touched = {};
        this.resetData();
        return this;
    }

    /**
     * Clear display of any errors, forcing refresh of their contents
     */
    private clearErrors() {
        this.store.errors = {};
    }

    /**
     * Mirror original data
     */
    private resetData() {
        this.data = this.shallowClone(this.original);
    }

    private validate(e, onlyDisplayDirty: boolean): boolean {
        this.data[e.target.name] = e.target.value;
        this.touched[e.target.name] = true;
        return this.runValidation(onlyDisplayDirty);
    }

    private runValidation(onlyDisplayDirty: boolean) {
        const validator = this.validatorFactory.make(this.data, this.rules, this.errorMessages);

        if (this.attributeNames) {
            validator.setAttributeNames(this.attributeNames);
        }

        this.clearErrors();

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
                this.touched[name] = true;
            }
        }

        return false;
    }

    private shallowClone(obj) {
        return  Object.assign({}, obj);
    }
}
