import { Template } from 'meteor/templating';

import { Eits } from '../../imports/api/eits.js';

import '../html/addEIT.html';

Template.addEIT.events({

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

  Meteor.call('insertEit', name,email,country,phone);
  //mongodb+srv://gbenga:AQXsu8RRtauwCr9@cluster0-bfsk0.mongodb.net/test

    event.target.myHidden.value =  '';
    event.target.name.value =  '';
    event.target.email.value =  '';
    event.target.country.value =  '';
    event.target.phone.value =  '';
    

  },

});
