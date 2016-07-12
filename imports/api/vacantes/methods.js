import {
  Meteor
} from 'meteor/meteor';
import {
  ValidatedMethod
} from 'meteor/mdg:validated-method';
import {
  SimpleSchema
} from 'meteor/aldeed:simple-schema';
import {
  LoggedInMixin
} from 'meteor/tunifight:loggedin-mixin';
import {
  _
} from 'meteor/underscore';
import {
  Vacantes
} from './collection.js';

const CAMPOS_SIN_IDS = ['sueldo', 'numeroVacantes', 'estadoId', 'estadoDesc', 'delMpio', 'tipoVacanteId', 'sucursal', 'cadenaId', 'cadenaDesc', 'marca', 'perfil', 'horarios', 'entrevista'];

const CAMPOS_CON_IDS = ['_id', 'propietario', 'sueldo', 'numeroVacantes', 'estadoId', 'estadoDesc', 'delMpio', 'tipoVacanteId', 'sucursal', 'cadenaId', 'cadenaDesc', 'marca', 'perfil', 'horarios', 'entrevista'];

export const insert = new ValidatedMethod({
  name: 'vacante.insert',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'noLogeado',
    message: 'Para publicar un vacante, necesita registrarse', //Optional
    reason: 'Usuario no logeado' //Optional
  },
  validate: Vacantes.simpleSchema().pick(CAMPOS_SIN_IDS).validator({
    clean: true,
    filter: false
  }),
  run({
    numeroVacantes,
    sueldo,
    estadoId,
    estadoDesc,
    delMpio,
    tipoVacanteId,
    sucursal,
    cadenaId,
    cadenaDesc,
    marca,
    perfil,
    horarios,
    entrevista
  }) {
    const vacante = {
      propietario: this.userId,
      numeroVacantes,
      sueldo,
      estadoId,
      estadoDesc,
      delMpio,
      tipoVacanteId,
      sucursal,
      cadenaId,
      cadenaDesc,
      marca,
      perfil,
      horarios,
      entrevista
    };
    return Vacantes.insert(vacante);
  },
});
