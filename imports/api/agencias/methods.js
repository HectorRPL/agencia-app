/**
 * Created by Héctor on 04/01/2017.
 */
import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from 'meteor/underscore';
import {Agencias} from "./collection";

// Enviará un correo con un link al usuario para verificacar de registro
export const enviarCorreoVerificacion = new ValidatedMethod({
    name: 'agencias.enviarCorreoVerificacion',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para verificar un correo necesitas registrarte',
        reason: 'Usuario no logeado'
    },
    validate: null,
    run() {
        if (Meteor.isServer) {
            // Enviar correo de verificación
            try {
                Accounts.sendVerificationEmail(this.userId);
            } catch (error) {
                console.log('El usuario ha intentado enviar nuevamente un correo para verificar su correo, vamos a imprimir el Meteor.Error(error), en teoría deberían de ser sólo dos posibles errores, el correo ya no existe, y el correo ya ha sido verificado', new Meteor.Error(error.message));
                throw new Meteor.Error(error.message);
            }
        }
    }
});

// Actualiza las propiedades 'correoElectronico' e 'emailVerificado' insertando el correo de
// la agencia y un boleano respectivamente en el document de la collection Agencias.
export const verificarCuenta = new ValidatedMethod({
    name: 'agencias.verificarCuenta',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para actualizar estado necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({}).validator(),
    run() {
        if (Meteor.isServer) {

            let user = Meteor.user();
            let email = user && user.emails && user.emails[0].address
            console.log('Esto ya debería ser el email en modo string', email);

            return Agencias.update(
                {propietario: this.userId},
                {
                    $set: {
                        correoElectronico: email,
                        emailVerificado: true
                    }
                }
            );
        }
    }
});

const AGENCIAS_METHODS = _.pluck([enviarCorreoVerificacion, verificarCuenta], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(AGENCIAS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}