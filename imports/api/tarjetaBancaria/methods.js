import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';
import {TarjetaBancaria} from './collection.js';

export const inserartTarjeta = new ValidatedMethod({
    name: 'tarjetaBancaria.inserartTarjeta',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: null,
    run({result}) {
        return TarjetaBancaria.insert(result);
    }
});

export const eliminarTarjeta = new ValidatedMethod({
    name: 'tarjetaBancaria.eliminarTarjeta',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        id: {type: String}
    }).validator(),
    run({id}) {
        return TarjetaBancaria.remove({
            _id: id
        });
    }
});

const TARJETAS_BANCARIA_METODOS = _.pluck([inserartTarjeta], 'name');
if (Meteor.isServer) {
    // Solo se permite 5 operaciones por conexión por segundo
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(TARJETAS_BANCARIA_METODOS, name);
        },
        // Limite de conexión por Id
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
