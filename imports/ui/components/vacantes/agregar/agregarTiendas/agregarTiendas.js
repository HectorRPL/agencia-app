import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import "./vacanteXtienda.html";
import {name as ElegirCadenas} from "../../comun/selects/elegirCadena/elegirCadena";
import {insertVacante} from "../../../../api/vacantes/methods";
import {insertTienda} from "../../../../api/tiendas/methods";
import {Cadenas} from "../../../../api/cadenas/collection";
import {Session} from "meteor/session";
import {ValidationError} from "meteor/mdg:validation-error";
import {Estados} from '../../../../api/estados/collection';
import {Puestos} from '../../../../api/puestos/collection';
import {Escuelas} from '../../../../api/escuelas/collection';

class VacanteXtienda {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('estados');
        this.subscribe('puestos');
        this.subscribe('escuelas');
        this.numVacantes = 5;
        this.tienda = {};
        this.vacante = Session.get('vacanteParaPub');
        this.respuestaExito = {
            mostrar: false,
            mensaje: ''
        };
        this.respuestaError = {
            mostrar: false,
            mensaje: ''
        };
        this.$scope = $scope;
        this.tiendas = [];
        this.totalVacantes = 0;
        this.helpers({
            estadoDesc(){
                return Estados.findOne({_id: this.vacante.estadoId});
            },
            puestoDesc(){
                return Puestos.findOne({_id: this.vacante.puestoId});
            },
            escuelaDesc(){
                return Escuelas.findOne({_id: this.vacante.perfil.escolaridad});
            }
        });
    }

    reset() {
        if (this.$scope.vacanteFrm) {
            this.$scope.vacanteFrm.$setDirty();
            this.$scope.vacanteFrm.$setPristine();
            this.$scope.vacanteFrm.$setUntouched();
        }
    }

    agregarResumen() {

        const tienda = {
            cadenaId: this.tienda.cadenaId,
            delMpio: this.tienda.delMpio,
            sucursal: this.tienda.sucursal,
            numVacantes: this.numVacantes
        };
        this.tiendas.push(tienda);
        this.calcularVacantes();
    }

    eliminarTienda(index) {
        this.tiendas.splice(index, 1);
        this.calcularVacantes();
    }

    calcularVacantes() {
        this.totalVacantes = this.tiendas.length * this.numVacantes;
    }

    obtenerCadena(id) {
        return Cadenas.findOne({_id: id});
    }

    agregarVacante() {
        const vacante = angular.copy(this.vacante);
        insertVacante.call(vacante, this.$bindToContext((error, result)=> {
            if (error) {
                console.log(error);
            } else {
                this.agregarTiendas(result);
            }
        }));

    }

    agregarTiendas(vacanteId) {
        let numErrores = 0;
        let numInsertados = 0;
        for (let i = 0; i < this.tiendas.length; i++) {
            let tempItem = angular.copy(this.tiendas[i]);
            tempItem.vacanteId = vacanteId;
            insertTienda.call(tempItem, this.$bindToContext((error) => {
                if (error) {
                    console.log(error);
                    this.tiendas[i].error = true;
                    numErrores++;
                } else {
                    this.tiendas[i].exito = true;
                    numInsertados++;
                }
                if (numInsertados > 0) {
                    this.respuestaExito.mostrar = true;
                }
                if (numErrores > 0) {
                    this.respuestaError.mostrar = true;
                }
                this.respuestaExito.mensaje = `Tiendas registradas ${numInsertados}, Vacantes soclitadas ${this.numVacantes * numInsertados}.`;
                this.respuestaError.mensaje = `Tiendas NO regsitradas ${numErrores}.`;
            }));
        }
    }

    limpiar() {
        this.tiendas = [];
        this.totalVacantes = 0;
        this.respuestaExito.mostrar = false;
        this.respuestaError.mostrar = false;
    }

}

const name = 'vacanteXtienda';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    angularMessages,
    ElegirCadenas
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
    controllerAs: name,
    controller: VacanteXtienda
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.vacantes.vacanteXtienda', {
            url: '/tiendas',
            template: '<vacante-xtienda></vacante-xtienda>'
        });
}
