import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './detalleVacante.html';
import {Vacantes} from '../../../../api/vacantes/collection';


class DetalleVacante {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.detalle', ()=> [{_id: this.vacanteId}]);

        this.helpers({
            vacante(){
                return Vacantes.findOne({
                    _id: $stateParams.vacanteId
                });
            }
        });
    }
}

const name = 'tabsDetalleVacante';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
    controllerAs: name,
    controller: DetalleVacante
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.vacantes.detalle', {
            url: '/detalle/:vacanteId',
            template: '<detalle-vacante></detalle-vacante>'
        });
}
