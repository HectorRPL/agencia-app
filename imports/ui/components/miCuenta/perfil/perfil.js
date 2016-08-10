import angular        from 'angular';
import angularMeteor  from 'angular-meteor';
import uiRouter       from 'angular-ui-router';

import './perfil.html';

class Perfil {
    constructor($scope, $reactive) {
      'ngInject';
      $reactive(this).attach($scope);
  }
}

const name = 'perfil';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter
])
.component(name, {
  templateUrl: `imports/ui/components/miCuenta/${name}/${name}.html`,
  controllerAs: name,
  controller: Perfil
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('demos.perfil', {
      url: '/perfil',
      template: '<perfil></perfil>'
    });
}
