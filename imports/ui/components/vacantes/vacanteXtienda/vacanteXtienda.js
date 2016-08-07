import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import './vacanteXtienda.html';
import { name as ComboEstados } from '../../comboEstados/comboEstados';
import { name as ComboCadenas } from '../../comboCadenas/comboCadenas';
import { insert } from '../../../../api/vacantes/methods.js';
import { Session } from 'meteor/session';
import { ValidationError } from 'meteor/mdg:validation-error';

class VacanteXtienda {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.datosFijos = {
      numeroVacantes: 3,
    };
    this.tienda = {};
    this.estado = {};
    this.cadena = {};
    this.vacante = Session.get('vacanteParaPub');
    this.respuesta = {
      mostrar: false,
      tipo: '',
      mensaje: ''
    };
    this.$scope = $scope;
    this.tiendas = [];
    this.totalVacantes = 0;
    this.helpers({

    });
  }
  agregar() {
    this.tiendas.forEach((item, index) => {
      const tempItem = angular.copy(item);
      insert.call(tempItem, (err) => {
        console.log(err);
        /*if (ValidationError.is(err)) {
          console.log(err);
        }*/
      });
    });
  }

  reset() {
    if (this.$scope.vacanteFrm) {
      this.$scope.vacanteFrm.$setDirty();
      this.$scope.vacanteFrm.$setPristine();
      this.$scope.vacanteFrm.$setUntouched();
    }
  }
  agregarTienda() {
    const infoVacante = {
      estadoId: this.estado._id,
      estadoDesc: this.estado.nombre,
      cadenaId: this.cadena._id,
      cadenaDesc: this.cadena.nombre,
      delMpio: this.tienda.delMpio,
      sucursal: this.tienda.sucursal,
      sueldo: this.datosFijos.sueldoDiario,
      numeroVacantes: this.datosFijos.numeroVacantes,
      tipoVacanteId: this.vacante.tipoVacante,
      marca: this.datosFijos.marca,
      perfil: this.vacante.perfil,
      horarios: this.vacante.horarios,
      entrevista: this.vacante.entrevista,
    };
    this.tiendas.push(infoVacante);
    this.calcularVacantes();
  }

  eliminarTienda(index) {
    this.tiendas.splice(index, 1);
    this.calcularVacantes();
  }

  calcularVacantes() {
    this.totalVacantes = this.tiendas.length * this.datosFijos.numeroVacantes;
  }




}

const name = 'vacanteXtienda';
// create a module

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  angularMessages,
  ComboEstados,
  ComboCadenas
]).component(name, {
  templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
  controllerAs: name,
  controller: VacanteXtienda
})

.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.vacantes.vacanteXtienda', {
      url: '/tiendas',
      template: '<vacante-xtienda></vacante-xtienda>'
    });
}
