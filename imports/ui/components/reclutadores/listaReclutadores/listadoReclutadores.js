/**
 * Created by jvltmtz on 28/02/17.
 */
import angular from "angular";
import uiRouter from "angular-ui-router";
import angularMeteor from "angular-meteor";
import "./listaReclutadores.html";


class ListaReclutadores {
    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'vista de Lista Reclutadores';
        this.$uibModal = $uibModal;

    }

}

const name = 'listaReclutadores';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/reclutadores/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaReclutadores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.reclutadores.lista', {
            url: '/lista',
            template: '<lista-reclutadores></lista-reclutadores>'
        });
}
