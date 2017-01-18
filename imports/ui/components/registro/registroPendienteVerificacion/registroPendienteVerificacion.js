/**
 * Created by Héctor on 12/01/2017.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import './registroPendienteVerificacion.html';

class RegistroPendienteVerificacion {
    constructor($reactive, $scope) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mensajeTitulo = 'Sólo un paso más';
        this.mensajePrincipal = 'Antes de comenzar a publicar vacantes es importante que verifiquemos tu cuenta de correo electrónico. Te enviamos un e-mail de confirmación de registro, si no lo encuentras es es posible que se ecuentre en tu bandeja de correo no deseado. Es importante abrir tu correo en este mismo navegador';
    }
}

const name = 'registroPendienteVerificacion';

// Crear módulo
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: RegistroPendienteVerificacion
}).config(config);

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