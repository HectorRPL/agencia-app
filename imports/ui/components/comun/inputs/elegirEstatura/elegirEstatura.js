import angular from "angular";
import angularMeteor from "angular-meteor";
import "./elegirEstatura.html";

class elegirEstatura {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'elegirEstatura';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            estatura: '='
        },
        controller: elegirEstatura
    });
