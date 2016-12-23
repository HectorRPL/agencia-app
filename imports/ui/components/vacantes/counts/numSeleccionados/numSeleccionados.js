/**
 * Created by jvltmtz on 25/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './numSeleccionados.html';

class NumSeleccionados {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('vacantes.numSeleccionados', ()=>[{vacanteId: this.getReactively('vacanteid')}]);
        this.subscribe('vacantes.numSeleccionadosNuevos', ()=>[{vacanteId: this.getReactively('vacanteid')}]);
        this.helpers({
            totalSeleccionados(){
                return Counts.get(`count.seleccionados.${this.vacanteid}`);
            },
            totalSeleccionadosNuevos(){
                return Counts.get(`count.seleccionados.nuevos.${this.vacanteid}`);
            },

        });
    }
}

const name = 'numSeleccionados';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter

    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/counts/${name}/${name}.html`,
        controllerAs: name,
        controller: NumSeleccionados,
        bindings: {
            vacanteid: '<'
        }
    });
