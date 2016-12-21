this.Documents = new Mongo.Collection("documents");

var myVar = 10;

if (Meteor.isClient) {

  // update the session current_date
  // variable every 1000 ms
  Meteor.setInterval(function(){
    Session.set("current_date", new Date());
  }, 1000);

  Template.date_display.helpers({
    current_date:function(){
      return Session.get("current_date");
    },
    myVar:function(){
      return myVar;
    }
  });

  Template.editor.helpers({
    docid:function(){
      // console.log("doc id helper:");
      // console.log(Documents.findOne());
      // return Documents.findOne()._id;
      var doc = Documents.findOne()
      if (doc){
        return doc._id;
      }
      else {
        return undefined;
      }
      
    }
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Documents.findOne()){// no documents yet!
      Documents.insert({title:"my new document"});
    }
  });
}
