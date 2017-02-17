/**
 * Created by jvltmtz on 9/02/17.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {TarjetasBancarias} from "../../../../../api/tarjetasBancarias/collection";
import './seleccionarTarjeta.html';


class SeleccionarTarjeta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tarjetasBancarias');

        this.helpers({
            tarjetas(){
                return TarjetasBancarias.find();
            }
        });
    }

    seleccionar(tarjeta){
        tarjeta.seleccionada = !tarjeta.seleccionada;
    }



}

const name = 'seleccionarTarjeta';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/ordenCompra/${name}/${name}.html`,
        controllerAs: name,
        controller: SeleccionarTarjeta,
        bindings: {
            apitokenid: '<',
        }
    });
