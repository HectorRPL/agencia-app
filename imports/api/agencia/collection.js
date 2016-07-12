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
    max:20
  },
  colonia: {
    type: String,
    max: 30
  },
  codigoPostal: {
    type: String,
    min:5,
    max: 5
  },
  numExt: {
    type: Number,
    min:1
  },
  numInt: {
    type: Number,
    min:1,
    optional: true
  }
});

Agencia.schema = new SimpleSchema({
  nombre: {
    type: String
  },
  telefono: {
    type: Number
  },
  direccion: {
    type: DireccionSchema
  }
});

Agencia.attachSchema(Agencia.schema);
