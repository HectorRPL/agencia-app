import {Meteor} from 'meteor/meteor';
import {Vacantes} from './collection';

if (Meteor.isServer) {
    Meteor.publish('vacantes.misPublicaciones', function () {
        const selector = {
            $and: [
                {
                    propietario: this.userId
                },
                {
                    activo: true
                }
            ]
        };
        return Vacantes.find(selector, {
            fields: {
                _id: 1,
                fechaCreacion: 1,
                cadenaDesc: 1,
                marca: 1,
                sucursal: 1,
                estadoDesc: 1,
                sueldo: 1,
                numeroVacantes: 1
            }
        });
    });

    Meteor.publish('vacantes.detalle', function () {
        const selector = {
            propietario: this.userId,
        };
        return Vacantes.find(selector, {
            fields: {
                propietario: 0,
                activo: 0
            }
        });
    });
}
