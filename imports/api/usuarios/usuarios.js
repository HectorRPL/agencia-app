import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Roles} from "meteor/alanning:roles";
import {Agencia} from "../api/agencia/collection";
import {Creditos} from "../api/creditos/collection";
import {CarritoCompras} from "../api/compras/carritoCompras/collection";
import {Direcciones} from "../api/direcciones/collection";

const agenciaRoles = {
    'agencia': ['addReclutador', 'addVacante']
};

if (Meteor.isServer) {
    Meteor.publish('users', function () {

        return Meteor.users.find({}, {
            fields: {
                emails: 1,
                username: 1
            }
        });
    });

    Accounts.onCreateUser((options, user) => {
        if (options.profile) {
            if ('agencia:' === options.profile.tipoUsuario) {
                let agencia = {};
                agencia.nombre = options.profile.nombre;
                agencia.telefono = options.profile.telefono;
                agencia.propietario = user._id;

                Agencia.insert(agencia, (error, response) => {
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
                // Aquí se insertan los Creditos
                let creditos = {};
                creditos.disponible = 0;
                creditos.usados = 0;
                creditos.propietario = agencia._id;
                Creditos.insert(creditos, (error) => {
                    if (error) {
                        throw new Meteor.Error('No se puedo crear la agencia.', 'creditos-no-creados');
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
}
