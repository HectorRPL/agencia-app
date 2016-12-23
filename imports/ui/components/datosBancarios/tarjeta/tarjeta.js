// modules
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'conekta.js/dist/conekta';
import {validarFechaExpiracion} from '../../../../api/conekta/methods'
import './tarjeta.html';


class Tarjeta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$scope = $scope;
        this.marca = '';
        this.datos = {};
        this.tokenid = '';
    }

}

const name = 'tarjeta';

// CREATE A MODULE
export default angular
    .module(name, [
        angularMeteor
    ]).component(name, {
        templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            datos: '=',
        },
        controller: Tarjeta,

    }).directive('numTarjeta', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.numTarjeta = function (modelValue, viewValue) {
                    let numTarjeta = modelValue || viewValue;
                   let result =  Conekta.card.validateNumber(numTarjeta);
                    if(result){
                        let marca = Conekta.card.getBrand(numTarjeta);
                        scope.tarjeta.marca =  marca;
                    }else {
                        scope.tarjeta.marca =  '';
                    }
                    return result
                };
            }
        };
    }).directive('mesIncorrecto', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.mesIncorrecto = function (modelValue, viewValue) {
                    let mes = modelValue || viewValue;
                    return Conekta.card.validateExpMonth(mes);
                };
            }
        };
    }).directive('anioIncorrecto', function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.anioIncorrecto = function (modelValue, viewValue) {
                    let anio = modelValue || viewValue;
                    return Conekta.card.validateExpYear(anio);
                };
            }
        };
    }).directive('fechaIncorrecta',  ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.fechaIncorrecta = function (modelValue, viewValue) {
                    console.log({
                        mesExpiracion: scope.tarjeta.datos.mesExpiracion,
                        anioExpiracion: modelValue || viewValue
                    });
                    return validarFechaExpiracion.callPromise({
                        mesExpiracion: scope.tarjeta.datos.mesExpiracion,
                        anioExpiracion: modelValue || viewValue
                    }).then(function(result){
                        if (!result) {
                            return $q.reject('fecha incorrecta');
                        }
                    }).catch(function(err){
                        return $q.reject('fecha incorrecta');
                    });

                };
            }
        };
    }]);


