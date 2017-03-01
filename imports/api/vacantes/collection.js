import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";
import {Puestos} from "../catalogos/puestos/collection";
import {Estados} from "../catalogos/estados/collection";
import {Habilidades} from "../catalogos/habilidades/collection";
import {Experiencias} from "../catalogos/experiencias/collection";
import {Escuelas} from "../catalogos/escuelas/collection";
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
    },
    experienciasVcnt(){
        let strExperiencias = '';
        if (this.perfil && this.perfil.experiencia.requerida) {
            let experiencias = Experiencias.find({_id: {$in: this.perfil.experiencia.listado}});
            experiencias.forEach((experiencia)=> {
                strExperiencias += experiencia.descripcion + ' | ';
            });
        } else {
            strExperiencias = 'No requerida';
        }

        return strExperiencias;
    },
    hibilidadesVcnt(){
        let strHabilidades = '';
        if (this.perfil && this.perfil.habilidades.requerida) {
            let habilidades = Habilidades.find({_id: {$in: this.perfil.habilidades.listado}});
            habilidades.forEach((habilidad)=> {
                strHabilidades += habilidad.descripcion + ' | ';
            });
        } else {
            strHabilidades = 'No requerida';
        }

        return strHabilidades;
    },
    escolaridadVcnt(){
        if (this.perfil) {
            return Escuelas.findOne({_id: this.perfil.escolaridad});
        }
    }
});