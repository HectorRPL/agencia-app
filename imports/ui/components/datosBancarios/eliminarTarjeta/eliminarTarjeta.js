import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './eliminarTarjeta.html';

import { TarjetaBancaria } from '../../../../api/tarjetaBancaria';

class EliminarTarjeta {
  eliminar() {
    console.log(this.tarjeta);
    if (this.tarjeta) {
      TarjetaBancaria.remove(this.tarjeta._id);
    } else {
      console.log('No se eliminó ninguna tarjeta');
    }
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
