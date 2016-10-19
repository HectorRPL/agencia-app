import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {CodigosPostales} from "./collection.js";

export const obtenerColonias = new ValidatedMethod({
    name: 'codigosPostales.obtenerColonias',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        cp: {type: String}
    }).validator(),
    run({cp}) {
        const resultado = CodigosPostales.find({codigo: cp}).fetch();
        return resultado;
    }
});

const CODIGOS_POSTALES_METODOS = _.pluck([obtenerColonias], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(CODIGOS_POSTALES_METODOS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
