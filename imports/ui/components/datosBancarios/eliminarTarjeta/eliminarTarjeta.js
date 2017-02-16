import angular from "angular";
import angularMeteor from "angular-meteor";
import {name as Alertas} from '../../comun/alertas/alertas';
import {borrarTarjeta} from "../../../../api/conekta/methods";
import "./eliminarTarjeta.html";


class EliminarTarjeta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.msj = 'Esta seguro de elimnar la tarjeta bancaria.';
        this.tipoMsj = 'warning';
    }

    cancelar() {
        this.modalInstance.dismiss('cerrado');
    }

    eliminar() {
        const tarjeta = {
            id: this.resolve.tarjeta._id,
            apiClienteId: this.resolve.tarjeta.apiClienteId
        };
        borrarTarjeta.call(tarjeta, this.$bindToContext((err) => {
            if (err) {
                console.log(err);
                this.msj = 'Error al eliminar la tarjeta bancaria, intente mas tarde.';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Se a eliminado la tarjeta en forma correcta.';
                this.tipoMsj = 'success';
            }
        }));
    }

}

const name = 'eliminarTarjeta';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            resolve: '<',
            modalInstance: '<'
        },
        controller: EliminarTarjeta
    });
