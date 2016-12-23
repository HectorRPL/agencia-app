/**
 * Created by jvltmtz on 25/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './numPostuladosTienda.html';

class NumPostuladosTienda {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tiendas.numPostulados', ()=>[{tiendaId: this.getReactively('tiendaid')}]);
        this.helpers({
            totalPostuladosTienda(){
                return Counts.get(`count.postulados.tienda.${this.tiendaid}`);
            }
        });
    }

}

const name = 'numPostuladosTienda';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/${name}/${name}.html`,
        controllerAs: name,
        controller: NumPostuladosTienda,
        bindings: {
            tiendaid: '<'
        }
    });
