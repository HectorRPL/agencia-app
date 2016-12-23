/**
 * Created by jvltmtz on 5/11/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './navigationCarrito.html';

class NavigationCarrito {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('productosCarrito.count.candidatos', ()=>[{carritoId:  this.getReactively('carritoid')}]);
        this.helpers({
            numCandidatosCarrito(){
                return Counts.get(`count.candidatos.carrito.${this.carritoid}`);
            }
        });
    }

}

const name = 'navigationCarrito';
// create a module

export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/navigation/${name}/${name}.html`,
    controllerAs: name,
    controller: NavigationCarrito,
    bindings: {
        carritoid: '<'
    }

});
