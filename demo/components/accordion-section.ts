import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {AccordionDemo} from './accordion/accordion-demo';

let name = 'Accordion';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/accordion/';
// webpack html imports
let doc = require('../../components/accordion/readme.md');
let titleDoc = require('../../components/accordion/title.md');
let ts = require('!!prismjs?lang=typescript!./accordion/accordion-demo.ts');
let html = require('!!prismjs?lang=markup!./accordion/accordion-demo.html');

@Component({
  selector: 'accordion-section',
  template: `
  <section id="${name.toLowerCase()}">
    <h1>${name}<small>(<a href="${src}">src</a>)</small></h1>

    <hr>

    <div class="description">${titleDoc}</div>

    <br/>

    <div class="example">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">
        <accordion-demo></accordion-demo>
      </div>
    </div>
    
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
  directives: [AccordionDemo, TAB_DIRECTIVES, CORE_DIRECTIVES]
})
export class AccordionSection {
}
