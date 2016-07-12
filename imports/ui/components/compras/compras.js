import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as ListaPaquetes } from './listaPaquetes/listaPaquetes';
import { name as DetallesCompra } from './detallesCompra/detallesCompra';
import { name as CompraSimple } from './compraSimple/compraSimple';

import './compras.html';

class Compras {
  constructor() {
    this.titulo = 'Selecciona un producto';
  }
}

const name = 'compras';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  ListaPaquetes,
  DetallesCompra,
  CompraSimple
])
.component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: Compras
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.compras', {
      url: '/compras',
      template: '<compras></compras>'
    });
}
