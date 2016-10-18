import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './seleccionarCandidato.html';
import { contactar } from '../../../../../../api/postulaciones/methods.js';

class SeleccionarCandidato {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.respuesta = {
            mensaje: 'Al momento de seleccionar un vacante, se le descontará 30 creditos.',
            tipo: 'warning',
            icono: 'fa fa-exclamation-triangle',
            disable: false
        };

    }

    seleccionar() {
        contactar.call({postulacionId: this.id}, this.$bindToContext((err)=> {
            this.respuesta.disable = true;
            if (err) {
                this.respuesta.mensaje = err.reason;
                this.respuesta.tipo = 'danger';
                this.respuesta.icono = 'fa fa-times';
            } else {
                this.respuesta.mensaje = 'A seleccionado a un candidato, ver datos de contacto..';
                this.respuesta.tipo = 'success';
                this.respuesta.icono = 'fa fa-check';
            }
        }));
    }

    cancelar() {
        this.dismiss();
    }


}

const name = 'seleccionarCandidato';
// create a module

export default angular.module(name, [
    angularMeteor,
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
    controllerAs: name,
    controller: SeleccionarCandidato,
    bindings: {
        id: '<',
        close: '&',
        dismiss: '&'
    }
});
