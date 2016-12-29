import angular from "angular";
import angularMeteor from "angular-meteor";
import {Session} from "meteor/session";
import {Habilidades} from "../../../../../api/catalogos/habilidades/collection.js";
import "./checkboxHabilidades.html";

class CheckboxHabilidades {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('habilidades');
        this.habseleccionadas = Session.get('habilidadesVacante') || [];

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
            this.habseleccionadas.push(habilidad._id);
        } else {
            var index = this.habseleccionadas.indexOf(habilidad._id);
            this.habseleccionadas.splice(index, 1);
        }
    }

    activar(habilidad){
        var index = this.habseleccionadas.indexOf(habilidad._id);
        if(index > -1){
            habilidad.activo = true;
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
            habseleccionadas: '=',
            otrahabilidada: '='
        },
        controller: CheckboxHabilidades
    });
