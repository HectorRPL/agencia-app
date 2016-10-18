/**
 * Created by jvltmtz on 8/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {name as SeleccionarCandidato} from '../seleccionarCandidato/seleccionarCandidato';
import './listaPostulados.html';
import {Postulaciones} from '../../../../../../api/postulaciones/collection';
import {Session} from 'meteor/session';
import {_} from "meteor/underscore";


class ListaPostulados {
    constructor($scope, $reactive, $uibModal, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('postulaciones.postuladosOseleccionados', ()=> [{tiendaId: this.tiendaId}, {estado: 1}]);
        this.titulo = 'vista de vacantes';
        this.$uibModal = $uibModal;
        this.seleccionados = Session.get('carritoCompras');

        this.helpers({
            postulados (){
                return Postulaciones.find();
            }
        });

    }


    contactar(postulacionId) {
        this.$uibModal.open({
            animation: true,
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance', 'id', function ($uibModalInstance, id) {
                this.id = id;
                this.close = $uibModalInstance.close;
                this.dismiss = $uibModalInstance.dismiss;
            }],
            template: '<seleccionar-candidato id="$ctrl.id" dismiss="$ctrl.close()"></seleccionar-candidato>',
            size: '',
            resolve: {
                id: function () {
                    return postulacionId;
                }
            }
        });
    }

    agregar(postulado) {
        let index = _.indexOf(this.seleccionados , postulado._id);
        if (postulado.seleccionado == false && index === -1) {
            this.seleccionados.push(postulado._id);
            postulado.seleccionado = true;
        } else if (postulado.seleccionado && index > -1) {
            this.seleccionados.splice(index, 1);
            postulado.seleccionado = false;
        }
        Session.set('carritoCompras', this.seleccionados);
    }

    seleccionarParaCarrito(postulado) {
        console.log('seleccionarParaCarrito ', postulado._id);
        let index = _.indexOf(Session.get('carritoCompras'), postulado._id);
        console.log('seleccionarParaCarrito ', index);
        if (index > -1) {
            postulado.seleccionado = true;
        } else {
            postulado.seleccionado = false;
        }
    }


}

const name = 'listaPostulados';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        SeleccionarCandidato
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/publicadas/postulados/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaPostulados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.postulados.tienda', {
            url: '/tienda/:tiendaId',
            template: '<lista-postulados></lista-postulados>'
        });
}
