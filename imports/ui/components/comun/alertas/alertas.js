/**
 * Created by jvltmtz on 8/12/16.
 */
import angular from 'angular';
import './alertas.html';

class Alertas {
    constructor() {

    }
}

const name = 'alertas';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            mensaje: '<',
            tipo: '='
        },
        controller: Alertas
    });
