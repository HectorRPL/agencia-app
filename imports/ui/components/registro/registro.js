import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import './registro.html';
import {
  Accounts
} from 'meteor/accounts-base';

class Registro {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: ''
    };

    this.error = '';
  }

  crearUsuario() {
    this.error = '';
    this.credentials.email = this.credentials.email.toLowerCase();
    this.credentials.password = 'agencia:' + this.credentials.password;
    Accounts.createUser(this.credentials,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
          if(this.error.error === 403){
            this.error.mensaje = `El correo ${this.credentials.email} ya se encuentra registrado`;
          }
        } else {
          this.$state.go('login');
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
    .state('registro', {
      url: '/registro',
      template: '<registro></registro>'
    });
}
