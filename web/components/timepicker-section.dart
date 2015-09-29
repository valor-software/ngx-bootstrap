/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, NgNonBindable;
import "../../lib/index.dart" show tabs;
import "timepicker/timepicker-demo.dart" show TimepickerDemo;

var name = "Timepicker";

var src = "https://github.com/valor-software/ng2-bootstrap/blob/master/components/timepicker/timepicker.ts";
// webpack html imports
var doc = require("../../lib/timepicker/readme.md");

var titleDoc = require("../../lib/timepicker/title.md");

var ts = require("!!prismjs?lang=typescript!./timepicker/timepicker-demo.ts");

var html = require("!!prismjs?lang=markup!./timepicker/timepicker-demo.html");

@Component (selector: "timepicker-section")
@View (template: '''
  <br>
  <section id="${ name.toLowerCase()}">
    <div class="row"><h1>${ name}<small>(<a href="${ src}">src</a>)</small></h1></div>

    <hr>

    <div class="row"><div class="col-md-12">${ titleDoc}</div></div>

    <div class="row">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">
        <timepicker-demo></timepicker-demo>
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
      <div class="card card-block panel panel-default panel-body">${ doc}</div>
    </div>
  </section>
  ''',
    directives: const [ TimepickerDemo, tabs, CORE_DIRECTIVES, NgNonBindable])
class TimepickerSection {}