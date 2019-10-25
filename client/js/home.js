import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Eits } from '../../imports/api/eits.js';


import '../html/home.html';


Template.home.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


Template.home.helpers({
  eitObject(){

    const instance = Template.instance();

   if (instance.state.get('hideCompleted')) {
     // If hide completed is checked, filter tasks
     return Eits.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
   }
   // Otherwise, return all of the tasks


    return Eits.find({}, {  sort: { createdAt: -1 } });
  },
});

Template.home.events({

'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

  'click .bulkDelete'(event, instance) {
    // instance.state.set('deleteAll', event.target.clicked);
    const fetcher = Eits.find({checked: {$eq: true}}).fetch();
    fetcher.forEach(item => Eits.remove(item._id));
    // console.log(fetcher);


  },




});
