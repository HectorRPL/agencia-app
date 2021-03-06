/**
 * Created by Héctor on 04/01/2017.
 */
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {Agencias} from "./collection";

const CAMPOS_DATOS_AGENCIA = [
    'propietario',
    'nombre',
    'telefono'
];

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
                console.log(error);
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
            let email = user && user.emails && user.emails[0].address;

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

export const actualizarDatosContacto = new ValidatedMethod({
    name: 'agencias.actualizarDatosContacto',
    validate: Agencias.simpleSchema().pick(CAMPOS_DATOS_AGENCIA).validator({
        clean: true,
        filter: false
    }),
    run(
        {
            propietario,
            nombre,
            telefono,
        }
    ) {
        if (Meteor.isServer) {
            return Agencias.update({
                propietario: propietario
            }, {
                $set: {
                    nombre,
                    telefono,
                }
            });
        }
    }
});

const AGENCIAS_METHODS = _.pluck([enviarCorreoVerificacion, verificarCuenta, actualizarDatosContacto], 'name');
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