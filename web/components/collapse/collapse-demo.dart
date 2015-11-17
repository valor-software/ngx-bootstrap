import "package:angular2/angular2.dart";
import 'package:ng2-strap/collapse/collapse.dart';


@Component(
    selector: "collapse-demo",
    templateUrl: 'collapse-demo.html',
    directives: const [Collapse])
class CollapseDemo {
  bool isCollapsed = false;
}
