import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { TarjetaBancaria } from '../../../../api/tarjetaBancaria';
import { name as EditarTarjeta } from '../../datosBancarios/editarTarjeta/editarTarjeta';
import { name as AgregarTarjeta } from '../../datosBancarios/agregarTarjeta/agregarTarjeta';
import './detallesCompra.html';
import {
    insert
} from '../../../../api/compras/methods.js';

class DetallesCompra {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('tarjetaBancaria');

    this.titulo = 'Detalles de Compra';

    this.precioUnitario = 30;
    this.importe = 30;
    this.descripcion = 'candidatos para cubrir vacantes con un perfil laboral tipo demostración, promotoría y/o supervisión.';
    this.subtotal = 600;
    this.descuento = 0;
    this.iva = 0.16;

    // LLENAR LOS COMBOS CON DATOS DE LA BASE
    this.helpers({
      tarjeta() {
        return TarjetaBancaria.findOne();
      }
    });
  }

  comprar(){
    
  }
}

const name = 'detallesCompra';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  EditarTarjeta,
  AgregarTarjeta
])
.component(name, {
  templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
  controllerAs: name,
  controller: DetallesCompra
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.compras.sencillo', {
      url: '/sencillo',
      template: '<detalles-compra></detalles-compra>',
    });
}
