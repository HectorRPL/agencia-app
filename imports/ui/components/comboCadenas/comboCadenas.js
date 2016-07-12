import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './comboCadenas.html';
import { Cadenas } from '../../../api/cadenas/index';


class ComboCadenas {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('cadenas');
    this.cadena = {};
    this.helpers({
      cadenas() {
        return Cadenas.find();
      }
    });
  }
}

const name = 'comboCadenas';
// create a module

export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
     cadena: '='
   },
  controller: ComboCadenas
});
