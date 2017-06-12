import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import {name as Alertas} from "../comun/alertas/alertas"
import "./registro.html";
import {Accounts} from "meteor/accounts-base";
import {Roles} from "meteor/alanning:roles";
import {obtenerColonias} from "../../../api/codigosPostales/methods";

const tipoUsuario = 'agencia:';

class Registro {

    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        this.titulo = 'Registro';

        this.colonias = [];
        this.direccion = {};

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: '',
            username: '',
            profile: {}
        };
    }

    crearUsuario() {
        this.credentials.email = this.credentials.email.toLowerCase();
        this.credentials.password = tipoUsuario + this.credentials.password;
        this.credentials.profile.tipoUsuario = tipoUsuario;
        this.credentials.profile.direccion = this.direccion;
        console.log(this.credentials);


        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    if (this.error.error === 403) {
                        this.tipoMsj ='danger';
                        this.msj = `El CORREO ${this.credentials.email} y/o USUARIO ya se encuentra registrado`;
                    } else {
                        this.msj = err.message;
                    }
                } else {
                    this.$state.go('inicio.registroPendienteVerificacion');
                }
            })
        );

    }
}

const name = 'registro';


// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        angularMessages,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Registro
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.registro', {
            url: '/registro',
            template: '<registro></registro>'
        });
}
