/**
 * Created by Héctor on 04/01/2017.
 */
import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {_} from 'meteor/underscore';

// Enviará un correo con un link al usuario para verificacar de registro
export const verificarCorreo = new ValidatedMethod({
    name: 'agencias.verificarCorreo',
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
            Accounts.sendVerificationEmail(this.userId);
            // Esperar respuesta (aquí iría el callback para esperar respuesta)
        }
    }
});