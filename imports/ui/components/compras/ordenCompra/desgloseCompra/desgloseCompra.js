/**
 * Created by jvltmtz on 6/12/16.
 */
import {DatosFinancieros} from '../../../../../api/datosFinancieros/collection';
import './desgloseCompra.html';

class DesgloseCompra {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('datosFinancieros', ()=>[{_id: '1'}]);
        this.descripcion = 'candidatos para cubrir vacantes.';

        this.helpers({
            datosFinancieros(){
                return DatosFinancieros.findOne({_id: '1'});
            }
        });
    }
}

const name = 'desgloseCompra';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/compras/ordenCompra/${name}/${name}.html`,
        controllerAs: name,
        controller: DesgloseCompra,
        bindings: {
            totalpersonal: '<',
            numdemos: '<',
            numpromotor: '<',
            numsupervisor: '<',
            precios: '='

        }
    });
