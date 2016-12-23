/**
 * Created by jvltmtz on 13/12/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './modalCompra.html';

class ModalCompra {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.descripcion = '';
    }

    cancelar() {
        this.dismiss();
    }


}

const name = 'modalCompra';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: ModalCompra,
        bindings: {
            tokenid: '<',
        }
    });