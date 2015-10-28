import "package:angular2/angular2.dart";
import "package:ng2-strap/index.dart";
import "accordion/accordion-demo.dart";
import 'dart:html';
import 'package:markdown/markdown.dart' hide Element;

@Component (
    selector: "demo-section",
    inputs: const ['name'],
    templateUrl: 'demo-section.html',
    directives: const [ AccordionDemo, TABS_DIRECTIVES, CORE_DIRECTIVES])
class DemoSection implements OnInit {
  String name, nameLC, src, doc, titleDoc, dart, html;

  ViewContainerRef viewRef;

  DemoSection(@Inject(ViewContainerRef) this.viewRef);

  @override
  onInit() async {
    nameLC = name.toLowerCase();
    var rawMasterUrl = 'https://raw.githubusercontent.com/luisvt/ng2-strap/master';
    var rawLibUrl = '$rawMasterUrl/lib';
    var componentsUrl = '$rawMasterUrl/web/components';
    src = 'https://github.com/luisvt/ng2-strap/tree/master/lib/$nameLC/$nameLC.dart';
    HttpRequest.getString('$rawLibUrl/$nameLC/title.md').then((result) {
      (viewRef.element.nativeElement as Element).querySelector('#titleDoc').innerHtml = markdownToHtml(result);
    });
    HttpRequest.getString('$rawLibUrl/$nameLC/readme.md').then((result) {
      (viewRef.element.nativeElement as Element).querySelector('#doc').innerHtml = markdownToHtml(result);
    });
    dart = await HttpRequest.getString('$componentsUrl/$nameLC/$nameLC-demo.dart');
    html = await HttpRequest.getString('$componentsUrl/$nameLC/$nameLC-demo.html');
  }
}