Tasks = new Mongo.Collection("tasks");


//====== fr client
if (Meteor.isClient){
  Meteor.subscribe("tasks");
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
      Meteor.call("addTask",text);
      e.target.text.value="";
      return false;
    },
    "change .hide-completed input":function(e){
      Session.set("hideCompleted",e.target.checked);
    }
    });

  Template.task.events({
    "click .toggle-checked" : function(){
      Meteor.call("setChecked",this._id, ! this.checked);
    },
    "click .delete" : function(){
      Meteor.call("deleteTask",this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields:"USERNAME_ONLY"
  })
}

// ===== methods are for securing things

Meteor.methods({
  addTask: function(text){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text:text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId){
    Tasks.remove(taskId);
  },
  setChecked:function (taskId, setChecked){
    Tasks.update(taskId,{$set:{checked:setChecked}});
  }
});


//========= for server

if(Meteor.isServer){
  Meteor.publish("tasks",function(){
    return Tasks.find();
  });
}




























