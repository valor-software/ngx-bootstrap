/// <reference path="../../tsd.d.ts" />

import {
  Component, View,
} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import {tabs} from '../../ng2-bootstrap';
import {TabsDemo} from './tabs/tabs-demo';

let name = 'Tabs';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/tabs/tabs.ts';

// webpack html imports
let doc = require('../../components/tabs/readme.md');
let titleDoc = require('../../components/tabs/title.md');

let ts = require('!!prismjs?lang=typescript!./tabs/tabs-demo.ts');
let html = require('!!prismjs?lang=markup!./tabs/tabs-demo.html');

@Component({
  selector: 'tabs-section'
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
        <tabs-demo></tabs-demo>
      </div>
    </div>

    <br>

    <div class="row">
      <tabset>
        <tab heading="Markup">
          <div class="card card-block panel panel-default panel-body">
            <pre class="language-html"><code class="language-html" ngNonBindable>${html}</code></pre>
          </div>
        </tab>
        <tab heading="TypeScript">
          <div class="card card-block panel panel-default panel-body">
            <pre class="language-typescript"><code class="language-typescript" ngNonBindable>${ts}</code></pre>
          </div>
        </tab>
      </tabset>
    </div>

    <br>

    <div class="row">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body">${doc}</div>
    </div>
  </section>
  `,
  directives: [TabsDemo, tabs, CORE_DIRECTIVES]
})
export class TabsSection {
}
