import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './encabezadoCompras.html';

class EncabezadoCompras {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.subscribe('productosCarrito.count.candidatos');
        this.helpers({
            numCandidatosCarrito(){
                return Counts.get('count.candidatos.carrito');
            }
        });
    }
}

const name = 'encabezadoCompras';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter

    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: EncabezadoCompras
    });
