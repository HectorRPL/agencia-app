import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './app.html';

import {name as Navigation} from '../navigation/navigation';
import {name as Vacantes} from '../vacantes/vacantes';
import {name as Compras} from '../compras/compras';
import {name as DatosBancarios} from '../datosBancarios/datosBancarios';
import {name as MiCuenta} from '../miCuenta/miCuenta';

class app {
}

const name = 'app';
// create a module

export default angular.module(name, [
    angularMeteor,
    Navigation,
    Compras,
    DatosBancarios,
    Vacantes,
    MiCuenta
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: app
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app', {
            url: '/app',
            template: '<app></app>',
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
