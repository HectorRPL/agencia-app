import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { name as App } from '../imports/ui/components/app/app';
import { name as Inicio } from '../imports/ui/components/inicio/inicio';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Main {}

const name = 'main';

export default angular.module('agenciasApp', [
    angularMeteor,
    uiRouter,
    App,
    Inicio
  ])
  .config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/agencia/login');

}
