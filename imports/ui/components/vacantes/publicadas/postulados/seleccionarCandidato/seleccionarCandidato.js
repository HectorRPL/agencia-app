import angular from "angular";
import angularMeteor from "angular-meteor";
import {name as Alertas} from "../../../../comun/alertas/alertas"
import "./seleccionarCandidato.html";
import {contactar} from "../../../../../../api/postulaciones/methods.js";

class SeleccionarCandidato {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }

    seleccionar() {
        contactar.call({postulacionId: this.id}, this.$bindToContext((err)=> {
            this.respuesta.disable = true;
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'A seleccionado a un candidato, ver datos de contacto.';
                this.tipoMsj = 'success';
            }
        }));
    }

    cancelar() {
        this.dismiss();
    }


}

const name = 'seleccionarCandidato';
// create a module

export default angular
    .module(name, [
        angularMeteor,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: SeleccionarCandidato,
        bindings: {
            id: '<',
            close: '&',
            dismiss: '&'
        }
    });
