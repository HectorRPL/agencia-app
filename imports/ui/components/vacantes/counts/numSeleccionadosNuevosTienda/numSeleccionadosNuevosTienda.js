/**
 * Created by jvltmtz on 25/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './numSeleccionadosNuevosTienda.html';

class NumSeleccionadosNuevosTienda {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tiendas.numSeleccionadosNuevos', ()=>[{tiendaId: this.getReactively('tiendaid')}]);
        this.helpers({
            totalSeleccionadosNuevosTienda(){
                return Counts.get(`count.seleccionados.nuevos.tienda.${this.tiendaid}`);
            }
        });
    }

}

const name = 'numSeleccionadosNuevosTienda';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/counts/${name}/${name}.html`,
        controllerAs: name,
        controller: NumSeleccionadosNuevosTienda,
        bindings: {
            tiendaid: '<'
        }
    });