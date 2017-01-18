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
        console.log('El usuario ha ingresado al login y viene con este estado this.ultimoEstado.estado => ', this.ultimoEstado);

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
                                // this.$state.go('estado', {alertaUrl: 'ALERTA como parámetro'});
                                console.log('Cómo el usuario tiene un estado + URL de alerta sera enviado a this.ultimoEstado.estado => ', this.ultimoEstado.estado);
                            } else if (this.ultimoEstado === 'El usuario no viene con URL') {
                                console.log('El usuario no viene con URL token ni de alerta, esto es lo que trae this.ultimoEstado: => ', this.ultimoEstado)
                                if (result === 'inicio.registroPendienteVerificacion') {
                                    console.log('Se enviará un código de verificación porque el usuario tiene una bitácora el resulto tiene registroPendienteVerificacion:', result)
                                    enviarCorreoVerificacion.call({}, this.$bindToContext((err, respuesta) => {
                                        if (err) {
                                            this.msjAlerta = 'En estos momentos estamos mejorando el sistema, por favor inténtelo más tarde.', err;
                                            this.tipoAlerta = 'danger';
                                        } else {
                                            console.log('Cómo el usuario no vine con alerta se envió exitósamente un correo de verificación de URL, ya que su bitácora dice', result);
                                            this.$state.go(result);
                                        }
                                    }));
                                } else if (result === 'app.vacantes.publicadas') {
                                    console.log('Este es un casó normal, por que el usuario No tiene Token, tampoco estado+URL-Alerta lo enviaremos a lo que dice su bitácora => ', result);
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
