import { Meteor } from 'meteor/meteor';

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
        BlazeLayout.render('home');
    }
  // action(){
  //   BlazeLayout.render('Table', { main: "Bodo"});
  // }
});

FlowRouter.route('/add', {
  name: 'add',
  action(){
    BlazeLayout.render('addEIT');
  }
});

FlowRouter.route('/edit/:id', {
  name: 'edit',
  action: function(params) {
        BlazeLayout.render('editEIT');
    }
});
