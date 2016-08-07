import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './app.html';

import {  name as Navigation } from '../navigation/navigation';
import {  name as Vacantes} from '../vacantes/vacantes';
import { name as Compras } from '../compras/compras';
import { name as DatosBancarios } from '../datosBancarios/datosBancarios';

class app {}

const name = 'app';
// create a module

export default angular.module(name, [
    angularMeteor,
    Navigation,
    Compras,
    DatosBancarios,
    Vacantes
  ]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: app
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app', {
      url: '/app',
      template: '<app></app>'
    });
}
