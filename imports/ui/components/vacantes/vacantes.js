import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as AgregarVacante} from './agregar/agregarVacante/agregarVacante';
import { name as VacantesPublicadas } from './publicadas/vacantesPublicadas/vacantesPublicadas';
import { name as DetalleVacante } from './tabsDetalleVacante/tabsDetalleVacante';

import './vacantes.html';

class Vacantes {
    constructor() {
        this.titulo = 'vista de vacantes';
    }
}

const name = 'vacantes';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        AgregarVacante,
        VacantesPublicadas,
        DetalleVacante
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Vacantes
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes', {
            url: '/vacantes',
            template: '<vacantes></vacantes>',
            abstract:true
        });
}
