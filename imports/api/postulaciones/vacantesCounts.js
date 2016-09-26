/**
 * Created by jvltmtz on 16/08/16.
 */
import {_} from "meteor/underscore";
import {Postulaciones} from "./collection.js";
import {Vacantes} from "../vacantes/collection.js";
import { check } from 'meteor/check';

const vacantesCounts = {
    _updateVacante(vacanteId) {

        const selectorPost = {$and: [{vacanteId: vacanteId}, {estado: 1}]};
        const selectorSelec = {$and: [{vacanteId: vacanteId}, {estado: 2}]};
        let vacanteCubierta = false;

        const numPost = Postulaciones.find(selectorPost).count();
        const numSelec = Postulaciones.find(selectorSelec).count();
        const vacante = Vacantes.findOne({_id: vacanteId});

        if (numPost === vacante.numVacantes) {
            vacanteCubierta = true;
        }
        Vacantes.update({
            _id: vacante._id
        }, {
            $set: {
                cubierta: vacanteCubierta,
                numPostulaciones: numPost,
                numSeleccionados: numSelec

            }
        });
    },
    afterInsertPostulacion(postulacion) {
        this._updateVacante(postulacion.vacanteId);
    },
    afterUpdateTodo(selector, modifier) {
        check(modifier, { $set: Object });

        if (_.has(modifier.$set, 'checked')) {
            Postulaciones.find(selector, { fields: { vacanteId: 1 } }).forEach(postulacion => {
                this._updateVacante(postulacion.vacanteId);
            });
        }
    },
};

export default vacantesCounts;