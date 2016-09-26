import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import uiBootstrap from "angular-ui-bootstrap";
import angularMessages from "angular-messages";
import "./agregarVacante.html";
import {name as CheckboxDias} from "../../comun/checkBox/checkboxDias/checkboxDias";
import {name as CheckboxHabilidades} from "../../comun/checkBox/checkboxHabilidades/checkboxHabilidades";
import {name as VacanteXtienda} from "../vacanteXtienda/vacanteXtienda";
import {name as  ElegirTalla} from "../../comun/selects/elegirTalla/elegirTalla";
import {name as  ElegirEscuela} from "../../comun/selects/elegirEscuela/elegirEscuela";
import {name as  ElegirPuesto} from "../../comun/selects/elegirPuesto/elegirPuesto";
import {Session} from "meteor/session";

class AgregarVacante {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('agencia');
        this.$state = $state;
        this.vacante = {};
        this.vacante = Session.get('vacanteParaPub');
        this.popup1 = {opened: false};
        this.popup2 = {opened: false};
        this.helpers({});
    }

    abrirCalendario1() {
        this.popup1.opened = true;
    }

    abrirCalendario2() {
        this.popup2.opened = true;
    }

    siguiente() {
        Session.set('vacanteParaPub', this.vacante);
        this.$state.go('^.vacanteXtienda');
    }
}

const name = 'agregarVacante';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    uiBootstrap,
    angularMessages,
    CheckboxDias,
    CheckboxHabilidades,
    VacanteXtienda,
    ElegirTalla,
    ElegirEscuela,
    ElegirPuesto
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
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
