import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {name as CarritoCompras} from "./carritoCompras/carritoCompras";
import "./compras.html";

class Compras {
    constructor() {
        this.titulo = 'Selecciona un producto';
    }
}

const name = 'compras';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        CarritoCompras

    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Compras
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.compras', {
            url: '/compras',
            template: '<compras></compras>',
            abstract: true
        });
}
