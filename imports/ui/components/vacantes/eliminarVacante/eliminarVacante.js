import angular from "angular";
import angularMeteor from "angular-meteor";
import "./eliminarVacante.html";
import {desactivar} from "../../../../api/vacantes/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";

class EliminarVacante {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.tipoMsj = 'warning';
        this.msj = 'Esta seguro que desea eliminar la vacante.';

    }

    eliminar() {
        desactivar.call({_id: this.resolve.id}, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'La vacante ha sido eliminada con exito.';
                this.tipoMsj = 'success';
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
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: EliminarVacante,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
