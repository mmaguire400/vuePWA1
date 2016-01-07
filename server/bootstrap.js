// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data =
    [
      {name: "Grocery Lists",
        items:
        [
          "GL 10/24/15",
          "GL 9/5/15"
        ]
      },
      {name: "Grocery Stores",
        items:
        [
          "Market Basket Littleton",
          "Market Basket Nashua",
          "Hannaford Nashua",
          "Shaws Groton",
          "Donelan's Groton"
        ]
      },
      {name: "Recipes",
        items:
        [
          "duck l'orange",
          "spaghetti",
          "minestrone soup",
          "pop tart souffle",
          "gum stew"
        ]
      },
      {name: "The Rosie Kitchen Community",
        items:
        [
          "Jeanne",
          "Freda",
          "Andy",
          "Mark"
        ]
      }
    ];

    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      var list_id = Lists.insert({name: list.name,
        incompleteCount: list.items.length});

      _.each(list.items, function(text) {
        Todos.insert({listId: list_id,
                      text: text,
                      createdAt: new Date(timestamp)});
        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
