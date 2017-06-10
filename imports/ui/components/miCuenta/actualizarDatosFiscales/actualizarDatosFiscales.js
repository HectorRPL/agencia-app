/**
 * Created by Héctor on 07/06/2017.
 */
import {DatosFiscales} from "../../../../api/datosFiscales/collection";
import {insertarDatosFiscales} from "../../../../api/datosFiscales/methods";
import {actualizarDatosFiscales} from "../../../../api/datosFiscales/methods";
import {eliminarDatosFiscales} from "../../../../api/datosFiscales/methods";
import {name as FormaDireccion} from "../../comun/direccion/formaDireccion/formaDireccion";
import {name as FormaDatosFiscales} from "../../comun/datosFiscales/formaDatosFiscales/formaDatosFiscales";
import "./actualizarDatosFiscales.html";

class ActualizarDatosFiscales {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.subscribe('datosFiscales.agencia');
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne();
            }
        });
    }

    guardarDatosFiscales() {
        // let datosFiscalesFinal = angular.copy(this.datosFiscales);
        // delete datosFiscalesFinal.colonias;
        // datosFiscalesFinal.propietarioId = this.propietarioId;

        insertarDatosFiscales.call(this.datosFiscales, this.$bindToContext((err) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos fiscales se guardaron exitosamente.';
                this.tipoMsj = 'success';
            }
        }));
    }

    actualizarDatosFiscales() {
        delete this.datosFiscales._id;
        delete this.datosFiscales.fechaCreacion;
        // let datosFiscalesFinal = angular.copy(this.datosFiscales);
        // delete datosFiscalesFinal.colonias;
        // datosFiscalesFinal.propietarioId = this.propietarioId;

        // PERSONA FÍSICA
        if (this.datosFiscales.personaFisica === true) {
            delete this.datosFiscales.razonSocial;
            console.log('Esto es lo que enviaremos cuando sea una persona Física', this.datosFiscales);

            actualizarDatosFiscales.call(this.datosFiscales, this.$bindToContext((err) => {
                if (err) {
                    this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                    this.tipoMsj = 'danger';
                } else {
                    this.msj = 'Los datos fiscales se actualizaron exitosamente.';
                    this.tipoMsj = 'success';
                }
            }));


        // PERSONA MORAL
        } else {
            delete this.datosFiscales.nombre;
            delete this.datosFiscales.apellidoPaterno;
            delete this.datosFiscales.apellidoMaterno;
            console.log('Esto es lo que enviaremos cuando sea una persona moral', this.datosFiscales);

            actualizarDatosFiscales.call(this.datosFiscales, this.$bindToContext((err) => {
                if (err) {
                    this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                    this.tipoMsj = 'danger';
                } else {
                    this.msj = 'Los datos fiscales se actualizaron exitosamente.';
                    this.tipoMsj = 'success';
                }
            }));
        }
    }
}

const name = 'actualizarDatosFiscales';

export default angular
    .module(name, [
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        templateUrl: `imports/ui/components/miCuenta/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarDatosFiscales
    });