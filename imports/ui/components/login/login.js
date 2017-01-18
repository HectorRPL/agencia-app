import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {obtenerEstadoReg} from '../../../api/bitacoraLoginAgencia/methods';
import {enviarCorreoVerificacion} from "../../../api/agencias/methods";
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

        if (this.ultimoEstado === undefined || this.ultimoEstado === null) {
            this.ultimoEstado = 'El usuario no viene con URL';
        };

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
                    console.log('Que es este error', err);
                } else {
                    obtenerEstadoReg.call({}, this.$bindToContext((err, result)=>{
                        if (err) {
                            this.msjAlerta = 'En estos momentos estamos mejorando el sistema, por favor inténtelo más tarde.';
                            this.tipoAlerta = 'danger';
                        } else {
                            if (this.ultimoEstado.estado === 'inicio.verificarCorreo') {
                                this.$state.go('inicio.verificarCorreo', {token: this.ultimoEstado.parametro.token});
                            } else if (this.ultimoEstado.estado === '**** AQUI VA LA EL ESTADO PARA ALERTAS*****' && result === 'app.vacantes.publicadas') {
                                // ESTE ES LA PARTE DONDE VAMOS A DIRIGIR AL USUARIO
                                // A SU ALERTA
                                this.$state.go('estado', {alertaUrl: 'ALERTA como parámetro'});
                            } else if (this.ultimoEstado === 'El usuario no viene con URL') {
                                if (result === 'inicio.registroPendienteVerificacion') {
                                    enviarCorreoVerificacion.call({}, this.$bindToContext((err, respuesta) => {
                                        if (err) {
                                            this.msjAlerta = 'NO ENTRARÁ PORQUE AL MOMENTO DE VERIFICAR EL CORREO HAY QUE CAMBIAR LA BITÁCORA', err;
                                            this.tipoAlerta = 'danger';
                                        } else {
                                            console.log('esto es el result (supuestamente exitoso) por ejecutar enviarCorreoVerificacion.call():', respuesta);
                                            this.$state.go(result);
                                        }
                                    }));
                                } else if (result === 'app.vacantes.publicadas') {
                                    this.$state.go('app.vacantes.publicadas');
                                } else {
                                    this.msjAlerta = 'En estos momentos estamos mejorando el sistema, por favor inténtelo más tarde.';
                                    this.tipoAlerta = 'danger';
                                }
                            }
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
