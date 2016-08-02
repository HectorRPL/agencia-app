import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import './registro.html';
import {
    Accounts
} from 'meteor/accounts-base';
import {
    Roles
} from 'meteor/alanning:roles';
import {
    obtenerColonias
} from '../../../api/codigosPostales/methods.js';
const tipoUsuario = 'agencia:';
class Registro {

  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: '',
      username:'',
      profile:''
    };

    this.error      = '';

    this.helpers({
      colonias() {
      }
    });

  }

  obtenerColonias() {
    obtenerColonias.call({
      cp: this.credentials.profile.direccion.codigoPostal
    }, (err, result) => {
      if (result.length === 0 || result === null) {
        this.credentials.profile.direccion.codigoPostal = 'Código Postal no valido';
      } else {
        console.log('this.colonias'                     , this.colonias);
        this.colonias = result;
        this.credentials.profile.direccion.estado = this.colonias[0].ciudad;
        this.credentials.profile.direccion.codigoEstado = this.colonias[0].codigoEstado;
        this.credentials.profile.direccion.delMpio = this.colonias[0].delegacionMunicipio;      }
    });
  }

  crearUsuario() {
    this.error = '';
    this.credentials.email = this.credentials.email.toLowerCase();
    this.credentials.password = tipoUsuario + this.credentials.password;
    this.credentials.profile.direccion.colonia = this.credentials.profile.direccion.colonia.colonia;
    this.credentials.profile.tipoUsuario = tipoUsuario;
    Accounts.createUser(this.credentials,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
          if(this.error.error === 403){
            this.error.mensaje = `El CORREO ${this.credentials.email} y/o USUARIO ya se encuentra registrado`;
          }
        } else {
          this.$state.go('app');
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
