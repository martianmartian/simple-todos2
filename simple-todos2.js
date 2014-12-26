Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){
  Template.body.helpers({
      tasks:function(){
        return Tasks.find({},{sort:{createdAt:-1}});
      }
      // tasks: ([
      //   {text:"what"},
      //   {text:"this"}
      //   ])
      // tasks:([{
      //         text:"third"
      //       }])
    })
  Template.body.events({
    "submit .new-task" : function(e){
      var text = e.target.text.value;
      Tasks.insert({text:text, createdAt: new Date()});
      e.target.text.value="";
      return false;
    }
  })
}
