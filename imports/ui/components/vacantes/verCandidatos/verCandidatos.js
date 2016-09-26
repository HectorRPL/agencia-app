/**
 * Created by jvltmtz on 8/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { name as SeleccionarCandidato } from '../seleccionarCandidato/seleccionarCandidato';
import './verCandidatos.html';
import {Postulaciones} from '../../../../api/postulaciones/collection';


class VerCandidatos {
    constructor($scope, $reactive, $uibModal, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.candidatosOseleccionados', ()=> [{vacanteId: this.vacanteId}, {estado:1}]);
        this.titulo = 'vista de vacantes';
        this.$uibModal = $uibModal;

        this.helpers({
            postulados (){
                return Postulaciones.find();
            }
        });
    }


    contactar(postulacionId){
        this.$uibModal.open({
            animation: true,
            controllerAs: '$ctrl',
            controller: [ '$uibModalInstance', 'id', function ($uibModalInstance, id) {
                this.id = id;
                this.close = $uibModalInstance.close;
                this.dismiss = $uibModalInstance.dismiss;
            } ],
            template: '<seleccionar-candidato id="$ctrl.id" dismiss="$ctrl.close()"></seleccionar-candidato>',
            size: '',
            resolve: {
                id: function () {
                    return postulacionId;
                }
            }
        });
    }
}

const name = 'verCandidatos';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        SeleccionarCandidato
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: VerCandidatos
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.candidatos', {
            url: '/candidatos/:vacanteId',
            template: '<ver-candidatos></ver-candidatos>'
        });
}
