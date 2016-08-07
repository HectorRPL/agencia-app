import {
  Mongo
} from 'meteor/mongo';

import {
  SimpleSchema
} from 'meteor/aldeed:simple-schema';

import {
  Roles
} from 'meteor/alanning:roles';

const permisos = ['addVacante'];

/*Vacante = function(doc) {
  _.extend(this, doc);
};
_.extend(Vacante.prototype, {
  foramtoDias: () => {
    const dias = [];
    this.horarios.dias.forEach((item, index) => {
      if (item.activo) {
        dias.push(item.DisplayName);
      }
    });
  },
  formatoHabilidades: () => {
    const habilidades = [];
    this.perfil.habilidades.forEach((item, index) => {
      if (item.activo) {
        habilidades.push(item.DisplayName);
      }
    });
  }
});*/

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
  numeroVacantes: {
    type: Number,
  },
  sueldo: {
    type: Number,
  },
  estadoId: {
    type: String
  },
  estadoDesc: {
    type: String
  },
  delMpio: {
    type: String,
    max: 30,
    optional: true,
  },
  tipoVacanteId: {
    type: String
  },
  sucursal: {
    type: String
  },
  cadenaId: {
    type: String
  },
  cadenaDesc: {
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
  activo: {
    type: Boolean,
    defaultValue: true,
  }
});

Vacantes.attachSchema(Schema.vacante);
