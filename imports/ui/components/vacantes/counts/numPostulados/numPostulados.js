/**
 * Created by jvltmtz on 25/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './numPostulados.html';

class NumPostulados {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('vacantes.numPostulados', ()=>[{vacanteId: this.getReactively('vacanteid')}]);
        this.subscribe('vacantes.numPostuladosNuevos', ()=>[{vacanteId: this.getReactively('vacanteid')}]);
        this.helpers({
            totalPostulados(){
                return Counts.get(`count.postulados.${this.vacanteid}`);
            },
            totalPostuladosNuevos(){
                return Counts.get(`count.postulados.nuevos.${this.vacanteid}`);
            }
        });
    }

}

const name = 'numPostulados';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter

    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/${name}/${name}.html`,
        controllerAs: name,
        controller: NumPostulados,
        bindings: {
            vacanteid: '<'
        }
    });
