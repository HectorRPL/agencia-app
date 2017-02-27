/**
 * Created by jvltmtz on 13/12/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {Meteor} from "meteor/meteor";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as TicketCompra} from "../ticketCompra/ticketCompra";
import "./modalCompra.html";
import {realizarCargo, guardarTarjetaCompra} from "../../../../api/conekta/methods";
import {enviarTicket} from "../../../../api/compras/bitacoraCompras/methods";

class ModalCompra {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.descripcion = '';
        this.compraTerminada = false;
        this.ticketId = '';
    }

    $onChanges() {
        this.comprar();
    }

    cancelar() {
        this.modalInstance.dismiss('cerrado');
    }

    comprar() {
        const datosCompra = angular.copy(this.resolve.datosCompra);
        delete datosCompra.guardarTarjeta;
        realizarCargo.call(datosCompra, this.$bindToContext((err, result)=> {
                if (err) {
                    this.compraTerminada = true;
                    this.tipoMsjCompra = 'danger';
                    this.msjCompra = err.message;
                } else {
                    this.ticketId = result;
                    Meteor.defer(()=>{
                        enviarTicket.call({ticketId: this.ticketId});
                    });
                    if (this.resolve.datosCompra.guardarTarjeta) {
                        this.agregarTarjeta(datosCompra.apiTokenId);
                    }
                    this.tipoMsjCompra = 'success';
                    this.msjCompra = 'Gracias ';
                    this.compraTerminada = true;

                }
            })
        );
    }

    agregarTarjeta(apiTokenId) {
        guardarTarjetaCompra.call({apiTokenId:apiTokenId}, this.$bindToContext((err, result) => {
            if (err) {
                this.tipoMsjTarjeta = 'warning';
                this.msjTarjeta = 'No se pudó guardar la tarjeta. Porfavor intentelo mas tarde.';
            } else {
                this.tipoMsjTarjeta = 'success';
                this.msjTarjeta = 'Tarjeta guardada en forma correcta. Podras utilizarla en futuras compras.';
            }
        }));
    }


}

const name = 'modalCompra';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        Alertas,
        TicketCompra
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: ModalCompra,
        bindings: {
            resolve: '<',
            modalInstance: '<'
        }
    });