import angular from "angular";
import angularMeteor from "angular-meteor";
import "./checkboxDias.html";
import {DiasSemanales} from '../../../../../api/catalogos/diasSemanales/collection'

class CheckboxDias {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.disabledCheks = false;
        this.diasSemana = [
            {
                _id: 'Lu',
                descripcion: 'Lunes',
                activo: false
            },
            {
                _id: 'Ma',
                descripcion: 'Martes',
                activo: false
            },
            {
                _id: 'Mi',
                descripcion: 'Miercoles',
                activo: false
            },
            {
                _id: 'Ju',
                descripcion: 'Jueves',
                activo: false
            },
            {
                _id: 'Vi',
                descripcion: 'Viernes',
                activo: false
            },
            {
                _id: 'Sa',
                descripcion: 'Sábado',
                activo: false
            },
            {
                _id: 'Do',
                descripcion: 'Domingo',
                activo: false
            }];
        this.diario = {
            _id: 'Di',
            descripcion: 'Diario',
            activo: false
        };
        this.diasseleccionados = Session.get('diasVacante') || [];

    }

    validarDiario() {
        this.diasseleccionados = [];
        if (this.diario.activo) {
            this.disabledCheks = true;
            this.diasseleccionados.push('Di');
        } else {
            this.disabledCheks = false;
        }
        this.diasSemana.forEach(function (element, index) {
            element.activo = false;
        });
    }

    agregarOEliminar(dia) {
        if (dia.activo) {
            this.diasseleccionados.push(dia._id);
        } else {
            var index = this.buscarDia(dia._id);
            this.diasseleccionados.splice(index, 1);
        }
    }

    activar(dia) {
        if (this.buscarDia('Di') > -1) {
            this.disabledCheks = true;
            this.diario.activo = true;
        }
        var index = this.buscarDia(dia._id);
        if (index > -1) {
            dia.activo = true;
        }
    }

    buscarDia(id) {
        return this.diasseleccionados.indexOf(id);
    }


}

const name = 'checkboxDias';
// create a module

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkBox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            diasseleccionados: '='
        },
        controller: CheckboxDias
    });
