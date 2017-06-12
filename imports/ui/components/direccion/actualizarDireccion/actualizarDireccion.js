/**
 * Created by Héctor on 07/06/2017.
 */
import {actualizar} from "../../../../api/direcciones/methods";
import {name as FormaDireccion} from "../../comun/direccion/formaDireccion/formaDireccion";
import "./actualizarDireccion.html";

class ActualizarDireccion{
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.cargando = false;
    }

    actualizarDireccion() {
        this.cargando = true;
        delete this.direccion.colonias;
        delete this.direccion._id;
        delete this.direccion.fechaCreacion;
        actualizar.call(this.direccion, this.$bindToContext((err) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
                this.cargando = false;
            } else {
                this.msj = 'La dirección se actualizó exitosamente.';
                this.tipoMsj = 'success';
                this.cargando = false;
            }
        }));
    }
}

const name = 'actualizarDireccion';

export default angular
    .module(name, [
        FormaDireccion
    ])
    .component(name, {
        templateUrl: `imports/ui/components/direccion/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarDireccion,
        bindings: {
            direccion: '<',
        }
    });