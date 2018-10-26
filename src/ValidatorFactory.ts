import * as Validator from 'validatorjs';

export default class ValidatorFactory {
    public make(data, rules, errorMessages?): Validator {
        return new Validator(data, rules, errorMessages);
    }
}
