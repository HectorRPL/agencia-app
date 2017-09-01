/**
 * Created by Héctor on 12/01/2017.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {enviarCorreoVerificacion} from "../../../../api/agencias/methods";
import './registroPendienteVerificacion.html';

class RegistroPendienteVerificacion {
    constructor($reactive, $scope) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Sólo un paso más';
        this.mensajePrincipal = 'Antes de comenzar a publicar vacantes es importante que verifiquemos tu cuenta de correo electrónico. Te enviamos un e-mail de confirmación de registro, si no lo encuentras es es posible que se ecuentre en tu bandeja de correo no deseado. Se recomienda abrir su correo en este mismo navegador';
        this.msjAlerta = '';
        this.tipoAlerta = '';
        enviarCorreoVerificacion.call({}, this.$bindToContext((err, result) => {
            if (err) {
                this.msjAlerta = 'Error al enviar el correo electronico,';
                this.tipoAlerta = 'danger';
            } else {
                this.msjAlerta = 'El correo se ha enviado correctamente, porfavor revise su bandeja de entrada';
                this.tipoAlerta = 'success';
            }
        }));
    }
}

const name = 'registroPendienteVerificacion';

// Crear módulo
export default angular
    .module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: RegistroPendienteVerificacion
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('inicio.registroPendienteVerificacion', {
        url: '/registroPendienteVerificacion',
        template: '<registro-pendiente-verificacion></registro-pendiente-verificacion>',
        resolve: {
            currentUser($q) {
                if (Meteor.user() === null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    });
}
