/**
 * Created by jvltmtz on 5/10/16.
 */
import {_} from 'meteor/underscore';
import {Tiendas} from '../tiendas/collection.js';
import {Vacantes} from '../vacantes/collection.js';

const tiendasCounts = {
    _updateVacante(vacanteId) {
        const selectorTiendas = [
            {$match: {vacanteId: vacanteId}},
            {
                $group: {
                    _id: '$vacanteId',
                    totalVacantes: {$sum: '$numVacantes'},
                    totalTiendas: {$sum: 1}
                }
            }
        ];
        const totalTiendas = Tiendas.aggregate(selectorTiendas);

        Vacantes.update({_id: vacanteId},
            {
                $set: {
                    totalVacantes: totalTiendas[0].totalVacantes,
                    totalTiendas: totalTiendas[0].totalTiendas
                }
            });
    },
    afterInsertTienda(tienda) {
        this._updateVacante(tienda.vacanteId);
    }
};

export default tiendasCounts;
