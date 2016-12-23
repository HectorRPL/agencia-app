/**
 * Created by jvltmtz on 16/11/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {DatosFinancieros} from '../../../../../api/datosFinancieros/collection';
import "./ticketCompra.html";

class TicketCompra {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('productosCarrito.count.candidatos', ()=>[{carritoId: this.getReactively('carritoid')}]);
        this.subscribe('datosFinancieros');
        this.descripcion = 'candidatos para cubrir vacantes con un perfil laboral tipo demostración, promotoría y/o supervisión.';

        // TEMPORAL para ejemplo:
        this.helpers({
            numCandidatosCarrito(){
                return Counts.get(`count.candidatos.carrito.${this.carritoid}`);
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
        templateUrl: `imports/ui/components/compras/ordenCompra/${name}/${name}.html`,
        controllerAs: name,
        controller: TicketCompra,
        bindings: {
            carritoid: '<'

        }
    });
