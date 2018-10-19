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

    private validatorFactory: ValidatorFactory;

    public constructor(original, rules, validatorFactory: ValidatorFactory) {
        this.original = original;
        this.data = Object.assign({}, original); // shallow copy
        this.rules = rules;
        this.validatorFactory = validatorFactory;

        // validate on initialization based on original values
        // but do not show errors for any fields that are empty
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

        // clear display of any errors, forcing refresh of their contents
        this.store.errors = {};

        if (validator.passes()) {
            return true;
        }

        for (const name in this.rules) {
            const originalValue = <string>this.original[name];
            if (!onlyDisplayDirty || originalValue || this.data[name] || this.touched[name]) {
                this.store.errors[name] = validator.errors.first(name);
            }
        }

        return false;
    }

    public getError(fieldName): string {
        return typeof this.store.errors[fieldName] !== 'undefined' ? this.store.errors[fieldName] : '';
    }

    public hasErrors(): boolean {
        return Object.keys(this.store.errors).length > 0;
    }
}
