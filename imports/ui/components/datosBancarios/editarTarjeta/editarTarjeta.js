import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMessages from 'angular-messages';

import { Meteor } from 'meteor/meteor';

import './editarTarjeta.html';


class EditarTarjeta {}

const name = 'editarTarjeta';

// Módulo
export default angular
.module(name, [
  angularMeteor
])
.component(name, {
  templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
  controllerAs: name,
  controller: EditarTarjeta
});
