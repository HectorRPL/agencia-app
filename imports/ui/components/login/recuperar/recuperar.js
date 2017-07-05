/**
 * Created by jvltmtz on 9/11/16.
 */
import {name as Alertas} from "../../comun/alertas/alertas";
import {Accounts} from 'meteor/accounts-base';
import './recuperar.html';


class Recuperar {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.credentials = {
            email: ''
        };
    }

    recuperar() {
        Accounts.forgotPassword(this.credentials, this.$bindToContext((err)=> {
            if (err) {
                this.tipoMsj = 'danger';
                if (err.error == '403') {
                    this.msj = `El usuario ${this.credentials.email} no se encuentra registrado.`
                } else {
                    this.msj = 'El correo no pudó ser enviado, verifique su dirección o configuración de su correo.';
                }
            } else {
                this.tipoMsj = 'success';
                this.msj = `Para recuperar su contraseña la instrucciones fueron enviadas ${this.credentials.email}`
            }
        }));
    }
}

const name = 'recuperar';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/login/${name}/${name}.html`,
        controllerAs: name,
        controller: Recuperar
    })
    .directive('confInvalida', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.confInvalida = function (modelValue, viewValue) {
                    let confNewPass = modelValue || viewValue;
                    let newPass = scope.reiniciarContrasenia.newPassword;
                    return confNewPass === newPass;
                };
            }
        };
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.recuperar', {
            url: '/recuperar',
            template: '<recuperar></recuperar>'
        });
}
