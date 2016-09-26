import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import "./vacanteXtienda.html";
import {name as ElegirEstados} from "../../comun/selects/elegirEstado/elegirEstado";
import {name as ElegirCadenas} from "../../comun/selects/elegirCadena/elegirCadena";
import {insert} from "../../../../api/vacantes/methods";
import {Cadenas} from "../../../../api/cadenas/collection";
import {Session} from "meteor/session";
import {ValidationError} from "meteor/mdg:validation-error";

class VacanteXtienda {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.numVacantes = 5;
        this.tienda = {};
        this.vacante = Session.get('vacanteParaPub');
        this.respuesta = {
            mostrar: false,
            tipo: '',
            mensaje: ''
        };
        this.$scope = $scope;
        this.tiendas = [];
        this.totalVacantes = 0;
    }

    reset() {
        if (this.$scope.vacanteFrm) {
            this.$scope.vacanteFrm.$setDirty();
            this.$scope.vacanteFrm.$setPristine();
            this.$scope.vacanteFrm.$setUntouched();
        }
    }

    agregarTienda() {

        const infoVacante = {
            estadoId: this.tienda.estadoId,
            cadenaId: this.tienda.cadenaId,
            delMpio: this.tienda.delMpio,
            sucursal: this.tienda.sucursal,
            sueldo: this.vacante.sueldo,
            numVacantes: this.numVacantes,
            puestoId: this.vacante.puestoId,
            marca: this.vacante.marca,
            perfil: this.vacante.perfil,
            horarios: this.vacante.horarios,
            entrevista: this.vacante.entrevista,
        };
        this.tiendas.push(infoVacante);
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

    agregar() {
        let numErrores = 0;
        let numInsertados = 0;
        for(let i = 0; i< this.tiendas.length; i++){
            const tempItem = angular.copy(this.tiendas[i]);
            insert.call(tempItem, this.$bindToContext((error) => {
                this.respuesta.mostrar = true;
                if (error) {
                    numErrores ++;
                } else {
                    numInsertados ++;
                }
                this.respuesta.mensajeExito = `Cantidad de tiendas registradas ${numInsertados}, numero de vacantes soclitadas ${this.totalVacantes * numInsertados}.`
                this.respuesta.mensajeErr = `Tiendas que NO pudieron ser regsitradas ${numErrores}.`

            }));
        }
    }

}

const name = 'vacanteXtienda';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    angularMessages,
    ElegirEstados,
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
