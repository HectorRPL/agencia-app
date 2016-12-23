/**
 * Created by jvltmtz on 13/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './listaSeleccionados.html';
import {Postulaciones} from '../../../../../../api/postulaciones/collection';


class ListaSleccionados {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.candidatosOseleccionados', ()=> [{vacanteId: this.vacanteId}, {estado:2}]);
        this.titulo = 'vista de perfiles Seleccionados';

        this.helpers({
            seleccionados (){
                return Postulaciones.find({$and:[{tiendaId: this.tiendaId}, {estado: 1}]});
            }
        });
    }

}

const name = 'listaSeleccionados';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas//seleccionados/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaSleccionados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.seleccionados', {
            url: '/seleccionados/:vacanteId',
            template: '<ver-sleccionados></ver-sleccionados>'
        });
}
