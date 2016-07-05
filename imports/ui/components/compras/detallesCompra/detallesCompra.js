import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './detallesCompra.html';

class DetallesCompra {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.titulo = 'Detalles de Compra';

    this.precioUnitario = 30;
    this.importe = 30;
    this.descripcion = 'candidatos para cubrir vacantes con un perfil laboral tipo demostración, promotoría y/o supervisión.';
    this.subtotal = 600;
    this.descuento = 0;
    // this.importeDescuento = 600;
    this.iva = 0.16;
    // this.importeIva = 600;
    // this.total = 1 + 1;

  }
}

const name = 'detallesCompra';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter
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
    .state('app.detallesCompra', {
      url: '/agencia/comprar/:paqueteId',
      template: '<detalles-compra></detalles-compra>',
    });
}
