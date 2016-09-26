import angular from "angular";
import angularMeteor from "angular-meteor";
import "./elegirCadena.html";
import {Cadenas} from "../../../../../api/cadenas/collection";


class ElegirCadenas {
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

const name = 'elegirCadena';
// create a module

export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        cadenaid: '='
    },
    controller: ElegirCadenas
});
