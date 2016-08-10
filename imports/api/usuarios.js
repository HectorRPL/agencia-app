import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Agencia } from '../api/agencia/index';
import { Creditos } from '../api/creditos/index';

const agenciaRoles = {
  'agencia': ['addReclutador', 'addVacante']
};

if (Meteor.isServer) {
  Meteor.publish('users', function() {

    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        username: 1
      }
    });
  });

  Accounts.onCreateUser((options, user) => {
    if (options.profile) {
      if ('agencia:' === options.profile.tipoUsuario) {
        let agencia = options.profile;
        agencia._id = user._id;
        Agencia.insert(agencia,
          (error) => {
            throw new Error('No se puedo crear la agencia.');
          });
          // Aquí se insertan los Creditos
        let creditos = {};
        creditos.disponible   = 0;
        creditos.usados   = 0;
        creditos.propietario  = user._id;
        Creditos.insert(creditos,
           (error) => {
             if (error) {
               console.log(error);
               throw new Error('No se puedieron crear los créditos.');
             }
          });
        user.roles = agenciaRoles;
        user.username = agencia.nombre;
      } else {

      }
    }
    return user;
  });
}
