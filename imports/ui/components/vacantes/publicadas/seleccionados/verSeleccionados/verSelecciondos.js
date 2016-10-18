/**
 * Created by jvltmtz on 13/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './verSeleccionados.html';
import {Postulaciones} from '../../../../../../api/postulaciones/collection';
import {Perfiles} from '../../../../../../api/perfiles/collection';
import {Candidatos} from '../../../../../../api/candidatos/collection';


class VerSleccionados {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.candidatosOseleccionados', ()=> [{vacanteId: this.vacanteId}, {estado:2}]);
        this.titulo = 'vista de perfiles Seleccionados';
        this.$uibModal = $uibModal;

        this.helpers({
            postulados (){
                return Postulaciones.find();
            }
        });
    }

    verDatosGenerales(id) {
        return Candidatos.findOne({_id: id});
    }

    verPerfil(id) {
        return Perfiles.findOne({candidatoId: id});
    }

    /*contactar(postulacionId){
        console.log('[', postulacionId + ']');
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
    }*/
}

const name = 'verSeleccionados';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: VerSleccionados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.candidatos', {
            url: '/seleccionados/:vacanteId',
            template: '<ver-sleccionados></ver-sleccionados>'
        });
}
