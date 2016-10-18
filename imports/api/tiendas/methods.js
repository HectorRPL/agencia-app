/**
 * Created by jvltmtz on 3/10/16.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {Tiendas} from "./collection.js";

const CAMPOS_SIN_IDS = ['numVacantes', 'delMpio', 'sucursal', 'cadenaId', 'vacanteId'];

export const insertTienda = new ValidatedMethod({
    name: 'tienda.insert',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para publicar un vacante, necesita registrarse', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    validate: Tiendas.simpleSchema().pick(CAMPOS_SIN_IDS).validator({
        clean: true,
        filter: false
    }),
    run({numVacantes, vacanteId, cadenaId, sucursal, delMpio}) {
        if (Meteor.isServer) {
            const tienda = {
                vacanteId,
                numVacantes,
                delMpio,
                sucursal,
                cadenaId
            };
            return Tiendas.insert(tienda);
        }

    },
});
