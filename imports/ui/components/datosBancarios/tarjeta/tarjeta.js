// modules
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMessages from 'angular-messages';

import './tarjeta.html';

import {getToken} from '../../../../api/braintree/methods.js';


class Tarjeta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tarjeta = {};


    }
}

const name = 'tarjeta';

// CREATE A MODULE
export default angular
    .module(name, [
        angularMeteor,
        angularMessages
    ]).component(name, {
        templateUrl: `imports/ui/components/datosBancarios/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            tarjeta: '='
        },
        controller: Tarjeta,

    });
