/**
 * Created by jvltmtz on 5/11/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {name as Tarjeta} from "../../datosBancarios/tarjeta/tarjeta";
import {name as DesgloseCompra} from "./desgloseCompra/desgloseCompra";
import {name as SeleccionarTarjeta} from "./seleccionarTarjeta/seleccionarTarjeta";
import {name as CheckboxGuardarTarjeta} from "../../comun/checkBox/checkboxGuardarTarjeta/checkboxGuardarTarjeta";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as ModalCompra} from "../modalCompra/modalCompra";
import "conekta.js/dist/conekta";
import "./ordenCompra.html";

class OrdenCompra {
    constructor($scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Detalles de Compra';
        this.apiTokenId = '';
        this.precios = {};
        this.$uibModal = $uibModal;
        this.tarjeta = {};

        this.helpers({
            numTarjetas(){
                return Counts.get('numTarjetas');
            }
        });
        Conekta.setPublicKey('key_INzsPzyiYTSRUfxQwdav5wg');
    }


    comprarPrimeraVez() {
        this.$bindToContext(Conekta.Token.create(this.crearTarjetaConekta(), (token)=> {
            this.apiTokenId = token.id;
            if ('4000000000000002' === this.tarjeta.numeroTarjeta) {
                this.apiTokenId = 'tok_test_card_declined'
            } else if ('4000000000000127' === this.tarjeta.numeroTarjeta) {
                this.apiTokenId = 'tok_test_insufficient_funds'
            } else if ('4012888888881881' === this.tarjeta.numeroTarjeta) {
                this.apiTokenId = 'tok_test_visa_1881'
            } else if ('5105105105105100' === this.tarjeta.numeroTarjeta) {
                this.apiTokenId = 'tok_test_mastercard_5100'
            } else if ('371449635398431' === this.tarjeta.numeroTarjeta) {
                this.apiTokenId = 'tok_test_amex_8431'
            }
            this.realizarCompra();
        }, (error)=> {
            this.tipoMsj = 'danger';
            this.msj = error.message_to_purchaser;
        }));
    }

    crearTarjetaConekta() {
        const tarjetaAToken = {
            address: {},
            card: {
                number: this.tarjeta.numeroTarjeta,
                name: this.tarjeta.nombreTitular,
                exp_year: this.tarjeta.anioExpiracion,
                exp_month: this.tarjeta.mesExpiracion,
                cvc: this.tarjeta.codigoSeguridad
            }
        };
        return tarjetaAToken;
    }

    comprarTarjetaSelec() {
        this.guardarTarjeta = false;
        this.realizarCompra();
    }

    realizarCompra() {
        const precios = this.precios;
        const cantidadArt = {
            numDemos: this.numdemos,
            numSupervisor: this.numsupervisor,
            numPromotor: this.numpromotor,
            totalPersonal: this.totalpersonal,
        };
        const datos = {
            carritoId: this.carritoid,
            apiTokenId: this.apiTokenId,
            guardarTarjeta: this.guardarTarjeta,
            precios : precios,
            numProductos: cantidadArt
        };

        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'ModalCompra',
            backdrop: 'static',
            size: 'md',
            keyboard: false,
            resolve: {
                datosCompra: function () {
                    return datos;
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

const name = 'ordenCompra';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        Tarjeta,
        DesgloseCompra,
        CheckboxGuardarTarjeta,
        ModalCompra,
        SeleccionarTarjeta,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: OrdenCompra,
        bindings: {
            totalpersonal: '<',
            numdemos: '<',
            numpromotor: '<',
            numsupervisor: '<',
            carritoid: '<'
        }
    });

