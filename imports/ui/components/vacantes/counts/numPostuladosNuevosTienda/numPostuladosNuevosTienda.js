/**
 * Created by jvltmtz on 25/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './numPostuladosNuevosTienda.html';

class NumPostuladosNuevosTienda {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tiendas.numPostuladosNuevos', ()=>[{tiendaId: this.getReactively('tiendaid')}]);
        this.helpers({
            totalPostuladosNuevosTienda(){
                return Counts.get(`count.postulados.nuevos.tienda.${this.tiendaid}`);
            }
        });
    }

}

const name = 'numPostuladosNuevosTienda';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/${name}/${name}.html`,
        controllerAs: name,
        controller: NumPostuladosNuevosTienda,
        bindings: {
            tiendaid: '<'
        }
    });
