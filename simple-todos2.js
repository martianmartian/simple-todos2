Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){
  Template.body.helpers({
      // tasks:function(){
      //   return Tasks.find({});
      // }
      // tasks: ([
      //   {text:"what"},
      //   {text:"this"}
      //   ])
      // tasks:([{
      //         text:"third"
      //       }])
    })
}
