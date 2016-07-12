import {
  Meteor
} from 'meteor/meteor';
import {
  Vacantes
} from './collection';

if (Meteor.isServer) {
  Meteor.publish('mis.vacantes', () => {
    const selector = {
      propietario: this.userId,
    };
    return Vacantes.Vacantes(selector, {
      fields: {
        _id: 1,
        fechaCreacion: 1,
        cadenaId: 1,
        marca: 1,
        sucursal: 1,
        estadoId: 1,
        sueldo: 1,
        numeroVacantes: 1,
        perfil: 0,
        horarios: 0,
        entrevista: 0,
      }
    });
  });
}
