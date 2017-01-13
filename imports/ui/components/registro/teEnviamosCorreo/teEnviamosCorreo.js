/**
 * Created by Héctor on 12/01/2017.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import './teEnviamosCorreo.html';

class TeEnviamosCorreo {
    constructor($reactive, $scope) {
        'ngInject';
        $reactive(this).attach($scope);
        this.mensajeTitulo = 'Gracias por tu Registro';
        this.mensajePrincipal = 'Te hemos enviado un email de confirmación de registro. Si no lo encuentras es es posible que se ecuentre en tu bandeja de correo no deseado.';
    }
}

const name = 'teEnviamosCorreo';

// Crear módulo
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: TeEnviamosCorreo
}).config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('inicio.teenviamoscorreo', {
        url: '/teenviamoscorreo',
        template: '<te-enviamos-correo></te-enviamos-correo>',
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
