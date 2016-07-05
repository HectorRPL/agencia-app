import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './agencia.html';
import {
  name as Navigation
} from '../navigation/navigation';

import { name as Compras } from '../compras/compras';
import { name as DatosBancarios } from '../datosBancarios/datosBancarios';


class Agencia {}

const name = 'agencia';
// create a module

export default angular.module(name, [
    angularMeteor,
    Navigation,
    Compras,
    DatosBancarios
  ]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Agencia
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app', {
      url: '/app',
      template: '<agencia></agencia>'
    });
}
