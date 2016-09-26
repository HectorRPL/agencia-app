import angular from "angular";
import angularMeteor from "angular-meteor";
import {Escuelas} from "../../../../../api/escuelas/collection.js";
import "./elegirEscuela.html";

class ElegirEscuela {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('escuelas');

        this.escolaridad = '';

        this.helpers({
            escuelas() {
                return Escuelas.find();
            }
        });

    }
}

const name = 'elegirEscuela';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            escolaridad: '='
        },
        controller: ElegirEscuela
    });
