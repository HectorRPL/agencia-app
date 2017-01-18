/**
 * Created by Héctor on 04/01/2017.
 */
import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {_} from 'meteor/underscore';

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