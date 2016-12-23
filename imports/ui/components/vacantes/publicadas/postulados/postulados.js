/**
 * Created by jvltmtz on 13/10/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Vacantes} from "../../../../../api/vacantes/collection";
import {Tiendas} from "../../../../../api/tiendas/collection";
import {name as TabsDetalleVacante} from "../../tabsDetalleVacante/tabsDetalleVacante";
import {name as ListaPostulados} from "./listaPostulados/listaPostulados";
import {name as EncabezadoCompras} from "../../../compras/encabezadoCompras/encabezadoCompras";
import {name as NumPostuladosTienda} from "../../counts/numPostuladosTienda/numPostuladosTienda";
import {name as NumPostuladosNuevosTienda} from "../../counts/numPostuladosNuevosTienda/numPostuladosNuevosTienda";
import {actualizarPostVistoAgencia} from '../../../../../api/postulaciones/methods.js';
import {CarritoCompras} from '../../../../../api/compras/carritoCompras/collection';
import "./postulados.html";

class Postulados {
    constructor($scope, $reactive, $stateParams, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.detalle', ()=> [{_id: this.vacanteId}]);
        this.subscribe('vacantes.tiendas', ()=> [{vacanteId: this.vacanteId}]);
        this.subscribe('carritoCompras.obtenerDatos');

        this.helpers({
            vacante() {
                return Vacantes.findOne({_id: this.vacanteId});
            },
            tiendas(){
                return Tiendas.find({vacanteId: this.vacanteId});
            },
            carritoCompras(){
                return CarritoCompras.findOne();
            }
        });

    }

    actualizarPostulaciones(tiendaId, carritoId) {
        console.log('actualizarPostulaciones el front');
        actualizarPostVistoAgencia.call({tiendaId: tiendaId}, this.$bindToContext((error, result)=> {
            if (error) {
                console.log(error);
                this.respuesta = this.danger;
            } else {
                console.log(result);
                this.$state.go();
            }
        }));
    }

}

const name = 'postulados';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        TabsDetalleVacante,
        ListaPostulados,
        EncabezadoCompras,
        NumPostuladosTienda,
        NumPostuladosNuevosTienda,

    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/${name}/${name}.html`,
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
