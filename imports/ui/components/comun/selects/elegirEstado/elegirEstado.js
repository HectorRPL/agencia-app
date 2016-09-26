import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './elegirEstado.html';
import {Estados} from '../../../../../api/estados/collection';


class ElegirEstados {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('estados');
        this.helpers({
            estados() {
                return Estados.find();
            }
        });
    }
}

const name = 'elegirEstado';
// create a module

export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        estadoid: '='
    },
    controller: ElegirEstados

});
