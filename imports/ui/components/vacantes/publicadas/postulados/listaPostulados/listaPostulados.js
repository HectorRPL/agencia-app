/**
 * Created by jvltmtz on 8/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {name as SeleccionarCandidato} from '../seleccionarCandidato/seleccionarCandidato';
import './listaPostulados.html';
import {Postulaciones} from '../../../../../../api/postulaciones/collection';
import {agregarPostulacion, buscarPostulacion, eliminarPostulacion} from '../../../../../../api/compras/productosCarrito/methods';
import {actualizarPostVistoAgencia, actualizarSelecVistoAgencia} from '../../../../../../api/postulaciones/methods';
import {_} from "meteor/underscore";


class ListaPostulados {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.carritoId = $stateParams.carritoId;
        this.subscribe('postulaciones.postuladosOseleccionados', ()=> [{tiendaId: this.tiendaId}, {estado: 1}]);
        this.titulo = 'vista de vacantes';
        this.mostrarInfo = true;
        this.helpers({
            postulados (){
                return Postulaciones.find({tiendaId: this.tiendaId});
            }
        });

    }

    agregarCarrito(postulado, puestoId) {
        agregarPostulacion.call({postulacionId: postulado._id, carritoId: this.carritoId, puestoId: puestoId}, this.$bindToContext((err, result)=>{
            if(err){

            }else{
                postulado.seleccionado = true;
            }
        }));
    }

    eliminarCarrito(postulado) {
        eliminarPostulacion.call({postulacionId: postulado._id, carritoId: this.carritoId}, this.$bindToContext((err, result)=>{
            if(err){

            }else{
                postulado.seleccionado = false;
            }
        }));

    }


    existeEnCarroCompras(postulado) {
        postulado.mostrarInfo = false;
        buscarPostulacion.call({postulacionId: postulado._id},  this.$bindToContext((err, result)=>{
            postulado.seleccionado = result;

        }));
    }


    actualizarPostVistoAgencia(postulado) {

        if(!postulado.postVistoAgencia){
            actualizarPostVistoAgencia.call({postulacionId: postulado._id},
                this.$bindToContext((err, result)=> {

            }));
        }

    }

    actualizarSelecVistoAgencia(postulado){
        if(!postulado.selecVistoAgencia){
            actualizarSelecVistoAgencia.call({postulacionId: postulado._id},
                this.$bindToContext((err, result)=> {

                }));
        }
    }

    verificarActualizacion(postulado){
        if(postulado.estado === 1){
            this.actualizarPostVistoAgencia(postulado);
        }else{
            this.actualizarSelecVistoAgencia(postulado)
        }
        postulado.mostrarInfo = !postulado.mostrarInfo;
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
        controller: ListaPostulados,
        bindinds: {
            carritoid: '<'
        }
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.postulados.tienda', {
            url: '/tienda/:tiendaId/:carritoId',
            template: '<lista-postulados></lista-postulados>',
        });
}
