/**
 * Created by Héctor on 16/01/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {BitacoraLoginAgencias} from "./collection";

export const obtenerEstadoReg = new ValidatedMethod({
    name: 'bitacoraLoginAgencias.obtenerEstadoReg',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Necesario iniciar sesión.',
        reason: 'Usuario no logeado'
    },
    validate: null,
    run() {
        if (Meteor.isServer) {
            const bitLogin = BitacoraLoginAgencias.findOne({propietario: this.userId});
            return bitLogin.estadoRegistro;
        }
    }
});

export const actualizarEstadoReg = new ValidatedMethod({
    name: 'bitacoraLoginAgencias.actualizarEstadoReg',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para actualizar estado necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        estado: {type: String}
    }).validator(),
    run({estado}) {
        if (Meteor.isServer) {
            return BitacoraLoginAgencias.update(
                {propietario: this.userId},
                {$set: {
                    estadoRegistro: estado
                }
            });
        }
    }
});

const BITACORA_LOGIN_AGENCIAS_METHODS = _.pluck([obtenerEstadoReg, actualizarEstadoReg], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(BITACORA_LOGIN_AGENCIAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}