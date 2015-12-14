import "package:angular2/angular2.dart";
import "package:ng2_strap/typeahead/typeahead.dart";
import 'dart:async';

@Component (selector: "typeahead-demo")
@View (templateUrl: 'typeahead-demo.html',
    directives: const [ typeahead, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass])
class TypeaheadDemo {
  String selected = "";

  String asyncSelected = "";

  bool typeaheadLoading = false;

  bool typeaheadNoResults = false;

  List<String> states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Dakota",
    "North Carolina",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  List<dynamic> statesComplex = [
    { "id" : 1, "name" : "Alabama"},
    { "id" : 2, "name" : "Alaska"},
    { "id" : 3, "name" : "Arizona"},
    { "id" : 4, "name" : "Arkansas"},
    { "id" : 5, "name" : "California"},
    { "id" : 6, "name" : "Colorado"},
    { "id" : 7, "name" : "Connecticut"},
    { "id" : 8, "name" : "Delaware"},
    { "id" : 9, "name" : "Florida"},
    { "id" : 10, "name" : "Georgia"},
    { "id" : 11, "name" : "Hawaii"},
    { "id" : 12, "name" : "Idaho"},
    { "id" : 13, "name" : "Illinois"},
    { "id" : 14, "name" : "Indiana"},
    { "id" : 15, "name" : "Iowa"},
    { "id" : 16, "name" : "Kansas"},
    { "id" : 17, "name" : "Kentucky"},
    { "id" : 18, "name" : "Louisiana"},
    { "id" : 19, "name" : "Maine"},
    { "id" : 21, "name" : "Maryland"},
    { "id" : 22, "name" : "Massachusetts"},
    { "id" : 23, "name" : "Michigan"},
    { "id" : 24, "name" : "Minnesota"},
    { "id" : 25, "name" : "Mississippi"},
    { "id" : 26, "name" : "Missouri"},
    { "id" : 27, "name" : "Montana"},
    { "id" : 28, "name" : "Nebraska"},
    { "id" : 29, "name" : "Nevada"},
    { "id" : 30, "name" : "New Hampshire"},
    { "id" : 31, "name" : "New Jersey"},
    { "id" : 32, "name" : "New Mexico"},
    { "id" : 33, "name" : "New York"},
    { "id" : 34, "name" : "North Dakota"},
    { "id" : 35, "name" : "North Carolina"},
    { "id" : 36, "name" : "Ohio"},
    { "id" : 37, "name" : "Oklahoma"},
    { "id" : 38, "name" : "Oregon"},
    { "id" : 39, "name" : "Pennsylvania"},
    { "id" : 40, "name" : "Rhode Island"},
    { "id" : 41, "name" : "South Carolina"},
    { "id" : 42, "name" : "South Dakota"},
    { "id" : 43, "name" : "Tennessee"},
    { "id" : 44, "name" : "Texas"},
    { "id" : 45, "name" : "Utah"},
    { "id" : 46, "name" : "Vermont"},
    { "id" : 47, "name" : "Virginia"},
    { "id" : 48, "name" : "Washington"},
    { "id" : 49, "name" : "West Virginia"},
    { "id" : 50, "name" : "Wisconsin"},
    { "id" : 51, "name" : "Wyoming"}
  ];

  TypeaheadDemo get context => this;

  Function getAsyncData = (TypeaheadDemo _context) =>
    new Future<List<String>>.delayed(new Duration(seconds: 2), () {
      var query = new RegExp(_context.asyncSelected);
      return _context.states.where(query.hasMatch).toList();
    });

  changeTypeaheadLoading(e) {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e) {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect(e) {
    print('Selected value: ${e['item']}');
  }
}