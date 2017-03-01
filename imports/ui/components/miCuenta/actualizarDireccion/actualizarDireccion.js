import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import {obtenerColonias} from "../../../../api/codigosPostales/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as DCodigoPostal} from "../../directive/codigo-postal/codigo-postal.directive";
import "./actualizarDireccion.html";

class ActualizarDireccion {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            colonias() {
            }
        });

        this.direccion = {};
        this.agencia = {}; // Tentanivo, igual se borra
        this.colonias = [];
    }

    obtenerColonias() {
        obtenerColonias.call({
            cp: this.direccion.codigoPostal
        }, (err, result) => {
            this.colonias = result;
        });
    }
}

const name = 'actualizarDireccion';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        angularMessages,
        DCodigoPostal,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/miCuenta/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarDireccion
    });
