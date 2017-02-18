import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Vacantes} from "./collection.js";
import {Agencias} from "../agencias/collection.js";

const CAMPOS_SIN_IDS = ['sueldo', 'numVacantes', 'estadoId', 'puestoId', 'marca', 'perfil', 'horarios'];

const ID = ['_id'];

export const insertVacante = new ValidatedMethod({
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
    run({sueldo, estadoId, puestoId, marca, perfil, horarios}) {
        if (Meteor.isServer) {
            const agencia = Agencias.findOne({propietario: this.userId});
            const vacante = {
                propietario: agencia._id,
                sueldo,
                estadoId,
                puestoId,
                marca,
                perfil,
                horarios
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

const VACANTES_METHODS = _.pluck([insertVacante, desactivar], 'name');
if (Meteor.isServer) {
    // Solo se permite 5 operaciones por conexión por segundo
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(VACANTES_METHODS, name);
        },
        // Limite de conexión por Id
        connectionId() {
            return true;
        },
    }, 5, 1000);
}