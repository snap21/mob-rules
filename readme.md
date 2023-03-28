Mob Rules
---------------

mob-rules is an npm package for validation with mobx. It wraps [validatorjs](https://github.com/skaterdav85/validatorjs) with functionality to take advantage of observers to make display of validator feedback simple and elegant.

### Installation ###

~~~sh
npm install git+ssh://git@gitlab.lando:team/js/mob-rules.git --save
~~~

### Basic Usage ###

The overall workflow is

 - Create a `MobRulesFactory`
 - Use the factory to create a`MobRules` object that contains our `original` data and our validation `rules`
 - Create error containers for each field, retrieving any error with `getError('foo')`
 - Add the `onChange` and `onSubmit` events of our form to `validateOnChange` and `validateOnSubmit`

and we're done!

This is a simple example using react

~~~js
import { Component } from 'react';
import * as React from 'react';
import { observer } from 'mobx-react';
import { MobRulesFactory } from 'mob-rules';

@observer
export default class SnapForm extends Component {
    constructor() {
        const factory = new MobRulesFactory;

        // the state of the form onload. This would normally be
        // pulled from your mobx store maintaining state
        const original = {
            'demo': ''
        };

        const rules = {
            'demo': 'required'
        };

        this.validator = factory.make(original, rules);
    }

    render() {
        return (
            <form onSubmit={this.validateOnSubmit} onChange={this.validator.validateOnChange}>
                <div>
                    <input type="text" name="foo" />
                    <div className="error">{this.validator.getError('foo')}</div>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}
~~~
