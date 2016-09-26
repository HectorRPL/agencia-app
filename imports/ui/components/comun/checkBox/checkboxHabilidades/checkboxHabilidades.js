import angular from "angular";
import angularMeteor from "angular-meteor";
import {Habilidades} from "../../../../../api/habilidades/collection.js";
import "./checkboxHabilidades.html";

class CheckboxHabilidades {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('habilidades');
        this.habilidades = {
            otra: '',
            listado: []
        };
        this.otra = {
            'habilidad': 'Otra',
            '_id': 'Otra',
            'activo': false
        };

        this.helpers({
            datosHabilidades() {
                return Habilidades.find();
            }
        });

    }

    agregarOEliminar(habilidad) {
        if (habilidad.activo === true) {
            this.habilidades.listado.push(habilidad._id);
        } else {
            var index = this.habilidades.listado.indexOf(habilidad._id);
            this.habilidades.listado.splice(index, 1);
        }
    }

    agregarOtraHab() {
        if (this.otra.activo) {
        }
    }
}

const name = 'checkboxHabilidades';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkBox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            habilidades: '='
        },
        controller: CheckboxHabilidades
    });
