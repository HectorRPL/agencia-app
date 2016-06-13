import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { name as Agencia } from '../imports/ui/components/agencia/agencia';
import { name as Login } from '../imports/ui/components/login/login';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import uiRouter from 'angular-ui-router';

class Main {}

const name = 'main';

export default angular.module('agenciasApp', [
    angularMeteor,
    uiRouter,
    Agencia,
    Login
  ])
  .config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/login');

}
