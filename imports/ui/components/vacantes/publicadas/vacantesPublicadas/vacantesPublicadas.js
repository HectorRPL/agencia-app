/**
 * Created by jvltmtz on 22/07/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './vacantesPublicadas.html';
import {Vacantes} from '../../../../../api/vacantes/collection';
import { name as EliminarVacante } from '../../eliminarVacante/eliminarVacante';
import { name as Postulados } from '../postulados/postulados';


class VacantesPublicadas {
    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('vacantes.misPublicaciones');
        this.titulo = 'vista de vacantes';
        this.$uibModal = $uibModal;

        this.helpers({
            vacantes (){
                return Vacantes.find();
            }
        });
    }

    eliminar(vacanteId) {
        const id = vacanteId;
        this.$uibModal.open({
            animation: true,
            controllerAs: '$ctrl',
            controller: [ '$uibModalInstance', 'id', function ($uibModalInstance, id) {
                this.id = id;
                this.close = $uibModalInstance.close;
                this.dismiss = $uibModalInstance.dismiss;
            } ],
            template: '<eliminar-vacante id="$ctrl.id" dismiss="$ctrl.close()"></eliminar-vacante>',
            size: '',
            resolve: {
                id: function () {
                    return id;
                }
            }
        });
    }

    numPostulaciones(vacanteId){

    }

    numSeleccionados(vacanteId){

    }
}

const name = 'vacantesPublicadas';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        EliminarVacante,
        Postulados
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/${name}/${name}.html`,
        controllerAs: name,
        controller: VacantesPublicadas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.publicadas', {
            url: '/publicadas',
            template: '<vacantes-publicadas></vacantes-publicadas>'
        });
}
