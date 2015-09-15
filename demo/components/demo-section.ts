/// <reference path="../../tsd.d.ts" />

import {
  Component, View,
  OnInit,
  CORE_DIRECTIVES, NgNonBindable
} from 'angular2/angular2';

import {tabs} from '../../components/index';

let name = 'Alerts';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/alert/alert.ts';

// webpack html imports
let doc = require('../../components/alert/readme.md');
let titleDoc = require('../../components/alert/title.md');

let ts = require('!!prismjs?lang=typescript!./alert/alert-demo.ts');
let html = require('!!prismjs?lang=markup!./alert/alert-demo.html');
let annotations = require('!!prismjs?lang=typescript!../../components/alert/annotation.md');

export class DemoSectionConfig {
  public doc: string;
  public title: string;
  public ts: string;
  public html: string;
  public annotations: string;
}

@Component({
  selector: 'demo-section',
  properties: ['demoSection'],
})
@View({
  template: `
  <br>
  <section id="${name.toLowerCase()}">
    <div class="row"><h1>${name}<small>(<a href="${src}">src</a>)</small></h1></div>

    <hr>

    <div class="row"><div class="col-md-12">${titleDoc}</div></div>

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
            <pre class="language-html"><code class="language-html" ng-non-bindable>${html}</code></pre>
          </div>
        </tab>
        <tab heading="TypeScript">
          <div class="card card-block panel panel-default panel-body">
            <pre class="language-typescript"><code class="language-typescript" ng-non-bindable>${ts}</code></pre>
          </div>
        </tab>
      </tabset>
    </div>

    <br>

    <div class="row">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body">
      <h2>Annotations</h2>
      <pre class="language-typescript"><code class="language-typescript" ng-non-bindable>${annotations}</code></pre>
      ${doc}
      </div>
    </div>
  </section>
  `,
  directives: [tabs, CORE_DIRECTIVES, NgNonBindable]
})
export class DemoSection implements OnInit {
  private demoSection: DemoSectionConfig;
}
