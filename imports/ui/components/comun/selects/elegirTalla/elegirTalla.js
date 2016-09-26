import angular from "angular";
import angularMeteor from "angular-meteor";
import {Tallas} from "../../../../../api/tallas/collection";
import "./elegirTalla.html";

class ElegirTalla {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tallas');

        this.talla = '';

        this.helpers({
            tallas() {
                return Tallas.find();
            }
        });

    }
}

const name = 'elegirTalla';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            talla: '='
        },
        controller: ElegirTalla
    });
