import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './listaPaquetes.html';

import { Paquetes } from '../../../../api/paquetes';
import { name as DetallesCompra } from '../detallesCompra/detallesCompra';

class ListaPaquetes {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('paquetes');

    this.helpers({
      paquetes() {
        return Paquetes.find({});
      }
    });
  }
}
const name = 'listaPaquetes';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  DetallesCompra
])
.component(name, {
  templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
  controllerAs: name,
  controller: ListaPaquetes
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.compras.paquetes', {
      url: '/paquetes',
      template: '<lista-paquetes></lista-paquetes>'
    });
}
