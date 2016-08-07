/**
 * Created by jvltmtz on 18/07/16.

import {Meteor} from 'meteor/meteor';
import braintree from 'braintree';

module.exports = {};
export default class BraintreeGateway {
    constructor(){
        if (Meteor.isServer) {
            Meteor.startup(() => {
                this.gateway = braintree.connect({
                    environment: braintree.Environment.Sandbox,
                    merchantId: Meteor.settings.private.brainTreeMerchantId,
                    publicKey: Meteor.settings.private.brainTreePublicKey,
                    privateKey: Meteor.settings.private.brainTreePrivateKey
                });
            });
        }
    }

    getGateWay(){
       return  this.gateway;
    }
}
 */





