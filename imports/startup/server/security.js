import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore'

Meteor.users.deny({
    update() {
        return true;
    },
});