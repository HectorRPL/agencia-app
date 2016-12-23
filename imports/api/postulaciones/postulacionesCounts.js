/**
 * Created by jvltmtz on 16/08/16.
 */
import {_} from "meteor/underscore";
import {Postulaciones} from "./collection.js";
import {Tiendas} from "../tiendas/collection.js";
import {Vacantes} from "../vacantes/collection.js";

const postulacionesCounts = {
    _updateTiendaCubierta(tiendaId) {
        let tiendaCubierta = false;
        const selectorPost = {tiendaId: tiendaId};

        const countPost = Postulaciones.find(selectorPost).count();
        const tienda = Tiendas.findOne({_id: tiendaId});

        if (tienda.numVacantes === countPost) {
            tiendaCubierta = true;
        }
        Tiendas.update({_id: tiendaId},
            {
                $set: {
                    cubierta: tiendaCubierta
                }
            });
    },
    _updateVacanteCubierta(vacanteId){
        let vacanteCubierta = false;
        const selectorPost = {vacanteId: vacanteId};

        const countPost = Postulaciones.find(selectorPost).count();
        const tienda = Vacantes.findOne({_id: vacanteId});

        if (tienda.numVacantes === countPost) {
            vacanteCubierta = true;
        }
        Vacantes.update({_id: vacanteId},
            {
                $set: {
                    cubierta: vacanteCubierta
                }
            });
    },
    afterInsertPostulacion(postulacion) {
        this._updateTiendaCubierta(postulacion.tiendaId);
        this._updateVacanteCubierta(postulacion.vacanteId);
    }
};

export default postulacionesCounts;