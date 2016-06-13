import {
  Meteor
} from 'meteor/meteor';
import {
  Accounts
} from 'meteor/accounts-base';
import {
  Roles
} from 'meteor/alanning:roles';
const group = 'agencia';
Accounts.onCreateUser((options, user) => {
  var roles = ['addReclutador'];
  Roles.addUsersToRoles(user._id, roles, group);
  return user;
});
