/**
 * Created by jvltmtz on 15/09/16.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
export const Direcciones = new Mongo.Collection('direcciones');

Direcciones.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

const Schema = {};

Schema.candidato = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    calle: {
        type: String,
        max: 30,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true
    },
    delMpio: {
        type: String,
        max: 30,
        min: 1
    },
    estado: {
        type: String,
        max: 30,
        min: 1
    },
    estadoId: {
        type: String,
        max: 3,
        min: 1,
        regEx: /^[a-zA-Z-/.&ñáéíóú-\s\d]+$/
    },
    colonia: {
        type: String,
        max: 50,
        min: 1
    },
    codigoPostal: {
        type: String,
        max: 5,
        min: 5,
        regEx: /^[0-9]{5}$/
    },
    numExt: {
        type: String,
        max: 10,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true
    },
    numInt: {
        type: String,
        max: 10,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true
    }
});

Direcciones.attachSchema(Schema.candidato);