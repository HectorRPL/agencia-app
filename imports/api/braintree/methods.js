import {_} from "meteor/underscore";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import braintree from 'braintree';

conts brainTreeKeys {
    enviroment: braintree.Environment.Sandbox,
        merchantId:'64f3m8b6dqh339kp',
        publicKey:'vwk52rbt8kcbbvbj',
        privateKey:'1e2f73184e2179f658d1ac769b44a862'
};

cont REST_URL = '/client_token';

export const getToken = new ValidatedMethod({
    name: 'braintree.getToken',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    run({}) {

        let gateway = braintree.connect(brainTreeKeys);

        gateway.clientToken.generate({},  (err, response) => {
            conts tokenTreeId = response.clientToken
        });

    }
});