/**
 * Created by jvltmtz on 5/10/16.
 */
import {_} from 'meteor/underscore';
import {Tiendas} from '../tiendas/collection.js';
import {Vacantes} from '../vacantes/collection.js';

const tiendasCounts = {
    _updateVacante(vacanteId) {
        let vacanteCubierta = false;
        const selectorTiendas = [
            {$match: {vacanteId: vacanteId}},
            {
                $group: {
                    _id: '$vacanteId',
                    totalVacantes: {$sum: '$numVacantes'},
                    totalPostulados: {$sum: '$numPostulados'},
                    totalSeleccionados: {$sum: '$numSeleccionados'},
                    totalTiendas: {$sum: 1}
                }
            }
        ];
        const totalTiendas = Tiendas.aggregate(selectorTiendas);
        if(totalTiendas[0].totalVacantes === totalTiendas[0].totalPostulados){
            vacanteCubierta = true;
        }

        Vacantes.update({_id: vacanteId},
            {
                $set: {
                    totalVacantes: totalTiendas[0].totalVacantes,
                    totalTiendas: totalTiendas[0].totalTiendas,
                    totalPostulados: totalTiendas[0].totalPostulados,
                    totalSeleccionados: totalTiendas[0].totalSeleccionados,
                    cubierta: vacanteCubierta
                }
            });
    },
    afterInsertTienda(tienda) {
        this._updateVacante(tienda.vacanteId);
    },
    afterUpdateTienda(selector, modifier) {
        check(modifier, {$set: Object});
        if (_.has(modifier.$set, 'numPostulados')
            || _.has(modifier.$set, 'numSeleccionados')) {
            Tiendas.find(selector, {fields: {vacanteId: 1}}).forEach(tienda => {
                this._updateVacante(tienda.vacanteId);
            });
        }

    }
};

export default tiendasCounts;
