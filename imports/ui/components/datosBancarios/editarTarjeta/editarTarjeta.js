import angular from "angular";
import angularMeteor from "angular-meteor";
import angularMessages from "angular-messages";
import "./editarTarjeta.html";
import {update} from "../../../../api/tarjetasBancarias/methods.js";

class EditarTarjeta {
  constructor($scope, $reactive){
    'ngInject';
    $reactive(this).attach($scope);
    this.tarjeta = {};
    this.respuesta = {
        mostrar: false,
        mensaje: '',
        tipo: ''
    };
  }

  guardarCambios() {
    update.call(this.tarjeta, this.$bindToContext((err) => {
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

const name = 'editarTarjeta';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  angularMessages
])
.component(name, {
  templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
  controllerAs: name,
  controller: EditarTarjeta,
  bindings: { tarjeta: '<' }
});
