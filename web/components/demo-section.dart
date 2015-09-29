/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, OnInit, CORE_DIRECTIVES, NgNonBindable;
import "../../lib/index.dart" show tabs;

var name = "Alerts";

var src = "https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert/alert.ts";
// webpack html imports
var doc = require("../../lib/alert/readme.md");

var titleDoc = require("../../lib/alert/title.md");

var ts = require("!!prismjs?lang=typescript!./alert/alert-demo.ts");

var html = require("!!prismjs?lang=markup!./alert/alert-demo.html");

var annotations = require(
    "!!prismjs?lang=typescript!../../lib/alert/annotation.md");

class DemoSectionConfig {
  String doc;

  String title;

  String ts;

  String html;

  String annotations;
}

@Component (selector: "demo-section", properties: const [ "demoSection"])
@View (template: '''
  <br>
  <section id="${ name.toLowerCase()}">
    <div class="row"><h1>${ name}<small>(<a href="${ src}">src</a>)</small></h1></div>

    <hr>

    <div class="row"><div class="col-md-12">${ titleDoc}</div></div>

    <div class="row">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">
        <ng-content></ng-content>
      </div>
    </div>

    <br>

    <div class="row">
      <tabset>
        <tab heading="Markup">
          <div class="card card-block panel panel-default panel-body">
            <pre class="language-html"><code class="language-html" ng-non-bindable>${ html}</code></pre>
          </div>
        </tab>
        <tab heading="TypeScript">
          <div class="card card-block panel panel-default panel-body">
            <pre class="language-typescript"><code class="language-typescript" ng-non-bindable>${ ts}</code></pre>
          </div>
        </tab>
      </tabset>
    </div>

    <br>

    <div class="row">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body">
      <h2>Annotations</h2>
      <pre class="language-typescript"><code class="language-typescript" ng-non-bindable>${ annotations}</code></pre>
      ${ doc}
      </div>
    </div>
  </section>
  ''', directives: const [ tabs, CORE_DIRECTIVES, NgNonBindable])
class DemoSection {
  DemoSectionConfig demoSection;
}