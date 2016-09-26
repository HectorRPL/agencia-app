import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {Vacantes} from "./collection.js";
import {Agencia} from "../agencia/collection.js";

const CAMPOS_SIN_IDS = ['sueldo', 'numVacantes', 'estadoId', 'delMpio', 'puestoId', 'sucursal', 'cadenaId', 'marca', 'perfil', 'horarios', 'entrevista'];

const ID = ['_id'];

export const insert = new ValidatedMethod({
    name: 'vacantes.insert',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para publicar un vacante, necesita registrarse', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    validate: Vacantes.simpleSchema().pick(CAMPOS_SIN_IDS).validator({
        clean: true,
        filter: false
    }),
    run({numVacantes, sueldo, estadoId, delMpio, puestoId, sucursal, cadenaId, marca, perfil, horarios, entrevista}) {
        if (Meteor.isServer) {
            const agencia = Agencia.findOne({propietario: this.userId});
            const vacante = {
                propietario: agencia._id,
                numVacantes,
                sueldo,
                estadoId,
                delMpio,
                puestoId,
                sucursal,
                cadenaId,
                marca,
                perfil,
                horarios,
                entrevista
            };
            return Vacantes.insert(vacante);
        }

    },
});

export const desactivar = new ValidatedMethod({
    name: 'vacante.desactivar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para publicar un vacante, necesita registrarse', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    validate: Vacantes.simpleSchema().pick(ID).validator({
        clean: true,
        filter: false
    }),
    run({_id}){
        return Vacantes.update({
            _id: _id
        }, {
            $set: {
                eliminada: true
            }
        });
    }
});
