import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {SSR} from 'meteor/meteorhacks:ssr';
import {Roles} from "meteor/alanning:roles";
import {Agencias} from "../agencias/collection";
import {CarritoCompras} from "../compras/carritoCompras/collection";
import {Direcciones} from "../direcciones/collection";
import {BitacoraLoginAgencias} from '../bitacoraLoginAgencias/collection';
const LOGIN_METHOD = 'login';
const CREATE_USER_METHOD = 'createUser';

const agenciaRoles = {
    'agencia': ['addReclutador', 'addVacante']
};

if (Meteor.isServer) {
    /*Meteor.publish('users', function () {

        return Meteor.users.find({}, {
            fields: {
                emails: 1,
                username: 1
            }
        });
    });*/

    Accounts.onCreateUser((options, user) => {
        if (options.profile) {
            if ('agencia:' === options.profile.tipoUsuario) {
                let agencia = {};
                agencia.nombre = options.profile.nombre;
                agencia.telefono = options.profile.telefono;
                agencia.propietario = user._id;
                agencia.correoElectronico = 'CorreoNoVerificado',
                agencia.emailVerificado = false

                Agencias.insert(agencia, (error, response) => {
                    if (error) {
                        throw new Meteor.Error('No se puedo crear la agencia.', 'agencia-no-creada');
                    } else {
                        agencia._id = response;
                    }
                });
                let direccion = options.profile.direccion;
                direccion.propietario = agencia._id;
                Direcciones.insert(direccion, (error) => {
                    if (error) {
                        throw new Meteor.Error('No se puedo crear la agencia.', 'direccion-no-creada');
                    }
                });

                let carritoNuevo = {
                    propietario: agencia._id,
                };
                CarritoCompras.insert(carritoNuevo);
                user.roles = agenciaRoles;
                user.username = agencia.nombre;
            }
        }
        return user;
    });

    Accounts.onLogin((result) => {
        let bitacoraLoginAgencias = {
            propietario: result.user._id,
            fechaLogin: new Date(),
            conexion: result.connection,
            estadoRegistro: 'inicio.registroPendienteVerificacion',
            tipoLogin: result.type
        };
        if (CREATE_USER_METHOD === result.methodName) {
            BitacoraLoginAgencias.insert(bitacoraLoginAgencias);
        }
        if (LOGIN_METHOD === result.methodName) {
            BitacoraLoginAgencias.update({propietario: result.user._id}, {$set: {fechaLogin: new Date()}});
        }
    });

    Accounts.emailTemplates.siteName = "Demostradoras con experiencia";
    Accounts.emailTemplates.from = "Demostradoras con experiencia <demostradoras01@gmail.com>";

    // Verificación de registro con link en el email
    Accounts.emailTemplates.verifyEmail.from  = function () {
        return "Demostradoras con experiencia <demostradoras01@gmail.com>";
    };
    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        url = url.replace("#", "agencia", "gi");

        SSR.compileTemplate( 'verificarEmail', Assets.getText( 'emailTemplates/verificacionEmail/verificacionEmail.html'));
        var emailData = {
            url: url
        };
        return SSR.render( 'verificarEmail', emailData );
    };

    // Resetear contraseña
    Accounts.emailTemplates.resetPassword.subject =  function (user) {
        return "Cómo restablecer su contraseña en Demostradoras con experiencia";
    };

}
