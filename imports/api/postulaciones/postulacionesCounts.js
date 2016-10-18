/**
 * Created by jvltmtz on 16/08/16.
 */
import {_} from "meteor/underscore";
import {Postulaciones} from "./collection.js";
import {Tiendas} from "../tiendas/collection.js";
import {check} from 'meteor/check';

const vacantesCounts = {
    _updateTienda(tiendaId) {
        let tiendaCubierta = false;
        const selectorPost = {$and: [{tiendaId: tiendaId}, {estado: 1}]};
        const selectorSelec = {$and: [{tiendaId: tiendaId}, {estado: 2}]};

        const numPost = Postulaciones.find(selectorPost).count();
        const numSelec = Postulaciones.find(selectorSelec).count();
        const tienda = Tiendas.findOne({_id: tiendaId});

        if (tienda.numVacantes === numPost) {
            tiendaCubierta = true;
        }
        Tiendas.update({_id: tiendaId},
            {
                $set: {
                    cubierta: tiendaCubierta,
                    numPostulados: numPost,
                    numSeleccionados: numSelec
                }
            });
    },
    afterInsertPostulacion(postulacion) {
        this._updateTienda(postulacion.tiendaId);
    },
    afterUpdatePostulacion(selector, modifier) {
        check(modifier, {$set: Object});
        if (_.has(modifier.$set, 'estado')) {
            Postulaciones.find(selector, {fields: {tiendaId: 1}}).forEach(postulacion => {
                this._updateTienda(postulacion.tiendaId);
            });
        }
    },
};

export default vacantesCounts;