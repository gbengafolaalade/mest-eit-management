import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Eits } from '../api/eits.js';

import './eitTemplate.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


Template.body.helpers({
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

Template.body.events({
'submit .new-eit'(event){

  event.preventDefault();

  // const target = event.target;
  const name = event.target.name.value;
  const email = event.target.email.value;
  const country = event.target.country.value;
  const phone = event.target.phone.value;
  // console.log(name);
  // console.log(email);
  // console.log(country);
  // console.log(phone);
if ($('input#myHidden').val()) {
  Eits.update($('input#myHidden').val(),{

    $set: { eitName: name,
    eitEmail: email,
    eitCountry: country,
    eitPhone: phone,
    createdAt: new Date(),
   },

  });

}
else{

  Eits.insert({
    eitName: name,
    eitEmail: email,
    eitCountry: country,
    eitPhone: phone,
    createdAt: new Date(),
  });

}


  event.target.myHidden.value =  '';
  event.target.name.value =  '';
  event.target.email.value =  '';
  event.target.country.value =  '';
  event.target.phone.value =  '';

},

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
