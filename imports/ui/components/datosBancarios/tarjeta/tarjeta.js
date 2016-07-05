// modules
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import { Meteor } from 'meteor/meteor';

import './tarjeta.html';

import { TarjetaBancaria } from '../../../../api/tarjetaBancaria';

class Tarjeta {
  constructor($scope, $reactive) {
    'ngInject';
    this.titulo = 'Datos Bancarios';

    $reactive(this).attach($scope);

    this.respuesta = {mostrar: false, mensaje: '', tipo: ''};

    this.subscribe('tarjetaBancaria');

    // LLENAR LOS COMBOS CON DATOS DE LA BASE
    this.helpers({
      tarjetaBancaria() {
        return TarjetaBancaria.findOne();
      }
    });
  }
  guardarCambios () {
    TarjetaBancaria.update({
      _id: this.tarjetaBancaria._id
    }, {
      $set: {
        nombreBanco: this.tarjetaBancaria.nombreBanco,
        tipoTarjeta: this.tarjetaBancaria.tipoTarjeta,
        numeroTarjetaBloque1: this.tarjetaBancaria.numeroTarjetaBloque1,
        numeroTarjetaBloque2: this.tarjetaBancaria.numeroTarjetaBloque2,
        numeroTarjetaBloque3: this.tarjetaBancaria.numeroTarjetaBloque3,
        numeroTarjetaBloque4: this.tarjetaBancaria.numeroTarjetaBloque4,
        fechaExpiracionMes: this.tarjetaBancaria.fechaExpiracionMes,
        fechaExpiracionAnio: this.tarjetaBancaria.fechaExpiracionAnio,
        codigoSeguridad: this.tarjetaBancaria.codigoSeguridad
      }
    }, this.$bindToContext((error) => {
      this.respuesta.mostrar = true;
      if (error) {
        this.respuesta.mensaje = 'No se pudieron realizar los cambios bancarios.';
        this.respuesta.tipo = 'danger';
      } else {
        this.respuesta.mensaje = 'Éxito al realizar los cambios bancarios.';
        this.respuesta.tipo = 'success';
      }
    }));

  }
  guardar(){
    this.tarjetaBancaria.owner = Meteor.user()._id;
    TarjetaBancaria.insert(this.tarjetaBancaria, this.$bindToContext((error) => {
      this.respuesta.mostrar = true;
      if (error) {
        this.respuesta.mensaje = 'No se pudieron guardar los datos de tarjeta bancarios.';
        this.respuesta.tipo = 'danger';
      } else {
        this.respuesta.mensaje = 'Éxito al guardar los datos de tarjeta bancarios.';
        this.respuesta.tipo = 'success';
      }
     }));
  }
}

const name = 'tarjeta';

// CREATE A MODULE
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  ngAnimate
])
.component(name, {
  templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
  controllerAs: name,
  controller: Tarjeta
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.tarjeta', {
      url: '/tarjeta',
      template: '<tarjeta></tarjeta>',
      resolve: {
        currentUser($q) {
          if (Meteor.userId() === null) {
            return $q.reject('AUTH_REQUIRED');
          } else {
            return $q.resolve();
          }
        }
      }
    });
}
