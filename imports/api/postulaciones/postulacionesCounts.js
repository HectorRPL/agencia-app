/**
 * Created by jvltmtz on 16/08/16.
 */
import {_} from "meteor/underscore";
import {Postulaciones} from "./collection.js";
import {Tiendas} from "../tiendas/collection.js";
import {check} from 'meteor/check';

const postulacionesCounts = {
    _updatePostuladosTienda(tiendaId) {
        let tiendaCubierta = false;
        const selectorPost = {$and: [{tiendaId: tiendaId}]};

        const countPost = Postulaciones.find(selectorPost).count();
        const tienda = Tiendas.findOne({_id: tiendaId});

        if (tienda.numVacantes === countPost) {
            tiendaCubierta = true;
        }
        Tiendas.update({_id: tiendaId},
            {
                $set: {
                    cubierta: tiendaCubierta,
                    numPostulados: countPost,
                }
            });
    },
    _updateSeleccionadosTienda(){
        const selectorSelec = {$and: [{tiendaId: tiendaId}, {estado: 2}]};
        const countSelec = Postulaciones.find(selectorSelec).count();

        Tiendas.update({_id: tiendaId},
            {
                $set: {
                    numSeleccionados: countSelec,
                }
            });
    },
    afterInsertPostulacion(postulacion) {
        this._updatePostuladosTienda(postulacion.tiendaId);
    },
    afterUpdatePostulacion(selector, modifier) {
        check(modifier, {$set: Object});
        if (_.has(modifier.$set, 'estado')) {
            Postulaciones.find(selector, {fields: {tiendaId: 1}}).forEach(postulacion => {
                this._updateSeleccionadosTienda(postulacion.tiendaId);
            });
        }
    },
};

export default postulacionesCounts;