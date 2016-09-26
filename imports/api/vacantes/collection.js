import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";
import {Puestos} from '../puestos/collection';
import {Estados} from '../estados/collection';
import {Cadenas} from '../cadenas/collection';

const permisos = ['addVacante'];


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
  numVacantes: {
    type: Number,
  },
  sueldo: {
    type: Number,
  },
  estadoId: {
    type: String
  },
  delMpio: {
    type: String,
    max: 30,
    optional: true,
  },
  puestoId: {
    type: String
  },
  sucursal: {
    type: String
  },
  cadenaId: {
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
  entrevista: {
    type: Object,
    blackbox: true,
  },
  eliminada: {
    type: Boolean,
    defaultValue: false,
  },
  fechaElimincacion: {
    type: Date,
    optional: true,
  },
  numPostulaciones:{
    type: Number,
    defaultValue: 0,
  },
  numSeleccionados:{
    type: Number,
    defaultValue: 0,
  },
  cubierta:{
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
  cadena(){
    return Cadenas.findOne({_id:this.cadenaId});
  }
});