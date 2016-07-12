import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import './agregarVacante.html';
import {
  name as CheckboxDias
} from '../../checkBoxes/checkboxDias/checkboxDias';
import {
  name as CheckboxHabilidades
} from '../../checkBoxes/checkboxHabilidades/checkboxHabilidades';
import {
  Agencia
} from '../../../../api/agencia/index';
import {
  Vacantes
} from '../../../../api/vacantes/index';
import {
  name as VacanteXtienda
} from '../vacanteXtienda/vacanteXtienda';
import {
  Session
} from 'meteor/session';

class AgregarVacante {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('agencia');
    this.$state = $state;
    this.vacante = {};
    this.vacante = Session.get('vacanteParaPub');

    this.helpers({
    });
  }
  siguiente() {
    Session.set('vacanteParaPub', this.vacante);
    this.$state.go('^.vacanteXtienda');
  }


}

const name = 'agregarVacante';
// create a module

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  angularMessages,
  CheckboxDias,
  CheckboxHabilidades,
  VacanteXtienda
]).component(name, {
  templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
  controllerAs: name,
  controller: AgregarVacante
})

.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.agregarVacante', {
      url: '/agregarvacante',
      template: '<agregar-vacante></agregar-vacante>'
    });
}
