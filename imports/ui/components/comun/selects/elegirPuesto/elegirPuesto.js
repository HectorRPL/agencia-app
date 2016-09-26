import angular from "angular";
import angularMeteor from "angular-meteor";
import {Puestos} from "../../../../../api/puestos/collection";
import "./elegirPuesto.html";

class ElegirPuesto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('puestos');

        this.helpers({
            puestos() {
                return Puestos.find();
            }
        });
    }

}

const name = 'elegirPuesto';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            puestoid: '='
        },
        controller: ElegirPuesto
    });
