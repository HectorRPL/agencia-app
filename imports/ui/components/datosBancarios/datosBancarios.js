// modules
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngAnimate from 'angular-animate';

import { Meteor } from 'meteor/meteor';

import './datosBancarios.html';

import { TarjetaBancaria } from '../../../api/tarjetaBancaria';
import { name as EditarTarjeta } from './editarTarjeta/editarTarjeta';
import { name as EliminarTarjeta } from './eliminarTarjeta/eliminarTarjeta';
import { name as AgregarTarjeta } from './agregarTarjeta/agregarTarjeta';

class DatosBancarios {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('tarjetaBancaria');

    this.titulo = 'Datos Bancarios';

    this.helpers({
      tarjeta() {
        return TarjetaBancaria.findOne();
      }
    });
  }
}

const name = 'datosBancarios';

// CREATE A MODULE
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  uiBootstrap,
  ngAnimate,
  EditarTarjeta,
  EliminarTarjeta,
  AgregarTarjeta,
])
.component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: DatosBancarios
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.datosBancarios', {
      url: '/datosbancarios',
      template: '<datos-bancarios></datos-bancarios>',
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
