/**
 * Created by jvltmtz on 18/07/16.
 */
import braintree from 'braintree';
var gatewayBrainTree = {};

if (Meteor.isServer) {
    Meteor.startup(() => {
        gatewayBrainTree = braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: Meteor.settings.private.brainTreeMerchantId,
            publicKey: Meteor.settings.private.brainTreePublicKey,
            privateKey: Meteor.settings.private.brainTreePrivateKey
        });
    });
}
export default gatewayBrainTree;

