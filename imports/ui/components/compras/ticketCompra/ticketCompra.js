/**
 * Created by jvltmtz on 16/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './ticketCompra.html';
import {BitacoraCompras} from '../../../../api/compras/bitacoraCompras/collection';
import {DatosFinancieros} from '../../../../api/datosFinancieros/collection';
import {InfoEmpresa} from '../../../../api/catalogos/infoEmpresa/collection';

class TicketCompra {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('datosFinancieros');
        this.subscribe('infoEmpresa');
        this.subscribe('bitacoraCompras.respuestaApi', ()=>[{_id: this.getReactively('id')}]);
        this.descripcion = '';

        this.helpers({
            datosCompra(){
                return BitacoraCompras.findOne({_id: this.getReactively('id')});
            },
            infoEmpresa(){
                return InfoEmpresa.findOne({_id: '1'});
            },
            datosFinancieros(){
                return DatosFinancieros.findOne({_id: '1'});
            }
        });
    }

}

const name = 'ticketCompra';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: TicketCompra,
        bindings: {
            id: '<',
        }
    });
