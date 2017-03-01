import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import uiBootstrap from "angular-ui-bootstrap";
import ngAnimate from "angular-animate";
import "./miCuenta.html";
import {name as DatosPersonales} from "./datosPersonales/datosPersonales";
import {name as ActualizarDireccion} from "./actualizarDireccion/actualizarDireccion";
import {name as ConstraseniaCorreo} from "./constraseniaCorreo/constraseniaCorreo";
class MiCuenta {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    $scope.oneAtATime   = true;

    this.titulo = 'Mi Cuenta';
    this.subtitulo2 = 'Datos Fiscales';
    this.subtitulo3 = 'Dirección';
    this.subtitulo4 = 'Correo | Usuario | Contraseña';  }
}
const name = 'miCuenta';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  uiBootstrap,
  ngAnimate,
  DatosPersonales,
  ActualizarDireccion,
  ConstraseniaCorreo
])
.component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: MiCuenta
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.miCuenta', {
      url: '/micuenta',
      template: '<mi-cuenta></mi-cuenta>'
    });
}
