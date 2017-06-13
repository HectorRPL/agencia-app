import {name as Alertas} from '../../comun/alertas/alertas'
import "./cambiarContrasenia.html";

class CambiarContrasenia {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$scope = $scope;
        this.credentials = {};
    }

    cambiar() {
        this.tipoMsj = '';
        Accounts.changePassword(this.credentials.oldPassword, this.credentials.newPassword,
            this.$bindToContext((result, err)=> {
                if (err) {
                this.tipoMsj = 'danger';
                this.msj = 'Contraseña incorrecta.'
            } else {
                this.tipoMsj = 'success';
                this.msj = 'Actualizacion de contraseña correcta.'
            }
            this.limpiar();
        }));
    }

    limpiar(){
        if(this.$scope.cambiarContraseniaFrm){
            this.credentials = {};
            this.$scope.cambiarContraseniaFrm.$setDirty();
            this.$scope.cambiarContraseniaFrm.$setPristine();
            this.$scope.cambiarContraseniaFrm.$setUntouched();
        }
    }
}

const name = 'cambiarContrasenia';

// Módulo
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/miCuenta/${name}/${name}.html`,
        controllerAs: name,
        controller: CambiarContrasenia
    })
    .directive('confInvalida', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.confInvalida = function (modelValue, viewValue) {
                    let confNewPass = modelValue || viewValue;
                    let newPass= scope.cambiarContrasenia.credentials.newPassword;
                    return confNewPass === newPass;
                };
            }
        };
    });
