import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import "./registro.html";
import {Accounts} from "meteor/accounts-base";
import {Roles} from "meteor/alanning:roles";
import {obtenerColonias} from "../../../api/codigosPostales/methods";
import {enviarCorreoVerificacion} from "../../../api/agencias/methods";

const tipoUsuario = 'agencia:';

class Registro {

    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;
        this.colonias = [];
        this.direccion =  {
            codigoPostal: '',
            estado: '',
            delMpio: '',
            colonia: '',
            calle: '',
            numExt: '',
            numInt: '',
            estadoId: ''
        };

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: '',
            username: '',
            profile: {}
        };
        this.error = '';
    }

    crearUsuario() {
        this.error = '';
        this.credentials.email = this.credentials.email.toLowerCase();
        this.credentials.password = tipoUsuario + this.credentials.password;
        this.credentials.profile.tipoUsuario = tipoUsuario;
        this.credentials.profile.direccion = this.direccion;
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    if (this.error.error === 403) {
                        this.error.mensaje = `El CORREO ${this.credentials.email} y/o USUARIO ya se encuentra registrado`;
                    } else {
                        this.error.mensaje = err.message;
                    }
                } else {
                    enviarCorreoVerificacion.call({}, this.$bindToContext((err, result) => {
                     if (err) {
                         console.log('esto es el error por ejecutar enviarCorreoVerificacion.call():', err);
                     } else {
                         console.log('esto es el result (supuestamente exitoso) por ejecutar enviarCorreoVerificacion.call():', result);
                     }
                    }));
                    this.$state.go('inicio.registroPendienteVerificacion');
                }
            })
        );
    }
}

const name = 'registro';


// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    angularMessages
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Registro
}).directive('codigoPostal', ['$q', function ($q) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.codigopostal = function (modelValue, viewValue) {
                let codigoPostal = modelValue || viewValue;
                return obtenerColonias.callPromise({
                    cp: codigoPostal
                }).then(function(result){
                    scope.registro.colonias = result;
                    if (result.length === 0) {
                        scope.registro.direccion.estado = '';
                        scope.registro.direccion.delMpio = '';
                        return $q.reject('No encontrado');
                    } else {
                        scope.registro.direccion.estado = result[0].estado;
                        scope.registro.direccion.estadoId = result[0].codigoEstado;
                        scope.registro.direccion.delMpio = result[0].delegacionMunicipio;
                    }
                }).catch(function(err){
                    return $q.reject('No encontrado');
                });
            };
        }
    };
}]).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.registro', {
            url: '/registro',
            template: '<registro></registro>'
        });
}
