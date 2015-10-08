import "package:angular2/angular2.dart" show Component, View;
import 'package:ng2-strap/collapse/collapse.dart';


@Component(selector: "collapse-demo")
@View(template: 'collapse-demo.html', directives: const [Collapse])
class CollapseDemo {
  bool isCollapsed = false;
}
