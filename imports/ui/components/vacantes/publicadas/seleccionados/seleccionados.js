/**
 * Created by jvltmtz on 26/11/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Vacantes} from "../../../../../api/vacantes/collection";
import {Tiendas} from "../../../../../api/tiendas/collection";
import {name as TabsDetalleVacante} from "../../tabsDetalleVacante/tabsDetalleVacante";
import {name as ListaSeleccionados} from "./listaSeleccionados/listaSeleccionados";
import {name as EncabezadoCompras} from "../../../compras/encabezadoCompras/encabezadoCompras";
import {name as NumSeleccionadosTienda} from "../../counts/numSeleccionadosTienda/numSeleccionadosTienda";
import {name as NumSeleccionadosNuevosTienda} from "../../counts/numSeleccionadosNuevosTienda/numSeleccionadosNuevosTienda";
import {actualizarSelecVistoAgencia} from "../../../../../api/postulaciones/methods";
import "./seleccionados.html";

class Seleccionados {
    constructor($scope, $reactive, $stateParams, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.detalle', ()=> [{_id: this.vacanteId}]);
        this.subscribe('vacantes.tiendas', ()=> [{vacanteId: this.vacanteId}]);

        this.helpers({
            vacante() {
                return Vacantes.findOne({_id: this.vacanteId});
            },
            tiendas(){
                return Tiendas.find({vacanteId: this.vacanteId});
            }
        });

    }

    actualizarSelectPostulaciones(tiendaId) {
        actualizarSelecVistoAgencia.call({tiendaId: tiendaId}, this.$bindToContext((error, result)=> {
            if (error) {
                console.log(error);
                this.respuesta = this.danger;
            } else {
                this.$state.go('app.vacantes.seleccionados.tienda', {tiendaId: tiendaId, carritoId: carritoId});
            }
        }));
    }

}

const name = 'seleccionados';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        TabsDetalleVacante,
        ListaSeleccionados,
        EncabezadoCompras,
        NumSeleccionadosTienda,
        NumSeleccionadosNuevosTienda,

    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/${name}/${name}.html`,
        controllerAs: name,
        controller: Seleccionados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.seleccionados', {
            url: '/seleccionados/:vacanteId',
            template: '<seleccionados></seleccionados>',
        });
}
