import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './checkboxDias.html';


class CheckboxDias {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.dias = [{
      'nombre': 'Lunes',
      'id': 'Lu',
      'activo': false
    }, {
      'nombre': 'Martes',
      'id': 'Ma',
      'activo': false
    }, {
      'nombre': 'Miércoles',
      'id': 'Mi',
      'activo': false
    }, {
      'nombre': 'Jueves',
      'id': 'Ju',
      'activo': false
    }, {
      'nombre': 'Viernes',
      'id': 'Vi',
      'activo': false
    }, {
      'nombre': 'Sábado',
      'id': 'Sa',
      'activo': false
    }, {
      'nombre': 'Domingo',
      'id': 'Do',
      'activo': false
    }, {
      'nombre': 'Diario',
      'id': 'Di',
      'activo': false
    }];
    this.disabledCheks = false;
  }

  validarDiario(index, activo) {
    if (index === 7) {
      if (activo) {
        this.disabledCheks = true;
      } else {
        this.disabledCheks = false;
      }
      this.dias.forEach((item, index) => {
        item.activo = activo;
      });
    }

  }



}

const name = 'checkboxDias';
// create a module

export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/checkBoxes/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    dias: '='
  },
  controller: CheckboxDias
});
