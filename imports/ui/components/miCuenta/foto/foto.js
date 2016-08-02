import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngAnimate from 'angular-animate';
import './foto.html';

class Foto {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
    this.nombreAgencia          = 'Agencia & Publicidad S.A. de C.V.';

    $scope.myInterval           = 10000;
    $scope.noWrapSlides         = false;
    $scope.active               = 0;
    var slides = $scope.slides  = [];
    var currIndex               = 0;

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://lorempixel.com/' + newWidth + '/300',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: currIndex++
      });
    };

    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
      $scope.addSlide();
    }
  }
}

const name = 'foto';

// Módulo
export default angular
.module(name, [
  angularMeteor,
  uiRouter,
  uiBootstrap,
  ngAnimate
])
.component(name, {
  templateUrl   : `imports/ui/components/miCuenta/${name}/${name}.html`,
  controllerAs  : name,
  controller    : Foto
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('demos.foto', {
      url: '/foto',
      template: '<foto></foto>'
    });
}
