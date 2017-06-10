/**
 * Created by Héctor on 09/04/2017.
 */
import angular from "angular";
import {name as CodigosPostales} from "../../inputs/codigosPostales/codigosPostales";
import "./formaDireccion.html";

class FormaDireccion {
    constructor($scope) {
        'ngInject';
        this.direccion = {};
    }
}

const name = 'formaDireccion';

// create a module
export default angular
    .module(name, [
        CodigosPostales
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/direccion/${name}/${name}.html`,
        controllerAs: name,
        controller: FormaDireccion,
        bindings: {
            direccion: '='
        }
    });
