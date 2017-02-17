import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {CarritoCompras} from '../../.././api/compras/carritoCompras/collection';
import {name as NavigationCarrito} from './navigationCarrito/navigationCarrito';
import './navigation.html';

class Navigation {
  constructor($scope, $reactive){
    'ngInject';
    $reactive(this).attach($scope);
    this.subscribe('carritoCompras.obtenerDatos');
    this.titulo='adasdasdads';
    this.helpers({
      carritoCompras(){
        return CarritoCompras.findOne();
      }
    });
  }
}

const name = 'navigation';
// create a module

export default angular
    .module(name, [
  angularMeteor,
  NavigationCarrito
])
    .component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: Navigation

});
