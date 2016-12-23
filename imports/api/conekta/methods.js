import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {ProvideMixin} from 'meteor/ziarno:provide-mixin';
import {Meteor} from 'meteor/meteor';
//import braintree from 'braintree';


/*if (Meteor.isServer) {

 Meteor.startup(() => {
 var getGateway = braintree.connect({
 environment: braintree.Environment.Sandbox,
 merchantId: Meteor.settings.private.brainTreeMerchantId,
 publicKey: Meteor.settings.private.brainTreePublicKey,
 privateKey: Meteor.settings.private.brainTreePrivateKey
 });
 getGateway.clientToken.generate({}, function (err, response) {
 console.log(response);
 });

 });

 }*/
/*
export const getToken = new ValidatedMethod({
    name: 'braintree.getToken',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: null,
    run(customerId) {
        let gateway = braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: '64f3m8b6dqh339kp',
            publicKey: 'vwk52rbt8kcbbvbj',
            privateKey: '1e2f73184e2179f658d1ac769b44a862'
        });
        console.log('asdasdasdasdasdasdasdassssssssssssssssssasdasdasd');
        gateway.clientToken.generate({}, function (err, response) {
            console.log('-------------------------------------------------------------------------------------------');
            console.log(response);
            console.log('-------------------------------------------------------------------------------------------');
            return response.clientToken;
        });

    }
});
*/


let gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: '64f3m8b6dqh339kp',
    publicKey: 'vwk52rbt8kcbbvbj',
    privateKey: '1e2f73184e2179f658d1ac769b44a862'
});

Meteor.methods({ getToken: (clientId) => {

    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
        options.clientId = clientId;
    }

    var response = generateToken(options);

    return response.clientToken;

    /*gateway.clientToken.generate({}, function (err, response) {
        console.log('-------------------------------------------------------------------------------------------');
        console.log(response);
        console.log('-------------------------------------------------------------------------------------------');
        return response.clientToken;
    });*/

}});


