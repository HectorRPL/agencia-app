import {actualizarDatosContacto} from "../../../../api/agencias/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";
import "./actualizarAgencia.html";

class ActualizarAgencia {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = false;
    }

    actualizar() {
        this.cargando = true;
        this.tipoMsj = '';
        delete this.datos._id;
        delete this.datos.correoElectronico;
        delete this.datos.emailVerificado;
        delete this.datos.fechaCreacion;


        console.log('ESTOS SON LOS DATOS QUE VAMOS A ENVIAR >>>>>> ', this.datos);

        actualizarDatosContacto.call(this.datos, this.$bindToContext((err) => {
            if (err) {
                console.log(err);
                this.msj = ' No se pudieron realizar los cambios.';
                this.tipoMsj = 'danger';
            } else {
                this.msj = ' Los cambios se guardaron correctamente.';
                this.tipoMsj = 'success';
            }
            this.cargando = false;
        }));
    }
}

const name = 'actualizarAgencia';

export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/agencia/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarAgencia,
        bindings: {
            datos: '<',
            id: '<'
        }
    });
