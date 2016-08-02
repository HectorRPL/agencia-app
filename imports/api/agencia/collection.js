import {
  Mongo
} from 'meteor/mongo';
import {
  SimpleSchema
} from 'meteor/aldeed:simple-schema';

export const Agencia = new Mongo.Collection('agencia');

Agencia.allow({
  insert(agencia) {
    return agencia._id === this.userId;
  }
});

let DireccionSchema = new SimpleSchema({
  calle: {
    type: String,
    max: 30
  },
  delMpio: {
    type: String,
    max: 30
  },
  estado: {
    type: String,
    min : 1,
    max : 30,
    regEx: /^[a-zA-Zñáéíóú.\s]+$/
  },
  codigoEstado: {
    type: String,
    min: 1,
    max: 3
  },
  colonia: {
    type: String,
    max: 30
  },
  codigoPostal: {
    type: String,
    min:5,
    max: 5,
    regEx: /^[0-9]{5}$/
  },
  numExt: {
    type: String,
    min:1,
    regEx: /^[a-zA-Z-/.&ñáéíóú-\s\d]+$/
  },
  numInt: {
    type: String,
    min:1,
    regEx: /^[a-zA-Z-/.&ñáéíóú-\s\d]+$/,
    optional: true
  }
});

Agencia.schema = new SimpleSchema({
  nombre: {
    type: String,
    regEx: /^[a-zA-Z-.&ñáéíóú-\s\d]+$/,
    min: 2,
    max: 50
  },
  telefono: {
    type: String,
    regEx: /^[0-9]{10}$/,
    min: 10,
    max: 10
  },
  direccion: {
    type: DireccionSchema
  }
});

Agencia.attachSchema(Agencia.schema);
