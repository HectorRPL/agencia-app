import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import './datosPersonales.html';

class DatosPersonales {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
  }
}

const name = 'datosPersonales';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  ngMessages
])
.component(name, {
  templateUrl : `imports/ui/components/miCuenta/${name}/${name}.html`,
  controllerAs: name,
  controller  : DatosPersonales
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('demos.datosPersonales', {
      url: '/datosPersonales',
      template: '<datos-personales></datos-personales>'
    });
}
