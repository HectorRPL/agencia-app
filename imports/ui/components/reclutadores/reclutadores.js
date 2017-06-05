/**
 * Created by jvltmtz on 28/02/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {name as ListaReclutadores} from '../reclutadores/listaReclutadores/listadoReclutadores'
import "./reclutadores.html";

class Reclutadores {
    constructor() {
        this.titulo = 'vista de vacantes';
    }
}

const name = 'reclutadores';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ListaReclutadores
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Reclutadores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.reclutadores', {
            url: '/reclutadores',
            template: '<reclutadores></reclutadores>',
            abstract: true
        });
}