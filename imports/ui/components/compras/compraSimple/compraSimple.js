import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./compraSimple.html";

class CompraSimple {
  constructor() {
    'ngInject';
    this.titulo = 'esto es compra sencilla';

  }
}

const name = 'compraSimple';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter
])
.component(name, {
  templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
  controllerAs: name,
  controller: CompraSimple
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.compraSimple', {
      url: '/compraunitaria',
      template: '<compra-simple></compra-simple>',
    });
}
