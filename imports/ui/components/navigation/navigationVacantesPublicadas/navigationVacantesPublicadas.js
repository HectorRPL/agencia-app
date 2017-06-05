/**
 * Created by jvltmtz on 30/05/17.
 */
import {Meteor} from "meteor/meteor";
import './navigationVacantesPublicadas.html';

class NavigationVacantesPublicadas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('misVacantes.numPostuladosNuevos');
        this.subscribe('misVacantes.numSeleccionadosNuevos');
        this.helpers({
            numNuevasPostulaciones(){
                return Counts.get(`count.mis.postulados.nuevos.${Meteor.userId()}`);
            },
            numNuevasSelecciones(){
                return Counts.get(`count.mis.seleccionados.nuevos.${Meteor.userId()}`);
            }
        });
    }

}

const name = 'navigationVacantesPublicadas';
// create a module

export default angular.module(name, []).component(name, {
    templateUrl: `imports/ui/components/navigation/${name}/${name}.html`,
    controllerAs: name,
    controller: NavigationVacantesPublicadas
});