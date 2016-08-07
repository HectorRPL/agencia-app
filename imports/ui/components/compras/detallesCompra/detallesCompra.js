import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './detallesCompra.html';
import { getToken } from '../../../../api/braintree/methods.js';
import {Meteor} from 'meteor/meteor';
import  braintreeWeb from 'braintree-web';

class DetallesCompra {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('tarjetaBancaria');

    this.titulo = 'Detalles de Compra';

    this.precioUnitario = 30;
    this.importe = 30;
    this.descripcion = 'candidatos para cubrir vacantes con un perfil laboral tipo demostración, promotoría y/o supervisión.';
    this.subtotal = 600;
    this.descuento = 0;
    this.iva = 0.16;

    // LLENAR LOS COMBOS CON DATOS DE LA BASE
    this.helpers({
      initBrainTree(){
        Meteor.call('getToken');
        /*
        getToken.call(1, (err, response)=>{
          console.log(err);
          console.log(response);
        });*/
        braintreeWeb.setup(tokenId, 'dropin', {
          container: 'payment-form'
        });
      }
    });
  }

  comprar(){


  }
}

const name = 'detallesCompra';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter
])
.component(name, {
  templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
  controllerAs: name,
  controller: DetallesCompra
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.compras.sencillo', {
      url: '/sencillo',
      template: '<detalles-compra></detalles-compra>',
    });
}
