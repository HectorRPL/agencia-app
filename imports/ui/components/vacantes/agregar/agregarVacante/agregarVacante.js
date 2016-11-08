import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import "./agregarVacante.html";
import {name as CheckboxDias} from "../../../comun/checkBox/checkboxDias/checkboxDias";
import {name as CheckboxHabilidades} from "../../../comun/checkBox/checkboxHabilidades/checkboxHabilidades";
import {name as ElegirEstados} from "../../../comun/selects/elegirEstado/elegirEstado";
import {name as agregarTienda} from "../agregarTiendas/agregarTiendas";
import {name as  ElegirTalla} from "../../../comun/selects/elegirTalla/elegirTalla";
import {name as  ElegirEscuela} from "../../../comun/selects/elegirEscuela/elegirEscuela";
import {name as  ElegirPuesto} from "../../../comun/selects/elegirPuesto/elegirPuesto";
import {Session} from "meteor/session";

class AgregarVacante {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.vacante = {};
        this.vacante = Session.get('vacanteParaPub');
    }

    siguiente() {
        Session.setPersistent('vacanteParaPub', this.vacante);
        this.$state.go('^.tiendas');
    }
}

const name = 'agregarVacante';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    angularMessages,
    CheckboxDias,
    CheckboxHabilidades,
    agregarTienda,
    ElegirTalla,
    ElegirEscuela,
    ElegirPuesto,
    ElegirEstados
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/agregar/${name}/${name}.html`,
    controllerAs: name,
    controller: AgregarVacante
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.vacantes.agregar', {
            url: '/agregar',
            template: '<agregar-vacante></agregar-vacante>'
        });
}
