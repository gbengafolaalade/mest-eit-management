import { Mongo } from 'meteor/mongo';


export const Eits = new Mongo.Collection('eits');

// if (Meteor.isServer) {
//   // This code only runs on the server
//   // Only publish tasks that are public or belong to the current user
//   Meteor.publish('eits', function tasksPublication() {
//     return Eits.find({});
//   });
// }
