/**
 * Created by jvltmtz on 13/09/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./listaSeleccionados.html";
import {Postulaciones} from "../../../../../../api/postulaciones/collection";
import {actualizarSelecVistoAgencia} from "../../../../../../api/postulaciones/methods";


class ListaSeleccionados {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('postulaciones.postuladosOseleccionados', ()=> [{tiendaId: this.tiendaId}, {estado: 2}]);
        this.titulo = 'vista de perfiles Seleccionados';

        this.helpers({
            seleccionados (){
                return Postulaciones.find({$and: [{tiendaId: this.tiendaId}, {estado: 2}]});
            }
        });
    }

    actualizarSelecVistoAgencia(seleccionado) {
        if (!seleccionado.selecVistoAgencia) {
            actualizarSelecVistoAgencia.call({postulacionId: seleccionado._id},
                this.$bindToContext((err, result)=> {

                }));
        }
        seleccionado.mostrarInfo = !seleccionado.mostrarInfo;
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
        templateUrl: `imports/ui/components/vacantes/publicadas/seleccionados/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaSeleccionados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.seleccionados.tienda', {
            url: '/tienda/:tiendaId',
            template: '<lista-seleccionados></lista-seleccionados>'
        });
}

