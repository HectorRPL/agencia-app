import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";
import {Puestos} from "../catalogos/puestos/collection";
import {Estados} from "../catalogos/estados/collection";
import {Counts} from "meteor/tmeasday:publish-counts";

const permisos = ['addVacante'];
const diasEnMilis = 86400000;

export const Vacantes = new Mongo.Collection('vacantes');

Vacantes.deny({
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
    totalVacantes: {
        type: Number,
        defaultValue: 0,
    },
    totalTiendas: {
        type: Number,
        defaultValue: 0,
    },
    sueldo: {
        type: Number,
    },
    estadoId: {
        type: String
    },
    puestoId: {
        type: String
    },
    marca: {
        type: String
    },
    perfil: {
        type: Object,
        blackbox: true,
    },
    horarios: {
        type: Object,
        blackbox: true,
    },
    eliminada: {
        type: Boolean,
        defaultValue: false,
    },
    fechaEliminacion: {
        type: Date,
        optional: true
    },
    fechaExpiracion: {
        type: Date,
        autoValue: function () {
            let fechaActual = new Date().getTime();
            return new Date(fechaActual + (diasEnMilis * 30));
        }
    },
    cubierta: {
        type: Boolean,
        defaultValue: false,
    }
});

Vacantes.attachSchema(Schema.vacante);

Vacantes.helpers({
    puesto(){
        return Puestos.findOne({_id: this.puestoId});
    },
    estado(){
        return Estados.findOne({_id: this.estadoId});
    }
});