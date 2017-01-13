/**
 * Created by Héctor on 11/01/2017.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Accounts} from 'meteor/accounts-base';
import {name as Alertas} from '../../comun/alertas/alertas';
import {enviarCorreoVerificacion} from "../../../../api/agencias/methods";
import './verificarCorreo.html';

class VerificarCorreo {
    constructor($reactive, $scope, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);

        this.mensajeTitulo = 'Gracias por su Registro';

        this.msjAlerta = '';

        this.tipoAlerta = '';

        this.$state = $state;

        this.token = $stateParams.token;

        this.verificarLink();
    }

    verificarLink() {
        this.tipoAlerta = '';
        Accounts.verifyEmail(this.token,
            this.$bindToContext((err) => {
                if (err) {
                    this.linkExpirado = true;
                    this.msjAlerta = 'Lo sentimos, el link de verificación de correo ha expirado.';
                    this.tipoAlerta = 'danger';
                    this.mensajeTitulo = 'Registro';
                    console.log('No se pudo verificar el usuario por el siguiente motivo', err);
                } else {
                    this.linkExpirado = false;
                    this.msjAlerta = 'Exito al verificar el correo electrónico.';
                    this.tipoAlerta = 'success';
                    console.log('Mostrar al usuario la pantalla app.vacantes.publicadas');
                }
            })
        );
    }

    entrar() {
        console.log('El usuario pasa a la pantalla app.vacantes.publicadas');
        this.$state.go('app.vacantes.publicadas');
    }

    reenviarCorreoVerificacion() {
        console.log('Se envia código de verificación nuevamente');
        enviarCorreoVerificacion.call({}, this.$bindToContext((err, result) => {
            if (err) {
                console.log('Esto es el error por ejecutar enviarCorreoVerificacion.call:', err);
            } else {
                console.log('Esto es el result por ejecutar enviarCorreoVerificacion.call:', result);
            }
        }));
    }
}

const name = 'verificarCorreo';

// Crear módulo
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Alertas
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: VerificarCorreo
}).config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('inicio.verificarCorreo', {
        url: '/verify-email/:token',
        template: '<verificar-correo></verificar-correo>',
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
