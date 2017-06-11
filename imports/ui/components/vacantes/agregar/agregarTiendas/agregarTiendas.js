import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import "./agregarTiendas.html";
import {name as ElegirCadenas} from "../../../comun/selects/elegirCadena/elegirCadena";
import {insertVacante} from "../../../../../api/vacantes/methods";
import {insertTienda} from "../../../../../api/tiendas/methods";
import {Cadenas} from "../../../../../api/catalogos/cadenas/collection";
import {Session} from "meteor/session";
import {ValidationError} from "meteor/mdg:validation-error";
import {Estados} from "../../../../../api/catalogos/estados/collection";
import {Puestos} from "../../../../../api/catalogos/puestos/collection";
import {Escuelas} from "../../../../../api/catalogos/escuelas/collection";
import {Habilidades} from "../../../../../api/catalogos/habilidades/collection";
import {Experiencias} from "../../../../../api/catalogos/experiencias/collection";

class AgregarTiendas {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.cargando = false;
        this.titulo = 'Añadir Tiendas';
        this.tituloDos = 'Resumen';
        this.mostrarElemento = true;
        this.subscribe('estados');
        this.subscribe('puestos');
        this.subscribe('escuelas');
        this.subscribe('habilidades');
        this.subscribe('experiencias');
        this.numVacantes = 5;
        this.tienda = {};
        this.vacante = Session.get('datosVacante');
        this.habVacante = Session.get('habilidadesVacante');
        this.habVacanteText = Session.get('habilidadesVacanteText');
        this.diasLaborar = Session.get('diasVacante');
        if (this.vacante === undefined || this.vacante === null) {
            this.$state.go('app.vacantes.publicadas');
        } else {
            this.respuestaExito = {
                mostrar: false,
                mensaje: ''
            };
            this.respuestaError = {
                mostrar: false,
                mensaje: ''
            };
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
                },
                habNecesarias(){
                    return Habilidades.find({_id: {$in: this.habVacante}});
                },
                expNecesaria(){
                    return Experiencias.findOne({_id: this.vacante.perfil.experiencia.descripcion});
                }
            });
        };
    }

    reset() {
        if (this.$scope.vacanteFrm) {
            this.$scope.vacanteFrm.$setDirty();
            this.$scope.vacanteFrm.$setPristine();
            this.$scope.vacanteFrm.$setUntouched();
        }
    }

    agregarResumen(tiendaFrm) {
        const tienda = {
            cadenaId: this.tienda.cadenaId,
            delMpio: this.tienda.delMpio,
            sucursal: this.tienda.sucursal,
            numVacantes: this.numVacantes
        };
        this.tiendas.push(tienda);
        this.calcularVacantes();
        this.tienda.delMpio = '';
        this.tienda.cadenaId = '';
        this.tienda.sucursal = '';
        tiendaFrm.$setPristine();
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
        this.cargando = true;
        this.vacante.perfil.habilidades.listado = this.habVacante;
        this.vacante.perfil.habilidades.otra = this.habVacanteText;
        this.vacante.horarios.dias = this.diasLaborar;
        insertVacante.call(this.vacante, this.$bindToContext((error, result)=> {
            if (error) {
                this.msjAlerta = 'Error al agregar un vacante, porfavor intentelo mas tarde.';
                this.tipoAlerta = 'danger';
                this.cargando = false;
            } else {
                this.agregarTiendas(result);
            }
        }));
        console.log('Antes de agregar la vacante ', this.vacante);

    }

    agregarTiendas(vacanteId) {
        let numErrores = 0;
        let numInsertados = 0;
        for (let i = 0; i < this.tiendas.length; i++) {
            let tempItem = angular.copy(this.tiendas[i]);
            tempItem.vacanteId = vacanteId;
            tempItem.numVacantes = this.numVacantes;
            insertTienda.call(tempItem, this.$bindToContext((error) => {
                if (error) {
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
        this.limpiarSesion();
    }

    limpiar() {
        this.tiendas = [];
        this.totalVacantes = 0;
        this.respuestaExito.mostrar = false;
        this.respuestaError.mostrar = false;
    }

    limpiarSesion() {
        this.mostrarElemento = false;
        Session.clear('datosVacante');
        Session.clear('habilidadesVacante');
        Session.clear('diasVacante');
        Session.clear('habilidadesVacanteText');
    }

}

const name = 'agregarTiendas';
// create a module

export default angular
    .module(name, [
    angularMeteor,
    uiRouter,
    angularMessages,
    ElegirCadenas
])
    .component(name, {
    templateUrl: `imports/ui/components/vacantes/agregar/${name}/${name}.html`,
    controllerAs: name,
    controller: AgregarTiendas
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.vacantes.tiendas', {
            url: '/agregar/tiendas',
            template: '<agregar-tiendas></agregar-tiendas>'
        });
}
