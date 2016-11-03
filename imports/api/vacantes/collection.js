import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";
import {Puestos} from "../puestos/collection";
import {Estados} from "../estados/collection";
import {Counts} from 'meteor/tmeasday:publish-counts';

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
  fechaElimincacion: {
    type: Date,
    optional: true,
  },
  totalPostulados:{
    type: Number,
    defaultValue: 0,
  },
  totalSeleccionados:{
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
  postNuevasAgencia(){
    return Counts.get(`count.vacante.postulados.nuevos.${this._id}`);
  },
  selecNuevasAgencia(){
    return Counts.get(`count.vacante.seleccionados.nuevos.${this._id}`);
  }
});