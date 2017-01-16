import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularUiBootstrap from "angular-ui-bootstrap";
import "./inicio.html";
import {name as Registro} from "../registro/registro";
import {name as Login} from "../login/login";
import {name as verificarCorreo} from '../registro/verificarCorreo/verificarCorreo';
import {name as registroPendienteVerificacion} from '../registro/registroPendienteVerificacion/registroPendienteVerificacion';


class Inicio {}

const name = 'inicio';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Registro,
    Login,
    angularUiBootstrap,
    verificarCorreo,
    registroPendienteVerificacion
  ]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Inicio
  })
  .config(config)
  .run(run);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('inicio', {
      url: '/agencia',
      template: '<inicio></inicio>',
      abstract: true
    });
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('inicio.login');
      }
    }
  );
}
