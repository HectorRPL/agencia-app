import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Agencias = new Mongo.Collection('agencias');

Agencias.deny({
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

Agencias.schema = new SimpleSchema({
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
  nombre: {
    type: String,
    regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
    min: 2,
    max: 50
  },
  telefono: {
    type: String,
    regEx: /^[0-9]{10}$/,
    min: 10,
    max: 10
  }
});

Agencias.attachSchema(Agencias.schema);
