/**
 * Created by jvltmtz on 27/09/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import "./titulo.html";

class Titulo {
    constructor() {
        'ngInject';
    }

}

const name = 'titulo';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: Titulo,
        bindings: {
            titulo: '<'
        }
    });