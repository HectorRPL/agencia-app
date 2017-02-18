/**
 * Created by jvltmtz on 3/11/16.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {CarritoCompras} from "./collection.js";
import {_} from "meteor/underscore";

export const crear = new ValidatedMethod({
    name: 'carritoCompras.crear',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para crear el carrito necesitas registrarte.', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    run(){
        if (Meteor.isServer) {
            const selector = {propietario: agencia._id};
            const producto = CarritoCompras.insert(selector);
        }
    }
});

const CARRITO_COMPRAS_METHODS = _.pluck([crear], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(CARRITO_COMPRAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}