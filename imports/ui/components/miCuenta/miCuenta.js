import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import uiBootstrap from "angular-ui-bootstrap";
import ngAnimate from "angular-animate";
import {DatosFiscales} from "../../../api/datosFiscales/collection";
import {Direcciones} from "../../../api/direcciones/collection";
import "./miCuenta.html";
import {name as ActualizarDatosFiscales} from "./actualizarDatosFiscales/actualizarDatosFiscales";
import {name as DatosPersonales} from "./datosPersonales/datosPersonales";
import {name as ActualizarDireccion} from "../direccion/actualizarDireccion/actualizarDireccion";
import {name as CambiarContrasenia} from "./cambiarContrasenia/cambiarContrasenia";

class MiCuenta {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

    this.direccion = {};

    // this.subscribe('datosFiscales.agencia');
    // this.helpers({
    //   datosFiscales(){
    //     return DatosFiscales.findOne();
    //   }
    // });


    this.subscribe('direcciones.agencia');
    this.helpers({
      direccion(){
        return Direcciones.findOne();
      }
    });

    $scope.oneAtATime   = true;

    this.titulo = 'Mi Cuenta';
    this.subtitulo1 = 'Facturación';
    this.subtitulo2 = 'Datos de Contacto';
    this.subtitulo3 = 'Dirección de Agencia';
    this.subtitulo4 = 'Cambiar Contraseña';
  }
}
const name = 'miCuenta';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  uiBootstrap,
  ngAnimate,
  ActualizarDatosFiscales,
  DatosPersonales,
  ActualizarDireccion,
  CambiarContrasenia
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
