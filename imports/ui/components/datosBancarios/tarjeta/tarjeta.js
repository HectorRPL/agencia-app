// modules
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import { Meteor } from 'meteor/meteor';
import { ValidationError } from 'meteor/mdg:validation-error';

import './tarjeta.html';

import { TarjetaBancaria } from '../../../../api/tarjetaBancaria/index.js';
import { insert } from '../../../../api/tarjetaBancaria/methods.js';
import { update } from '../../../../api/tarjetaBancaria/methods.js';

class Tarjeta {
  constructor($scope, $reactive) {
    'ngInject';
    this.titulo = 'Datos Bancarios';

    $reactive(this).attach($scope);

    this.respuesta = {mostrar: false, mensaje: '', tipo: ''};

    this.subscribe('tarjetaBancaria');

    // LLENAR LOS COMBOS CON DATOS DE LA BASE
    this.helpers({
      tarjetaBancaria() {
        return TarjetaBancaria.findOne();
      }
    });
  }

  guardarCambios() {
    update.call(this.tarjetaBancaria, this.$bindToContext((err) => {
      this.respuesta.mostrar = true;
      if (err) {
        this.respuesta.mensaje = 'No se pudieron realizar los cambios bancarios.';
        this.respuesta.tipo = 'danger';
      } else {
        this.respuesta.mensaje = 'Éxito al realizar los cambios bancarios.';
        this.respuesta.tipo = 'success';
      }
    }));
  }

  guardar() {
    insert.call(this.tarjetaBancaria, this.$bindToContext((err) => {
      this.respuesta.mostrar = true;
      if (err) {
        this.respuesta.mensaje = 'No se pudieron realizar los cambios bancarios.';
        this.respuesta.tipo = 'danger';
      } else {
        this.respuesta.mensaje = 'Éxito al realizar los cambios bancarios.';
        this.respuesta.tipo = 'success';
      }
    }));
  }
}

const name = 'tarjeta';

// CREATE A MODULE
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  ngAnimate
])
.component(name, {
  templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
  controllerAs: name,
  controller: Tarjeta
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.tarjeta', {
      url: '/tarjeta',
      template: '<tarjeta></tarjeta>',
      resolve: {
        currentUser($q) {
          if (Meteor.userId() === null) {
            return $q.reject('AUTH_REQUIRED');
          } else {
            return $q.resolve();
          }
        }
      }
    });
}
