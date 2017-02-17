// modules
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngAnimate from "angular-animate";
import {Meteor} from "meteor/meteor";
import {ValidationError} from "meteor/mdg:validation-error";
import "./agregarTarjeta.html";
import {name as Tarjeta} from "../tarjeta/tarjeta";
import {name as Alertas} from "../../comun/alertas/alertas";
import {agregarTarjeta} from "../../../../api/conekta/methods.js";
import 'conekta.js/dist/conekta';


class AgregarTarjeta {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        Conekta.setPublicKey('key_INzsPzyiYTSRUfxQwdav5wg');
        this.apiClienteId = $stateParams.clienteId;
        console.log($stateParams.clienteId);
        this.titulo = 'Datos Bancarios';
        this.apiTokenId = '';
        this.datos = {};
    }

    generarToken() {
        this.tipoMsj = '';
        console.log('generarToken ' );
        Conekta.Token.create(this.crearTarjetaConekta(), this.$bindToContext((token)=> {
            console.log(token);
            this.apiTokenId = token.id;
            if ('4000000000000002' === this.datos.numeroTarjeta) {
                this.apiTokenId = 'tok_test_card_declined'
            } else if ('4000000000000127' === this.datos.numeroTarjeta) {
                this.apiTokenId = 'tok_test_insufficient_funds'
            } else if ('4012888888881881' === this.datos.numeroTarjeta) {
                this.apiTokenId = 'tok_test_visa_1881'
            } else if ('5105105105105100' === this.datos.numeroTarjeta) {
                this.apiTokenId = 'tok_test_mastercard_5100'
            } else if ('371449635398431' === this.datos.numeroTarjeta) {
                this.apiTokenId = 'tok_test_amex_8431'
            }
            this.guardar();
        }), this.$bindToContext((error)=> {
            console.log(error);
            this.tipoMsj = 'danger';
            this.msj = error.message_to_purchaser;
        }));
    }

    crearTarjetaConekta() {
        const tarjetaAToken = {
            address: {},
            card: {
                number: this.datos.numeroTarjeta,
                name: this.datos.nombreTitular,
                exp_year: this.datos.anioExpiracion,
                exp_month: this.datos.mesExpiracion,
                cvc: this.datos.codigoSeguridad
            }
        };
        console.log(this.datos);
        return tarjetaAToken;
    }

    guardar() {
        console.log(' this.apiTokenId ', this.apiTokenId);
        console.log(' this.apiClienteId ', this.apiClienteId);
        const tarjeta = {
            apiTokenId: this.apiTokenId,
            apiClienteId: this.apiClienteId
        };

        agregarTarjeta.call(tarjeta, this.$bindToContext((err) => {
            if (err) {
                this.msj = err.message;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Éxito al realizar los cambios bancarios.';
                this.tipoMsj = 'success';
            }
        }));
    }
}

const name = 'agregarTarjeta';

// CREATE A MODULE
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate,
        Tarjeta,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarTarjeta

    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tarjetas.agregar', {
            url: '/agregar/:clienteId',
            template: '<agregar-tarjeta></agregar-tarjeta>'
        });
}
