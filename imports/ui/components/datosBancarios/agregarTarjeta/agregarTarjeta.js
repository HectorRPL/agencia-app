// modules
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import {
    Meteor
} from 'meteor/meteor';
import {
    ValidationError
} from 'meteor/mdg:validation-error';

import './agregarTarjeta.html';
import { name as Tarjeta } from '../tarjeta/tarjeta';
import {
    insert
} from '../../../../api/tarjetaBancaria/methods.js';

class AgregarTarjeta {
    constructor($scope, $reactive) {
        'ngInject';
        this.titulo = 'Datos Bancarios';

        $reactive(this).attach($scope);
        this.tarjeta = {};

        this.respuesta = {
            mostrar: false,
            mensaje: '',
            tipo: ''
        };
    }
    guardar() {
        insert.call(this.tarjeta, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = 'No se pudieron realizar los cambios bancarios.';
                this.respuesta.tipo = 'danger';
            } else {
                this.respuesta.mensaje = 'Éxito al realizar los cambios bancarios.';
                this.respuesta.tipo = 'success';
            }
        }));
    }
}

const name = 'agregarTarjeta';

// CREATE A MODULE
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate,
        Tarjeta
    ])
    .component(name, {
        templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarTarjeta

    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tarjeta', {
            url: '/agregar',
            template: '<agregar-tarjeta></agregar-tarjeta>',
            resolve: {
                currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}
