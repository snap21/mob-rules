import MobRules from './MobRules';
import ValidatorFactory from './ValidatorFactory';

export default class MobRulesFactory {
    public make(original, rules): MobRules {
        return new MobRules(original, rules, new ValidatorFactory);
    }
}
