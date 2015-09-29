/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, CORE_DIRECTIVES, NgNonBindable;
import "../../lib/ng2-bootstrap-config.dart"
    show Ng2BootstrapConfig, Ng2BootstrapTheme;
import "../../lib/index.dart" show tabs;
import "progressbar/progressbar-demo.dart" show ProgressbarDemo;

var name = "Progressbar";

var src = "https://github.com/valor-software/ng2-bootstrap/blob/master/components/progressbar/progressbar.ts";
// webpack html imports
var doc = require("../../lib/progressbar/readme.md");

var titleDoc = require("../../lib/progressbar/title.md");

var ts = require("!!prismjs?lang=typescript!./progressbar/progressbar-demo.ts");

var templates = {
:
require
(
"
!!prismjs?lang=markup!./progressbar/progressbar-demo.html
"
)
,
:
require
(
"
!!prismjs?lang=markup!./progressbar/progressbar-demo-bs4.html
"
)
};

var html = templates [ Ng2BootstrapConfig.theme ];

@Component (selector: "progressbar-section")
@View (template: '''
  <br>
  <section id="${ name.toLowerCase()}">
    <div class="row"><h1>${ name}<small>(<a href="${ src}">src</a>)</small></h1></div>

    <hr>

    <div class="row"><div class="col-md-12">${ titleDoc}</div></div>

    <div class="row">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">
        <progressbar-demo></progressbar-demo>
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
    directives: const [ ProgressbarDemo, tabs, CORE_DIRECTIVES, NgNonBindable])
class ProgressbarSection {}