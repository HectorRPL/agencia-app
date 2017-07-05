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
    Accounts.onCreateUser((options, user) => {
        if (options.profile) {
            if ('agencia:' === options.profile.tipoUsuario) {
                let agencia = {};
                agencia.nombre = options.profile.nombre;
                agencia.telefono = options.profile.telefono;
                agencia.propietario = user._id;

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

    /**
     * @sumary Configuracion globlal de los emails a enviar
     * @function {String} siteName Nombre del sitio.
     * @function {Function} from Direccion default email de donde se envia el correo.
     * @function {Function} subject Asunto del correo.
     */
    Accounts.emailTemplates.siteName = "Demostradoras con experiencia";
    Accounts.emailTemplates.from = "Demostradoras con experiencia ";



    /**
     * @sumary Configuracion del email para verificar correo.
     * @function {Function} from donde se envia correo.
     * @function {Function} html Template del mail a enviar.
     * @function {Function} subject Asunto del correo.
     */
    Accounts.emailTemplates.verifyEmail.from  = function () {
        return "Demostradoras con experiencia <postmaster@sandboxb82e8f80c2074fe2aa151f5c42a4aa20.mailgun.org>";
    };
    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        url = url.replace("#", "agencia", "gi");

        SSR.compileTemplate( 'verificarEmail', Assets.getText( 'emailTemplates/verificacionEmail/verificacionEmail.html'));
        var emailData = {
            url: url
        };
        return SSR.render( 'verificarEmail', emailData );
    };


    /**
     * @sumary Configuracion del email para recuperar contraseña.
     * @function {Function} from donde se envia correo.
     * @function {Function} html Template del mail a enviar.
     * @function {Function} subject Asunto del correo.
     */
    Accounts.emailTemplates.resetPassword.from  = function () {
        return "Demostradoras con experiencia <postmaster@sandboxb82e8f80c2074fe2aa151f5c42a4aa20.mailgun.org>";
    };
    Accounts.emailTemplates.resetPassword.html = function (user, url) {
        url = url.replace("#", "agencia");

        SSR.compileTemplate( 'recuperarPassword', Assets.getText( 'emailTemplates/recuperarPassword/recuperarPassword.html'));
        var emailData = {
            url: url
        };
        return SSR.render( 'recuperarPassword', emailData );
    };
    Accounts.emailTemplates.resetPassword.subject =  function (user) {
        return "Recuperar su contraseña en Demostradoras con experiencia";
    };

}
