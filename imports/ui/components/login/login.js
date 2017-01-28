import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {obtenerEstadoReg} from '../../../api/bitacoraLoginAgencia/methods';
import './login.html';
import {name as Registro} from '../registro/registro';
import {name as Recuperar} from './recuperar/recuperar';
import {name as Alertas} from '../comun/alertas/alertas';

class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.ultimoEstado = Session.get('ultimoEstado');

        this.credentials = {
            email: '',
            password: ''
        };
        this.msjAlerta = '';
        this.tipoAlerta = '';
    }

    login() {
        this.tipoAlerta = '';
        Meteor.loginWithPassword(this.credentials.email.toLowerCase(), 'agencia:' + this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.msjAlerta = 'Combinación de usuario y contraseña incorrectos.';
                    this.tipoAlerta = 'danger';
                } else {
                    obtenerEstadoReg.call({}, this.$bindToContext((err, result)=> {
                        if (err) {
                            this.msjAlerta = 'En estos momentos estamos mejorando el sistema, por favor inténtelo más tarde.';
                            this.tipoAlerta = 'danger';
                        } else {
                            if (this.ultimoEstado === undefined || this.ultimoEstado === null) {
                                this.$state.go(result);
                            } else {
                                this.$state.go(this.ultimoEstado.estado, this.ultimoEstado.parametros);
                                Session.clear('ultimoEstado');
                                this.ultimoEstado = '';
                            };
                        }
                    }));
                }
            })
        );
    }
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor,
    angularMessages,
    uiRouter,
    Registro,
    Recuperar,
    Alertas
]).component(name, {
    templateUrl: `imports/ui/components/login/${name}.html`,
    controllerAs: name,
    controller: Login
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.login', {
            url: '/login',
            template: '<login></login>'
        });
}
