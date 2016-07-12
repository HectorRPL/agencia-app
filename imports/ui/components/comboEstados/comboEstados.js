import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './comboEstados.html';
import { Estados } from '../../../api/estados/index';


class ComboEstados {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('estados');
    this.estado = {};
    this.helpers({
      estados() {
        return Estados.find();
      }
    });
  }
}

const name = 'comboEstados';
// create a module

export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
     estado: '='
   },
  controller: ComboEstados

});
