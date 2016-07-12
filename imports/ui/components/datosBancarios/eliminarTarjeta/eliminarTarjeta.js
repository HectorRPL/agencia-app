import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './eliminarTarjeta.html';

import { TarjetaBancaria } from '../../../../api/tarjetaBancaria/index.js';
import { remove } from '../../../../api/tarjetaBancaria/methods.js';


class EliminarTarjeta {
  constructor($scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);
    this.tarjeta = {};
    this.$state = $state;
    this.respuesta = {mostrar: false, mensaje: '', tipo: ''};
  }

  eliminar() {
    remove.call(this.tarjeta, this.$bindToContext((err) => {
      this.respuesta.mostrar = true;
      if (err) {
        this.respuesta.mensaje = 'No se pudieron realizar los cambios bancarios.';
        this.respuesta.tipo = 'danger';
      } else {
        this.$state.reload();
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
  controllerAs: name,
  bindings: { tarjeta: '<' },
  controller: EliminarTarjeta
});
