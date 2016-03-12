import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {TAB_DIRECTIVES} from '../../ng2-bootstrap';
import {RatingDemo} from './rating/rating-demo';

let name = 'Rating';
let src = 'https://github.com/valor-software/ng2-bootstrap/blob/master/components/rating/rating.ts';

// webpack html imports
let doc = require('../../components/rating/readme.md');
let titleDoc = require('../../components/rating/title.md');

let ts = require('!!prismjs?lang=typescript!./rating/rating-demo.ts');
let html = require('!!prismjs?lang=markup!./rating/rating-demo.html');

@Component({
  selector: 'rating-section',
  directives: [RatingDemo, TAB_DIRECTIVES, CORE_DIRECTIVES],
  template: `
  <section id="${name.toLowerCase()}">
    <h1>${name}<small>(<a href="${src}">src</a>)</small></h1>

    <hr>

    <div class="description">${titleDoc}</div>
    
    <br/>
    
    <div class="example">
      <h2>Example</h2>
      <div class="card card-block panel panel-default panel-body">
        <rating-demo></rating-demo>
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
  `
})
export class RatingSection {
}
