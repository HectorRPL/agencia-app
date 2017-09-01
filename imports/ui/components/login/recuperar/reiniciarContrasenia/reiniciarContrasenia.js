/**
 * Created by jvltmtz on 5/06/17.
 */
import {name as Alertas} from "../../../comun/alertas/alertas";
import {Accounts} from 'meteor/accounts-base';
import './reiniciarContrasenia.html';


class ReiniciarContrasenia {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = false;
        this.titulo = 'Recuperar Contraseña';
        this.$state = $state;
        this.token = $stateParams.token;
    }

    reiniciar() {
        Accounts.resetPassword(this.token, 'agencia:' + this.newPassword, this.$bindToContext((err)=> {
            if (err) {
                this.tipoMsj = 'danger';
                this.msj = 'El Token expiró, vuelva a generar otro. Si el problema persiste póngase en contacto con soporte técnico.';
            } else {
                this.tipoMsj = 'success';
                this.msj = 'Se ha reestablecido la contraseña en forma correcta';
            }
        }));
    }
}

const name = 'reiniciarContrasenia';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/login/recuperar/${name}/${name}.html`,
        controllerAs: name,
        controller: ReiniciarContrasenia
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.reiniciarContrasenia', {
            url: '/reset-password/:token',
            template: '<reiniciar-contrasenia></reiniciar-contrasenia>'
        });
}