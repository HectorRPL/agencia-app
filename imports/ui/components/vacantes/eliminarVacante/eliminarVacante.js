import angular from "angular";
import angularMeteor from "angular-meteor";
import "./eliminarVacante.html";
import {desactivar} from "../../../../api/vacantes/methods.js";

class EliminarVacante {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.respuesta = {
            mensaje: 'Esta seguro que desea eliminar la vacante.',
            tipo: 'warning',
            icono: 'fa fa-exclamation-triangle',
            disable: false
        };

    }

    eliminar() {
        desactivar.call({_id: this.id}, this.$bindToContext((err)=> {
            this.respuesta.disable = true;
            if (err) {
                this.respuesta.mensaje = err.reason;
                this.respuesta.tipo = 'danger';
                this.respuesta.icono = 'fa fa-times';
            } else {
                this.respuesta.mensaje = 'La vacante ha sido eliminada con exito.';
                this.respuesta.tipo = 'success';
                this.respuesta.icono = 'fa fa-check';
            }
        }));
    }

    cancelar() {
        this.dismiss();
    }


}

const name = 'eliminarVacante';
// create a module

export default angular
    .module(name, [
        angularMeteor,
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: EliminarVacante,
        bindings: {
            id: '<',
            close: '&',
            dismiss: '&'
        }
    });
