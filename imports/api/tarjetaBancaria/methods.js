import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { TarjetaBancaria } from './collection.js';

export const insert = new ValidatedMethod({
    name: 'tarjetaBancaria.insert',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: TarjetaBancaria
    .simpleSchema()
    .pick([
        'nombreApellidos',
        'tipoTarjeta',
        'numeroTarjetaBloque1',
        'numeroTarjetaBloque2',
        'numeroTarjetaBloque3',
        'numeroTarjetaBloque4',
        'fechaExpiracionMes',
        'fechaExpiracionAnio',
        'codigoSeguridad'
    ])
    .validator({
        clean: true,
        filter: false
    }),
    run({
        nombreApellidos,
        tipoTarjeta,
        numeroTarjetaBloque1,
        numeroTarjetaBloque2,
        numeroTarjetaBloque3,
        numeroTarjetaBloque4,
        fechaExpiracionMes,
        fechaExpiracionAnio,
        codigoSeguridad
    }) {
        const documentoBancario = {
            propietario: this.userId,
            nombreApellidos,
            tipoTarjeta,
            numeroTarjetaBloque1,
            numeroTarjetaBloque2,
            numeroTarjetaBloque3,
            numeroTarjetaBloque4,
            fechaExpiracionMes,
            fechaExpiracionAnio,
            codigoSeguridad
        };
        console.log('esto es documentoBancario', documentoBancario);
        TarjetaBancaria.insert(documentoBancario);
    }
});

export const update = new ValidatedMethod({
    name: 'tarjetaBancaria.update',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: TarjetaBancaria
    .simpleSchema()
    .pick([
        '_id',
        'propietario',
        'nombreApellidos',
        'tipoTarjeta',
        'numeroTarjetaBloque1',
        'numeroTarjetaBloque2',
        'numeroTarjetaBloque3',
        'numeroTarjetaBloque4',
        'fechaExpiracionMes',
        'fechaExpiracionAnio',
        'codigoSeguridad'
    ])
    .validator({
        clean: true,
        filter: false
    }),
    run({
        _id,
        propietario,
        nombreApellidos,
        tipoTarjeta,
        numeroTarjetaBloque1,
        numeroTarjetaBloque2,
        numeroTarjetaBloque3,
        numeroTarjetaBloque4,
        fechaExpiracionMes,
        fechaExpiracionAnio,
        codigoSeguridad
    }) {
        TarjetaBancaria.update(_id, {
            $set: {
                'nombreApellidos': nombreApellidos,
                'tipoTarjeta': tipoTarjeta,
                'numeroTarjetaBloque1': numeroTarjetaBloque1,
                'numeroTarjetaBloque2': numeroTarjetaBloque2,
                'numeroTarjetaBloque3': numeroTarjetaBloque3,
                'numeroTarjetaBloque4': numeroTarjetaBloque4,
                'fechaExpiracionMes': fechaExpiracionMes,
                'fechaExpiracionAnio': fechaExpiracionAnio,
                'codigoSeguridad': codigoSeguridad
            },
        });
    }
});

export const remove = new ValidatedMethod({
  name: 'tarjetaBancaria.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
      error: '403',
      message: 'Para modificar estos datos necesitas iniciar sesión',
      reason: 'El usuario no loggeado',
  },
  validate: TarjetaBancaria
  .simpleSchema()
  .pick([
      '_id',
      'propietario',
      'nombreApellidos',
      'tipoTarjeta',
      'numeroTarjetaBloque1',
      'numeroTarjetaBloque2',
      'numeroTarjetaBloque3',
      'numeroTarjetaBloque4',
      'fechaExpiracionMes',
      'fechaExpiracionAnio',
      'codigoSeguridad'
  ])
  .validator({ clean: true, filter: false }),
  run({
      _id,
      propietario,
      nombreApellidos,
      tipoTarjeta,
      numeroTarjetaBloque1,
      numeroTarjetaBloque2,
      numeroTarjetaBloque3,
      numeroTarjetaBloque4,
      fechaExpiracionMes,
      fechaExpiracionAnio,
      codigoSeguridad
  }) {
    const documentoBancario = TarjetaBancaria.findOne(_id);
    console.log('llegó a remove', TarjetaBancaria);

    TarjetaBancaria.remove(_id);
  },
});

// Obtiene toda la lista de métodos para la collection tarjeta bancaria
const TARJETAS_BANCARIA_METODOS = _.pluck([insert, update, remove], 'name');
if (Meteor.isServer) {
    // Solo se permite 5 operaciones por conexión por segundo
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(TARJETAS_BANCARIA_METODOS, name);
        },
        // Limite de conexión por Id
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
