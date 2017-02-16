/**
 * Created by jvltmtz on 3/11/16.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const BitacoraCompras = new Mongo.Collection('bitacoraCompras');

BitacoraCompras.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});


const Schema = {};


Schema.bitacoraCompras = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true,
    },
    compraExito: {
        type: Boolean,
        defaultValue: true
    },
    apiRespuesta: {
        type: Object,
        blackbox: true,
    },
    apiMetodoPago: {
        type: Object,
        blackbox: true,
        optional: true
    },
    apiDetalles: {
        type: Object,
        blackbox: true,
        optional: true
    },
    datosPeticion: {
        type: Object,
        blackbox: true
    }
});

BitacoraCompras.attachSchema(Schema.bitacoraCompras);