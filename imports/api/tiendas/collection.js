/**
 * Created by jvltmtz on 3/10/16.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";
import {Cadenas} from '../cadenas/collection';
import {Postulaciones} from '../postulaciones/collection';
import tiendasCounts from './tiendasCount';
import {Counts} from 'meteor/tmeasday:publish-counts';
const permisos = ['addVacante'];

class TiendasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        tiendasCounts.afterInsertTienda(doc);
        return result;
    }

    update(selector, modifier) {
        const result = super.update(selector, modifier);
        tiendasCounts.afterUpdatePostulacion(selector, modifier);
        return result;
    }

}

export const Tiendas = new TiendasCollection('tiendas');

Tiendas.deny({
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
Schema.vacante = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    vacanteId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true,
    },
    numVacantes: {
        type: Number,
    },
    numPostulados: {
        type: Number,
        defaultValue: 0,
    },
    numSeleccionados: {
        type: Number,
        defaultValue: 0,
    },
    delMpio: {
        type: String,
        max: 30,
        optional: true,
    },
    sucursal: {
        type: String
    },
    cadenaId: {
        type: String
    },
    cubierta: {
        type: Boolean,
        defaultValue: false,
    }
});

Tiendas.attachSchema(Schema.vacante);

Tiendas.helpers({
    cadena(){
        return Cadenas.findOne({_id: this.cadenaId});
    },
    postulacionesNuevas(){
        return Counts.get(`count.postuladosNuevos.${this._id}`);
    }
});
