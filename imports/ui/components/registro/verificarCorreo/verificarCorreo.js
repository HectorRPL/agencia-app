/**
 * Created by Héctor on 11/01/2017.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Accounts} from 'meteor/accounts-base';
import {name as Alertas} from '../../comun/alertas/alertas';
import {enviarCorreoVerificacion} from "../../../../api/agencias/methods";
import {actualizarEstadoReg} from '../../../../api/bitacoraLoginAgencia/methods';
import {verificarCuenta} from '../../../../api/agencias/methods';
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
                console.log('Se intentará verificar este token:', this.token);
                if (err) {
                    this.linkExpirado = true;
                    this.msjAlerta = 'Lo sentimos, el link de verificación de correo ha expirado.';
                    this.tipoAlerta = 'danger';
                    this.mensajeTitulo = 'Registro';
                    console.log('No se pudo verificar el usuario por el siguiente motivo', err);
                } else {
                    actualizarEstadoReg.call({estado: 'app.vacantes.publicadas'}, this.$bindToContext((err)=>{
                        if (err) {
                            this.msjAlerta = 'En estos momentos estamos mejorando el sistema, por favor inténtelo más tarde.';
                            this.tipoAlerta = 'danger';
                        } else {
                            this.linkExpirado = false;
                            this.msjAlerta = 'Exito al verificar el correo electrónico.';
                            this.tipoAlerta = 'success';
                            verificarCuenta.call({}, this.$bindToContext((err, result) => {
                                if (err) {
                                    this.msjAlerta = 'Se ha verificado la cuenta correctamente pero hubo un evento inesperado, por favor contacte a soporte técnico', err;
                                    this.tipoAlerta = 'danger';
                                } else {
                                    console.log('Entró a verificarCuenta.call sin error', result);
                                };
                            }));
                        }
                    }));

                }
            })
        );
    }

    entrar() {
        console.log('El usuario pasa a la pantalla app.vacantes.publicadas');
        this.$state.go('app.vacantes.publicadas');
    }


    reenviarCorreoVerificacion() {
        enviarCorreoVerificacion.call({}, this.$bindToContext((error, result) => {
            if (error) {
                if (error.message === '[That user has no unverified email addresses.]') {
                    this.linkExpirado = false;
                    this.tipoAlerta = 'success';
                    this.msjAlerta = 'Este correo ya está verificado';
                } else if (error.message === '[AQUÍ VAMOS A PONER EL CASO DONDE EL CORREO NO EXISTE]') {

                    // ESTE IF AÚN ESTÁ SIN PRUEBAS, PORQUE EL MENSAJE DE ERROR QUE VIENE DEL SERVIDOR
                    // DEBIDO A QUE EL CORREO NO EXISTE; NO HAY SIDO CACHADO.

                    this.tipoAlerta = 'danger';
                    this.msjAlerta = 'No se encontró el email, asegúrese que el usuario no haya editado su email.';
                    console.log('Mensaje', error.message);
                }
            } else {
                console.log('La operación fue exitosa y se envía al usuario al login:', result);
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
