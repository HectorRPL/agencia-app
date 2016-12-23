/**
 * Created by jvltmtz on 18/11/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import "./checkboxGuardarTarjeta.html";

class CheckboxGuardarTarjeta {
    constructor($scope) {
        'ngInject';
        this.guardar = true;
    }
}

const name = 'checkboxGuardarTarjeta';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkBox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            guardar: '='
        },
        controller: CheckboxGuardarTarjeta
    });
