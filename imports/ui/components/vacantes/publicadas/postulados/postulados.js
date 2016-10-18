/**
 * Created by jvltmtz on 13/10/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Vacantes} from '../../../../api/vacantes/collection';
import {Tiendas} from '../../../../api/tiendas/collection';
import {name as TabsDetalleVacante} from '../tabsDetalleVacante/tabsDetalleVacante';
import {name as VerPostulados} from '../postulados/verPostulados/verPostulados';

import './postulados.html';

class Postulados {
    constructor($scope, $reactive, $stateParams, $state) {
        'ngInject';
        this.titulo = 'vista de vacantes';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.detalle', ()=> [{_id: this.vacanteId}]);
        this.subscribe('vacantes.tiendas', ()=> [{vacanteId: this.vacanteId}]);

        this.helpers({
            vacante() {
                return Vacantes.findOne({
                    _id: this.vacanteId
                });
            },
            tiendas(){
                return Tiendas.find({});
            },
        });
    }
}

const name = 'postulados';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        TabsDetalleVacante,
        VerPostulados
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: Postulados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.postulados', {
            url: '/postulados/:vacanteId',
            template: '<postulados></postulados>',
        });
}
