import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Meteor} from "meteor/meteor";
import "./datosBancarios.html";
import {name as ListaTarjetas} from "./listaTarjetas/listaTarjetas";


class DatosBancarios {
  constructor($scope) {
    'ngInject';
    this.titulo = 'Datos Bancarios';

  }
}

const name = 'datosBancarios';

// CREATE A MODULE
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  ListaTarjetas
])
.component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: DatosBancarios
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.tarjetas', {
      url: '/tarjetas',
      template: '<datos-bancarios></datos-bancarios>',
      abstract: true,
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
