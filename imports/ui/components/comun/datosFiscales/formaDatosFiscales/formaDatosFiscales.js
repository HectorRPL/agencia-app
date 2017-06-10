/**
 * Created by Héctor on 09/05/2017.
 */
import "./formaDatosFiscales.html";

class FormaDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }

}

const name = 'formaDatosFiscales';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/datosFiscales/${name}/${name}.html`,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            datos: '='
        }
    });
