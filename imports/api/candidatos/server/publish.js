/**
 * Created by jvltmtz on 30/05/17.
 */
import {Meteor} from "meteor/meteor";

if (Meteor.isServer) {
    Meteor.publish('candidatos.datosContacto', function (userId) {
        console.log('candidatos.datosContacto', userId);

        return Meteor.users.find(userId, {
            fields: {
                emails: 1,
                username: 1,
                phone: 1
            }
        });
    });
}
