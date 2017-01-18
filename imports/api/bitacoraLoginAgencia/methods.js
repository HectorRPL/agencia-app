/**
 * Created by Héctor on 16/01/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {BitacoraLoginAgencia} from "./collection";

export const obtenerEstadoReg = new ValidatedMethod({
    name: 'bitacoraLoginAgencia.obtenerEstadoReg',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Necesario iniciar sesión.',
        reason: 'Usuario no logeado'
    },
    validate: null,
    run() {
        if (Meteor.isServer) {
            const bitLogin = BitacoraLoginAgencia.findOne({propietario: this.userId});
            return bitLogin.estadoRegistro;
        }
    }
});

export const actualizarEstadoReg = new ValidatedMethod({
    name: 'bitacoraLoginAgencia.actualizarEstadoReg',
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
            return BitacoraLoginAgencia.update(
                {propietario: this.userId},
                {$set: {
                    estadoRegistro: estado
                }
            });
        }
    }
});