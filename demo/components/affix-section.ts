import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {AffixDemo} from './affix/affix-demo';

let name = 'Affix';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/affix/';

// webpack html imports
let doc = require('../../components/affix/readme.md');
let titleDoc = require('../../components/affix/title.md');

let ts = require('!!prismjs?lang=typescript!./affix/affix-demo.ts');
let html = require('!!prismjs?lang=markup!./affix/affix-demo.html');

@Component({
  selector: 'affix-section',
  template: `
  <section id="${name.toLowerCase()}">
    <h1>${name}<small>(<a href="${src}">src</a>)</small></h1>

    <hr>

    <div class="description">${titleDoc}</div>

    <br/>

    <div class="markup">
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
    
    <br/>
      
    <div class="api">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body">${doc}</div>
    </div>
  </section>
  `,
  directives: [AffixDemo, TAB_DIRECTIVES, CORE_DIRECTIVES]
})
export class AffixSection {
}
