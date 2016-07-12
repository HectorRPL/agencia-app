import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './checkboxHabilidades.html';


class CheckboxHabilidades {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.arrayHabilidades = [{
      'DisplayName': 'Facilidad de Palabra',
      'id': '1',
      'activo': false
    }, {
      'DisplayName': 'Buena Presentación',
      'id': '2',
      'activo': false
    }, {
      'DisplayName': 'Disp. de Trasladarse',
      'id': '3',
      'activo': false
    }, {
      'DisplayName': 'Gusto por las ventas',
      'id': '4',
      'activo': false
    }];
    this.otra = {
      'DisplayName': 'Otra',
      'id': 'Otra',
      'activo': false
    };
    this.otraHabilidadText = '';
    this.habilidades = ['','', '', '', ''];
  }
  agregarOEliminar(index, activo) {
    if (activo) {
      this.habilidades[index] = this.arrayHabilidades[index].DisplayName;
    }else{
      this.habilidades[index] = '';
    }
  }
  agregarOtraHab() {
    if (this.otra.activo) {
      this.habilidades[4] = this.otraHabilidadText;
    }else {
      this.habilidades[4] = '';
    }
  }
}

const name = 'checkboxHabilidades';
// create a module

export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/checkBoxes/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    habilidades: '='
  },
  controller: CheckboxHabilidades
});
