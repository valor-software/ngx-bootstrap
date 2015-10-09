import 'package:angular2/bootstrap.dart';
import 'typeahead-demo.dart';
import 'package:angular2/tools.dart';

main() async {
  var appRef = await bootstrap(TypeaheadDemo);
  enableDebugTools(appRef);
}