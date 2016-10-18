import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './tabsDetalleVacante.html';

class TabsDetalleVacante {
    constructor() {
        'ngInject';
    }
}

const name = 'tabsDetalleVacante';
// create a module

export default angular.module(name, [
    angularMeteor,
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
    controllerAs: name,
    controller: TabsDetalleVacante,
    bindings:{
        vacante: '<'
    }
});
