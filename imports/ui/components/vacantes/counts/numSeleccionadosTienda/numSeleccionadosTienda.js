/**
 * Created by jvltmtz on 25/11/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Counts} from "meteor/tmeasday:publish-counts";
import "./numSeleccionadosTienda.html";

class NumSeleccionadosTienda {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tiendas.numSeleccionados', ()=>[{tiendaId: this.getReactively('tiendaid')}]);
        this.helpers({
            totalSeleccionadosTienda(){
                return Counts.get(`count.seleccionados.tienda.${this.tiendaid}`);
            }
        });
    }

}

const name = 'numSeleccionadosTienda';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/counts/${name}/${name}.html`,
        controllerAs: name,
        controller: NumSeleccionadosTienda,
        bindings: {
            tiendaid: '<'
        }
    });
