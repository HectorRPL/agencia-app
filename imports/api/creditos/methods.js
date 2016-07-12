import { Meteor }           from 'meteor/meteor';
import { _ }                from 'meteor/underscore';
import { ValidatedMethod }  from 'meteor/mdg:validated-method';
import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { LoggedInMixin }    from 'meteor/tunifight:loggedin-mixin';
import { DDPRateLimiter }   from 'meteor/ddp-rate-limiter';

import { Creditos }         from './collection.js';

const CAMPOS_SIN_IDS = ['disponible', 'usados'];
const CAMPOS_CON_IDS = ['_id', 'propietario', 'disponible', 'usados'];

export const insert = new ValidatedMethod({
    name: 'creditos.insert',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: Creditos
        .simpleSchema()
        .pick(CAMPOS_SIN_IDS)
        .validator({
            clean: true,
            filter: false
        }),
    run({
        numero
    }) {
        const creditos = {
            propietario: this.userId,
            numero,
        };
        Creditos.insert(creditos);
    }
});

const CREDITOS_METODOS = _.pluck([insert], 'name');
if (Meteor.isServer) {
    // Solo se permite 5 operaciones por conexión por segundo
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(CREDITOS_METODOS, name);
        },
        // Limite de conexión por Id
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
