import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {ProductosCarrito} from '../../../../api/compras/productosCarrito/collection';
import {eliminarProductoId} from '../../../../api/compras/productosCarrito/methods';
import {name as OrdenCompra} from '../../compras/ordenCompra/ordenCompra';

import './carritoCompras.html';

class CarritoCompras {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);

        this.carritoId = $stateParams.carritoId;
        this.subscribe('productosCarritos.mostrar', ()=>[{carritoId: this.carritoId}]);
        this.subscribe('productosCarrito.count.candidatos', ()=>[{carritoId: this.carritoId}]);
        this.subscribe('productosCarrito.numDemostradoras', ()=>[{carritoId: this.carritoId}]);
        this.subscribe('productosCarrito.numPromotores', ()=>[{carritoId: this.carritoId}]);
        this.subscribe('productosCarrito.numSupervisores', ()=>[{carritoId: this.carritoId}]);

        this.helpers({
            productos(){
                return ProductosCarrito.find({carritoId: this.carritoId});
            },
            totalPersonalCarrito(){
               return Counts.get(`count.candidatos.carrito.${this.carritoId}`);
            },
            numDemosCarrito(){
                return Counts.get(`count.productos.carrito.demostradoras.${this.carritoId}`);
            },
            numPromotorCarrito(){
                return Counts.get(`count.productos.carrito.promotores.${this.carritoId}`);
            },
            numSupervisorCarrito(){
                return Counts.get(`count.productos.carrito.supervisores.${this.carritoId}`);
            }
        });

    }

    eliminiarProducto(productoId) {
        eliminarProductoId.call({productoId: productoId}, (err, result)=> {
            console.log(err);
        });

    }
}

const name = 'carritoCompras';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        OrdenCompra
    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: CarritoCompras
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.compras.carritoCompras', {
            url: '/carrito/:carritoId',
            template: '<carrito-compras></carrito-compras>'
        });
}
