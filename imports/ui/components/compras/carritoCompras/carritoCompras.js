import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {name as Tarjeta} from '../../datosBancarios/tarjeta/tarjeta';

import './carritoCompras.html';

class CarritoCompras {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tarjetaBancaria');

        this.titulo = 'Detalles de Compra';

        this.cantidad = 14;
        this.precioUnitario = 30;
        this.importe = 30;
        this.descripcion = 'candidatos para cubrir vacantes con un perfil laboral tipo demostración, promotoría y/o supervisión.';
        this.subtotal = 600;
        this.descuento = 0;
        this.iva = 0.16;

        // TEMPORAL para ejemplo:
        this.items = [
            {marca: "Suavitel", delMun:'Álvaro Obregón', tienda: "Walmart", sucursal: "Xochimilco", candidato: "dracas uración"},
            {marca: "Suavitel", delMun:'Azcapotzalco', tienda: "Soriana", sucursal: "Venustiano Carranza", candidato: "antortis pitiniteo"},
            {marca: "Suavitel", delMun:'Benito Juárez', tienda: "Bodega Aurrerá", sucursal: "Crucero", candidato: "anto astratén"},
            {marca: "Suavitel", delMun:'Cuajimalpa de Morelos', tienda: "Comercial Mexicana", sucursal: "Ahuerra Express", candidato: "uración aquero"},
            {marca: "Suavitel", delMun:'Magdalena Contreras', tienda: "Sanborns", sucursal: "Xochimilco", candidato: "arperofos uración"},
            {marca: "Suavitel", delMun:'Magdalena Contreras', tienda: "Soriana", sucursal: "Bolivar", candidato: "astratén uración"},
            {marca: "Suavitel", delMun:'Miguel Hidalgo', tienda: "Coppel", sucursal: "La Virgen", candidato: "aranteo arsoptía"},
            {marca: "Suavitel", delMun:'Milpa Alta', tienda: "Cosco", sucursal: "La Viga", candidato: "arperofos arperofos"},
            {marca: "Suavitel", delMun:'Magdalena Contreras', tienda: "Sumesa", sucursal: "Buen Tono", candidato: "arsoptía astratén"},
            {marca: "Suavitel", delMun:'Tláhuac', tienda: "Walmart", sucursal: "Súper Che Reforma", candidato: "diolo amareo"},
            {marca: "Suavitel", delMun:'Venustiano Carranza', tienda: "Bodega Aurrerá", sucursal: "Ánfora", candidato: "arsoptía himo"},
            {marca: "Suavitel", delMun:'Magdalena Contreras', tienda: "Comercial Mexicana", sucursal: "Tezontle", candidato: "pitiniteo pitiniteo"},
            {marca: "Suavitel", delMun:'Magdalena Contreras', tienda: "Bodega Auerrá", sucursal: "Zaragoza", candidato: "arperofos arperofos"},
            {marca: "Suavitel", delMun:'Xochimilco', tienda: "Chedraui", sucursal: "Súper Che Reforma", candidato: "odios alcone"}
        ];

    }
}

const name = 'carritoCompras';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        Tarjeta
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
            url: '/carrito',
            template: '<carrito-compras></carrito-compras>',
            resolve: {
                currentUser($q) {
                    if (Meteor.user() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}
