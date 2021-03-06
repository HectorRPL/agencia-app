/**
 * Created by jvltmtz on 22/07/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./vacantesPublicadas.html";
import {Vacantes} from "../../../../../api/vacantes/collection";
import {name as EliminarVacante} from "../../eliminarVacante/eliminarVacante";
import {name as NumPostulados} from "../../counts/numPostulados/numPostulados";
import {name as NumSeleccionados} from "../../counts/numSeleccionados/numSeleccionados";
import {name as Postulados} from "../postulados/postulados";
import {name as Seleccinados} from "../seleccionados/seleccionados";


class VacantesPublicadas {
    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('vacantes.misPublicaciones');
        this.titulo = 'Vacantes Publicadas';
        this.$uibModal = $uibModal;

        this.helpers({
            vacantes (){
                return Vacantes.find({}, {
                    sort: {fechaCreacion: -1}
                });
            }
        });
    }

    eliminar(vacanteId) {
        const id = vacanteId;

        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'EliminarVacante',
            backdrop: 'static',
            size: 'md',
            keyboard: false,
            resolve: {
                id: function () {
                    return id;
                }
            }
        });
    }
}

const name = 'vacantesPublicadas';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        EliminarVacante,
        Postulados,
        NumPostulados,
        NumSeleccionados,
        Seleccinados
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
