/**
 * Created by jvltmtz on 13/12/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as Alertas} from '../../comun/alertas/alertas';
import {name as TicketCompra} from '../ticketCompra/ticketCompra';
import './modalCompra.html';
import {realizarCargo, guardarTarjeta} from '../../../../api/conekta/methods';
import {insertarCompra} from '../../../../api/compras/bitacoraCompras/methods';
import {eliminarTodos} from '../../../../api/compras/productosCarrito/methods';
import {actualizarSeleccionadas} from '../../../../api/postulaciones/methods';

class ModalCompra {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.descripcion = '';
        this.compraTerminada = false;
        this.transaccionId = '';
    }

    $onChanges() {
        this.comprar();
    }

    cancelar() {
        this.close(true);
    }

    comprar() {
        let  tmpInicio = new Date().getMilliseconds();
        realizarCargo.call({
                apiTokenId: this.datoscompra.tokenId,
                monto: this.datoscompra.montoTotal,
                numDemos: this.datoscompra.numDemos,
                numPromotor: this.datoscompra.numPromotor,
                numSupervisor: this.datoscompra.numSupervisor
            }, this.$bindToContext((err, result)=> {
                let res = err || result;
                let compraExito = true;
                if (err) {
                    this.compraTerminada = true;
                    compraExito = false;
                    res = {
                        codigoHttp: err.error,
                        mensajeError: err.reason,
                        codigoError: err.details
                    };
                    this.tipoMsjCompra = 'danger';
                    this.msjCompra = err.reason;
                    console.log('Error en millis ', new Date().getMilliseconds() - tmpInicio);
                } else {
                    this.agregarTarjeta();
                    this.actualizarPostulaciones();
                    console.log('Exito en millis ', new Date().getMilliseconds() - tmpInicio);
                }
                this.agregarBitacoraCompra(res, compraExito);
            console.log('FInal en millis ', new Date().getMilliseconds() - tmpInicio);
            })
        );
    }

    agregarBitacoraCompra(res, compraExito) {
        insertarCompra.call({apiRespuesta: res, compraExito: compraExito,
            tokenPeticion: this.datoscompra.tokenId}, this.$bindToContext((err, result) => {
            this.transaccionId = result;
            if (err) {
                console.log('Error al agregarBitacoraCompra', err);
            }
        }));
    }

    agregarTarjeta() {
        if (this.datoscompra.guardarTarjeta) {
            guardarTarjeta.call({apiTokenId: this.datoscompra.tokenId}, this.$bindToContext((err, result) => {
                if (err) {
                    this.tipoMsjTarjeta = 'danger';
                    this.msjTarjeta = 'Error al guardar la tarjeta. Porfavor intentelo mas tarde.';
                } else {
                    this.tipoMsjTarjeta = 'success';
                    this.msjTarjeta = 'Tarjeta guardada en forma correcta. Podras utilizarla en futuras compras.';
                }
            }));
        }
    }

    actualizarPostulaciones() {
        actualizarSeleccionadas.call({carritoId: this.datoscompra.carritoId}, this.$bindToContext((err, result)=> {
            if (err) {
                console.log('eror al metodo actualizarPostulaciones', err);
            } else {
                this.eliminarProductos();
                console.log('result al metodo actualizarPostulaciones ', result);
            }
        }));
    }

    eliminarProductos() {
        eliminarTodos.call({carritoId: this.datoscompra.carritoId}, this.$bindToContext((err, result)=> {
            if (err) {
                console.log('Error al eliminarProductos ');
            } else {
                console.log('SE eliminarProductos del carrito');
            }
            this.compraTerminada = true;
            this.tipoMsjCompra = 'success';
            this.msjCompra = 'Gracias por comprar en Demostradoras con Experiencia.';
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
            datoscompra: '<',
            close: '&',
            dismiss: '&'
        }
    });