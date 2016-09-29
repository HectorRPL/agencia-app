import angular from "angular";
import angularMeteor from "angular-meteor";
import {Experiencias} from "../../../../../api/experiencias/collection.js";
import "./checkboxExperiencias.html";

class CheckboxExperiencias {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('experiencias');

        this.listado = [];
        this.otraexperiencia = '';

        this.otra = {
            'experiencia': 'Otra',
            '_id': 'Otra',
            'activo': false
        };

        this.checkBoxNgModel = '';
        this.temporal = '';

        this.helpers({
            datosExperiencias() {
                return Experiencias.find();
            }
        });

    }

    agregarOEliminar(experiencia) {

      var index = this.listado.indexOf(experiencia._id);

        if (experiencia.activo === true && index === -1) {
            this.listado.push(experiencia._id);
        } else if (experiencia.activo === false && index > -1) {
          this.listado.splice(index, 1);
        } 
    }

    agregarOtraHab() {
        if (this.otra.activo) {
        }
    }

    habilitarCheck(experiencia) {
      if (Array.isArray(this.listado) && this.listado.length > 0) {
        let resultado = this.listado.indexOf(experiencia._id);
        if (resultado > -1 ) {
          experiencia.activo = true;
        } else {
          experiencia.activo = false;
        }
      }
    }
}

const name = 'checkboxExperiencias';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkBox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            listado: '=',
            otraexperiencia: '='
        },
        controller: CheckboxExperiencias
    });
