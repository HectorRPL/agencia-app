import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./callToActionComprarYa.html";

class CallToActionComprarYa {
    constructor() {}
}

const name = 'callToActionComprarYa';

export default angular
    .module(name, [
        angularMeteor,
        uiRouter

    ])
    .component(name, {
        templateUrl: `imports/ui/components/compras/${name}/${name}.html`,
        controllerAs: name,
        controller: CallToActionComprarYa
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.callToActionComprarYa', {
            url: '/callToActionComprarYa',
            template: '<call-to-action-comprar-ya></call-to-action-comprar-ya>'
        });
}
