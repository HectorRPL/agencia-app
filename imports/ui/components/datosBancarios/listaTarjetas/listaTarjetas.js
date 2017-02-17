/**
 * Created by jvltmtz on 13/02/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngAnimate from "angular-animate";
import {TarjetasBancarias} from "../../../../api/tarjetasBancarias/collection";
import {name as EliminarTarjeta} from "../eliminarTarjeta/eliminarTarjeta";
import {name as AgregarTarjeta} from "../agregarTarjeta/agregarTarjeta";
import {eliminarTarjeta} from "../../../../api/tarjetasBancarias/methods";
import "./listaTarjetas.html";

class ListaTarjetas {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tarjetasBancarias');
        this.$uibModal = $uibModal;
        this.$state = $state;

        this.helpers({
            tarjetas() {
                return TarjetasBancarias.find();
            }
        });
    }

    verInsertar() {
        this.$state.go('app.tarjetas.agregar', {clienteId: this.tarjetas[0].apiClienteId});
    }

    abrirModal(tarjeta) {

        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'EliminarTarjeta',
            backdrop: false,
            size: 'sm',
            resolve: {
                tarjeta: function () {
                    return tarjeta;
                }
            }
        });

        modalInstance.result.then(function (respuesta) {
            console.log('Modal close at: ' + respuesta);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

}

const name = 'listaTarjetas';

// CREATE A MODULE
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate,
        EliminarTarjeta,
        AgregarTarjeta
    ])
    .component(name, {
        templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaTarjetas

    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tarjetas.lista', {
            url: '/lista',
            template: '<lista-tarjetas></lista-tarjetas>'
        });
}
