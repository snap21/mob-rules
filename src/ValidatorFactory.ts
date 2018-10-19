import * as Validator from 'validatorjs';

export default class ValidatorFactory {
    public make(data, rules): Validator {
        return new Validator(data, rules);
    }
}
