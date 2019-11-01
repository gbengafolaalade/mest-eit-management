/* eslint-env mocha */
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Eits } from './eits.js';
import '../../lib/methods/eithMethods.js';

if (Meteor.isServer) {
  describe('Eits', () => {
    describe('methods', () => {

     let newEitId, userId;

      before(() => {
        Meteor.users.remove({});

        // Create new user
        let user = Meteor.users.findOne({username: 'gbenga'});
        if (!user) {
          userId = Accounts.createUser({
            'username': 'gbenga',
            'email': 'gbenga@gbenga.com',
            'password': 'pass123',
          })
        }else {
          userId = user._id;
        }
      });

      beforeEach(() => {
        Eits.remove({});
        newEitId = Eits.insert({
          eitName: 'name',
          eitEmail: 'email',
          eitCountry: 'country',
          eitPhone: 'phone',
          mentor: userId,
          createdAt: new Date(),
        });
      });
      it('mentor can delete eit', () => {


        const deleteEit = Meteor.server.method_handlers['deleteEit'];


        const invocation = { userId };

        deleteEit.apply(invocation, [newEitId]);


        assert.equal(Eits.find().count(), 0);

      });

      it('mentor cannot delete eit if not logged in', () => {


        const deleteEit = Meteor.server.method_handlers['deleteEit'];


        const invocation = {};

        // deleteEit.apply(invocation, [newEitId]);
        assert.throws(() => deleteEit.apply(invocation, [newEitId]), Meteor.Error, '[Not Authorised]');


        assert.equal(Eits.find().count(), 1);

      });

      it('can add eit if logged in', () => {


        const insertEit = Meteor.server.method_handlers['insertEit'];


        const invocation = { userId };


        insertEit.apply(invocation, [newEitId] );

        // Verify that the method does what we expected
        assert.equal(Eits.find().count(), 2);
      });
//
      it('cannot insert Eit if not logged in', () => {




        const insertEit = Meteor.server.method_handlers['insertEit'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = {};


        assert.throw(() => insertEit.apply(invocation, [newEitId]),
      Meteor.Error, '[Pls log in to insert]');



        assert.equal(Eits.find().count(), 1);
      });

      it('cannot delete another mentors eit', () => {

        //Tasks.update(taskId, {$set: { private: true } });

        // Generate a random ID, representing a different user
       const userId = Random.id();



        const deleteEit = Meteor.server.method_handlers['deleteEit'];
        const invocation = { userId };



        // Run the method with `this` set to the fake invocation
        assert.throws(() => deleteEit.apply(invocation, [newEitId]),
          Meteor.Error, '[Not Authorised to delete EIT]');


        // Verify that the method does what we expected
        assert.strictEqual(Eits.find().count(), 1);
      });

      it('cannot edit another mentors eit', () => {

        //Tasks.update(taskId, {$set: { private: true } });

        // Generate a random ID, representing a different user
       //const userId = Random.id();



        const editEit = Meteor.server.method_handlers['updateEit'];
        const invocation = { userId: Random.id() };



        // Run the method with `this` set to the fake invocation
        assert.throws(() => editEit.apply(invocation, [newEitId]),
          Meteor.Error, '[Not Authorised to Edit EIT]');


        // Verify that the method does what we expected
        assert.strictEqual(Eits.find().count(), 1);
      });

      it('can edit own eit', () => {

        //Tasks.update(taskId, {$set: { private: true } });

        // Generate a random ID, representing a different user
       //const userId = Random.id();



        const editEit = Meteor.server.method_handlers['updateEit'];
        const invocation = { userId };
        editEit.apply(invocation, [newEitId]);



        // Run the method with `this` set to the fake invocation



        // Verify that the method does what we expected
        assert.equal(Eits.find().count(), 1);
      });


//
//       it('can set own task private', () => {
//         const setTaskPrivate = Meteor.server.method_handlers['tasks.setPrivate'];
//
//         const invocation = { userId };
//         setTaskPrivate.apply(invocation, [taskId, true]);
//
//         assert.strictEqual(Tasks.find({private: true}).count(), 1);
//       });
//
//       it("cannot set someone else's task private", () => {
//   // Generate a random ID, representing a different user
//   const userId = Random.id();
//
//   const setPrivate = Meteor.server.method_handlers['tasks.setPrivate'];
//   const invocation = { userId };
//
//   // Verify that error is thrown
//   assert.throws(() => setPrivate.apply(invocation, [taskId, true]),
//     Meteor.Error, "[not-authorized]");
//
//   // Verify that task is not set private
//   assert.strictEqual(Tasks.find({private: true}).count(), 0);
// });




    });
  });
}
