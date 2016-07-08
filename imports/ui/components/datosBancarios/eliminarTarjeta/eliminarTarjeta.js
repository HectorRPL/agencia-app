import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './eliminarTarjeta.html';

import { TarjetaBancaria } from '../../../../api/tarjetaBancaria/index.js';
import { remove } from '../../../../api/tarjetaBancaria/methods.js';


class EliminarTarjeta {
  constructor($scope, $reactive) {
    'ngInject';

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

  eliminar() {
    remove.call(this.tarjetaBancaria, this.$bindToContext((err) => {
      this.respuesta.mostrar = true;
      if (err) {
        this.respuesta.mensaje = 'No se pudieron realizar los cambios bancarios.';
        this.respuesta.tipo = 'danger';
      } else {
        this.respuesta.mensaje = 'Éxito al realizar los cambios bancarios.';
        this.respuesta.tipo = 'success';
      }
    }));
  }
}

const name = 'eliminarTarjeta';

// Módulo
export default angular
.module(name, [
  angularMeteor
])
.component(name, {
  templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
  bindings: { tarjeta: '<' },
  controllerAs: name,
  controller: EliminarTarjeta
});
