import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
    obtenerColonias
} from '../../../../api/codigosPostales/methods.js';
class CodigosPostales {

}

const name = 'ngcp';

// Módulo
export default angular.module(name, [
  angularMeteor,
]).directive(name, ['$q', function($q) {
  return {
    restrict: 'EA',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      console.log('!Entró a la directiva!');
      ngModel.$asyncValidators.dCodigoPostal = function(modelValue, viewValue) {
        console.log('Imprimiendo modelValue:', modelValue);
        console.log('Imprimiendo viewValue:', viewValue);
        // let codigoPostal = modelValue || viewValue;
        // return obtenerColonias.call({
        //   cp: codigoPostal
        // },(err, result) => {
        //   console.log('esto es result:', result);
        //   scope.colonias = result;
        //   if (Array.isArray(result) && result.length === 0) {
        //     return $q.reject('No encontrado');
        //   }
        // });
      };
    }
  };
}]);
