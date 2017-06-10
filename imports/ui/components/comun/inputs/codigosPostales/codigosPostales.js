/**
 * Created by Héctor on 29/03/2017.
 */
import {obtenerColonias} from "../../../../../api/codigosPostales/methods";
import "./codigosPostales.html";

class CodigosPostales {
    constructor($scope) {
        'ngInject';
        this.colonias = {};
        this.direccion = {};
    }
}

const name = 'codigosPostales';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            direccion: '='
        },
        controller: CodigosPostales
    })
    .directive('cpInvalido', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.cpinvalido = function (modelValue, viewValue) {
                    let codigoPostal = modelValue || viewValue;
                    return obtenerColonias.callPromise({
                        cp: codigoPostal
                    }).then(function (result) {
                        scope.codigosPostales.direccion.colonias = result;
                        console.log('llega a la lina 39');

                        if (result.length === 0) {

                            scope.codigosPostales.direccion.estado = '';
                            scope.codigosPostales.direccion.delMpio = '';
                            return $q.reject('No encontrado');
                        } else {

                            scope.codigosPostales.direccion.estado = result[0].estado;
                            scope.codigosPostales.direccion.estadoId = result[0].codigoEstado;
                            scope.codigosPostales.direccion.delMpio = result[0].delegacionMunicipio;
                        }
                    }).catch(function (err) { // cacha el error (¿dos veces?)
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);