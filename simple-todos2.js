Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){

  Template.body.helpers({
    tasks:function(){
      if(Session.get("hideCompleted")){
        console.log('one');
        return Tasks.find({checked: {$ne:true}}, {sort: {createdAt:-1}});
      } else{
        console.log('two');
        return Tasks.find({},{sort:{createdAt:-1}});
        }  
      },
    hideCompleted:function(){
      console.log('one');
      return Session.get("hideCompleted");
    },
    incompleteCount:function(){
      return Tasks.find({checked:{$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task" : function(e){
      var text = e.target.text.value;
      Tasks.insert({
        text:text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username:Meteor.user().username
      });

      e.target.text.value="";
      return false;
    },
    "change .hide-completed input":function(e){
      Session.set("hideCompleted",e.target.checked);
    }
    });

  Template.task.events({
    "click .toggle-checked" : function(){
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete" : function(){
      Tasks.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields:"USERNAME_ONLY"
  })
}

































