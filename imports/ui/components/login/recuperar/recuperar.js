/**
 * Created by jvltmtz on 9/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
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

        this.respuesta = {
            mostrar: false,
            mensaje: '',
            simbolo: 'fa fa-check',
            tipo: 'success'
        };


    }

    recuperar() {
        this.respuesta.mostrar = 'false';
        Accounts.forgotPassword(this.credentials, this.$bindToContext((err)=> {
            this.respuesta.mostrar = 'true';
            if (err) {
                this.respuesta.tipo = 'danger';
                this.respuesta.simbolo = 'fa fa-exclamation-triangle';
                if (err.error == '403') {
                    this.respuesta.mensaje = `El usuario ${this.credentials.email} no se encuentra registrado.`
                }
            } else {
                this.respuesta.tipo = 'success';
                this.respuesta.mensaje = `Para recuperar su contraseña la instrucciones fueron enviadas ${this.credentials.email}`
            }
        }));
    }
}

const name = 'recuperar';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/login/${name}/${name}.html`,
    controllerAs: name,
    controller: Recuperar
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
