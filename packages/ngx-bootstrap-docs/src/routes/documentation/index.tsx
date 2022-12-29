import {component$, $, useRef, useOnWindow, useClientEffect$} from '@builder.io/qwik';
import { Link, useNavigate, useLocation } from '@builder.io/qwik-city';
import DemoSection from '../../components/demo-section/demo-section';
import * as React from 'react';

export default component$(() => {
  const nav = useNavigate();


  useClientEffect$(() => {
    // if (hash) {
    //   // We want to reset if the hash has changed
    //   if (hashRef.current !== hash) {
    //     hashRef.current = hash;
    //     scrolledRef.current = false;
    //   }
    //
    //   // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
    //   if (!scrolledRef.current) {
    //     const id = hash.replace('#', '');
    //     const element = document.getElementById(id);
    //     if (element) {
    //       element.scrollIntoView({ behavior: 'smooth' });
    //       scrolledRef.current = true;
    //     }
    //   }
    // }
})

  const anchorScroll = $((url: string, anchor: string) => {
    window.history.replaceState(null, '', `#${anchor}`);
  });

  useClientEffect$(() => {

  })

  return (
    <DemoSection>
      <div id="content" className="content-box d-block pl-0 ps-0 pe-0 pr-0">
        <div className="common-header">
          <div className="title-box">
            <h1>Welcome to ngx-bootstrap!</h1>
            <p>
              The best way to quickly integrate <a href="https://getbootstrap.com/docs/5.1" target="_blank">Bootstrap
              5 </a> or <a href="https://getbootstrap.com/docs/4.0" target="_blank">Bootstrap 4 </a> Components with
              Angular
            </p>
            <div className="statistic-box">
              <a href="https://npmjs.org/ngx-bootstrap" target="_blank">
                <img src="https://img.shields.io/npm/v/ngx-bootstrap/latest.svg" alt="npm latest version"/>
              </a>
              <a href="https://npmjs.org/ngx-bootstrap" target="_blank">
                <img src="https://img.shields.io/npm/v/ngx-bootstrap/next.svg" alt="npm next version"/>
              </a>
              <br/>
              <a href="https://npmjs.org/ngx-bootstrap" target="_blank">
                <img src="https://img.shields.io/npm/dm/ngx-bootstrap.svg" alt="npm downloads"/>
              </a>
              <a href="https://opencollective.com/ngx-bootstrap" target="_blank">
                <img
                  src="https://opencollective.com/ngx-bootstrap/tiers/backer/badge.svg?label=backer&color=brightgreen"/>
              </a>
            </div>
          </div>

          <div className="d-flex links-box">
            <a className="d-block" href="https://github.com/valor-software/ngx-bootstrap" target="_blank"><i
              className="arrow-link"></i>Github link</a>
            <a className="d-block"
               href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY"
               target="_blank"><i className="arrow-link"></i>Slack channel </a>
          </div>
        </div>

        <div className="section">
          <h2>Links</h2>
          <ul>
            <li>
              <Link href={'.'}>
                Documentation
              </Link>
            </li>
            <li><a href="https://github.com/valor-software/ngx-bootstrap/blob/development/CHANGELOG.md" target="_blank">Release
              Notes</a></li>
            <li><a
              href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY"
              target="_blank">Slack Community</a></li>
          </ul>

          <h2>Table of contents</h2>
          <ol>
            <li>
              {/*todo make anchor dcroll in normal way, there are troubles now*/}
              <Link href={'./#getting-started'} preventdefault:click onClick$={() => anchorScroll('documentation', 'usage--demo')}>Getting Started</Link>
              {/*<a href="." preventdefault:click onClick$={() => anchorScroll('documentation', 'usage--demo')}>*/}
              {/*  click me!*/}
              {/*</a>*/}
            </li>
            {/*<li><a routerLink="." fragment="usage--demo">Usage & Demo</a></li>*/}
            {/*<li><a routerLink="." fragment="supporting-ngx-bootstrap">Supporting NGX-Bootstrap</a></li>*/}
            {/*<li><a routerLink="." fragment="installation">Installation</a></li>*/}
            {/*<li><a routerLink="." fragment="compatibility">Compatibility</a></li>*/}
            {/*<li><a routerLink="." fragment="troubleshooting">Troubleshooting</a></li>*/}
            {/*<li><a routerLink="." fragment="contribution">Contributing</a></li>*/}
            {/*<li><a routerLink="." fragment="credits">Credits</a></li>*/}
            {/*<li><a routerLink="." fragment="license">License</a></li>*/}
          </ol>

          <h2 id="getting-started">
            Getting Started
            <Link className="anchor-link" href={'.'}>#</Link>
            {/*<a className="anchor-link" routerLink="." fragment="getting-started">#</a>*/}
          </h2>
          <p>ngx-bootstrap provides Bootstrap components powered by Angular, so you don't need to include original JS
            components.</p>
          <p>Check our Getting started guide if it's your first project with Angular Bootstrap.</p>

          <h2 id="usage--demo">
            Usage & Demo
            {/*<a className="anchor-link" routerLink="." fragment="usage--demo">#</a>*/}
          </h2>
          <p>
            Bootstrap components for Angular applications, dozens of demos and API documentation could be found here:
            <Link href={'/components'}>https://valor-software.com/ngx-bootstrap</Link>
          </p>

          <h2 id="supporting-ngx-bootstrap">
            Supporting NGX-Bootstrap
            {/*<a className="anchor-link" routerLink="." fragment="supporting-ngx-bootstrap">#</a>*/}
          </h2>
          <p>
            ngx-bootstrap is an Open Source (MIT Licensed) project, it's an independent project with ongoing development
            made possible thanks to the support of our awesome backers.
            If you also would like to show support or simply give back to Open Source community, please consider
            becoming a
            backer sponsor of <a href="https://opencollective.com/ngx-bootstrap" target="_blank">ngx-bootstrap on
            OpenCollective</a>.
          </p>
          <p>
            All donated funds are managed transparently on OpenCollective and will be used solely for compensating work
            and
            expenses for contributors. Valor Software employees and contractors are not eligible to use these funds.
          </p>
          <p>
            What's there for you? Proper recognition and exposure of your name/logo/website on our page.
            Our main sponsors will be presented under this section! Be the first!
          </p>

          <h2 id="installation">
            Installation
            {/*<a className="anchor-link" routerLink="." fragment="installation">#</a>*/}
          </h2>
          <h4>Angular CLI way</h4>
          <p>
            Use the Angular CLI ng add command for updating your Angular project.
          </p>
          <pre className="prettyprint lang-bash prettyprinted"><span className="pln">ng add ngx-bootstrap</span></pre>

          <h4>Manual way</h4>
          <p>Install <code>ngx-bootstrap</code> from <code>npm</code></p>
          <pre className="prettyprint lang-bash prettyprinted"><span className="pln">npm install ngx</span><span
            className="pun">-</span><span className="pln">bootstrap </span><span className="pun">--</span><span
            className="pln">save</span></pre>
          <p>Add wanted package to NgModule imports:</p>

          <pre className="prettyprint lang-js prettyprinted">
  <span className="kwd">import</span><span className="pln"> </span><span className="pun">{'{'}</span><span
            className="kwd"> TooltipModule </span><span
            className="pun">{'}'}</span><span className="pln"> from </span><span
            className="str">'ngx-bootstrap/tooltip'</span><span
            className="pun">;</span>
  <span className="pln">&nbsp;</span>
  <span className="lit">@NgModule</span><span className="pun">({'{'}</span>
  <span className="pln">  &hellip;</span>
  <span className="pln">  imports:</span><span className="pln"> </span><span className="pln">[</span><span
            className="pln"> </span><span
            className="typ">TooltipModule<span className="pln">.forRoot(), &hellip;</span></span><span
            className="pln"> </span><span
            className="pun">]</span>
  <span className="pln">  &hellip;</span>
  <span className="pun">{'}'})</span></pre>

          <p>Add component to your page:</p>

          <pre className="prettyprint lang-js prettyprinted">
  <span className="kwd">&lt;button</span><span className="pln"> </span><span className="atn">type</span><span
            className="pun">=</span><span className="atv">"button"</span><span className="pln"> </span><span
            className="atn">class</span><span className="pun">=</span><span className="atv">"btn btn-primary"</span>
  <span className="atn">        tooltip</span><span className="pun">=</span><span className="atv">"Vivamus sagittis lacus vel augue laoreet rutrum faucibus."</span><span
            className="kwd">&gt;</span>
  <span className="pln">  Simple demo</span>
  <span className="kwd">&lt;/button&gt;</span></pre>

          <p>You will need to add bootstrap css:</p>
          <ul>
            <li><code>Bootstrap 5</code></li>
          </ul>

          <pre className="prettyprint prettyprinted"><span className="com">&lt;!--- index.html --&gt;</span><span
            className="pln"></span>
<span className="tag">&lt;link</span><span className="pln"> </span><span className="atn">href</span><span
              className="pun">=</span><span
              className="atv">"https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"</span><span
              className="pln"> </span><span className="atn">rel</span><span className="pun">=</span><span
              className="atv">"stylesheet"</span> <span className="atn">crossorigin</span><span className="pun">=</span><span
              className="atv">"anonymous"</span> <span className="atn">integrity</span><span
              className="pun">=</span><span
              className="atv">"sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"</span><span
              className="tag">&gt;</span></pre>

          <ul>
            <li><code>Bootstrap 4</code></li>
          </ul>

          <pre className="prettyprint prettyprinted"><span className="com">&lt;!--- index.html --&gt;</span><span
            className="pln"></span>
<span className="tag">&lt;link</span><span className="pln"> </span><span className="atn">href</span><span
              className="pun">=</span><span
              className="atv">"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"</span><span
              className="pln"> </span><span className="atn">rel</span><span className="pun">=</span><span
              className="atv">"stylesheet"</span> <span className="atn">crossorigin</span><span className="pun">=</span><span
              className="atv">"anonymous"</span> <span className="atn">integrity</span><span
              className="pun">=</span><span
              className="atv">"sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"</span><span
              className="tag">&gt;</span></pre>

          <h3>Setting up the bootstrap version manually</h3>
          <p>
            As you may know <code>ngx-bootstrap</code> support several <code>bootstrap.css</code> versions at the same
            time
            and has automatic tool to
            guess current used version of library, but if this guess fails you can specify version of
            <code>bootstrap.css</code>
            manually.
          </p>
          <p>
            Sometimes, your project might contain some library that could interfere with the bootstrap framework, or you
            might have a customized version of bootstrap. The consequence is that the process of determining bootstrap
            version might be failed, which can break the UI. In that case, we can still set the bootstrap version
            manually
            in the bootstrapping component (i.e. <code>AppComponent</code>):
          </p>

          <pre className="prettyprint lang-js prettyprinted">
  <span className="kwd">import</span><span className="pln"> </span><span className="pun">{'{'}</span><span
            className="pln"> setTheme </span><span className="pun">{'}'}</span><span
            className="pln"> from </span><span className="str">'ngx-bootstrap/utils'</span><span
            className="pun">;</span>
  <span className="pln">&nbsp;</span>
  <span className="lit">@Component</span><span className="pun">({'{'}</span><span className="pln">&hellip;</span><span
            className="pun">{'}'})</span>
  <span className="kwd">export</span><span className="pln"> </span><span className="kwd">class</span><span
            className="pln"> </span><span
            className="typ">AppComponent</span><span className="pln"> </span><span className="pun">{'{'}</span>
  <span className="pln">  constructor</span><span className="pun">()</span><span className="pln"> </span><span
            className="pun">{'{'}</span>
  <span className="pln">    setTheme</span><span className="pun">(</span><span className="str">'bs3'</span><span
            className="pun">);</span><span
            className="pln"> </span><span className="com">// or 'bs4'</span>
  <span className="pln">    <span className="pln">&hellip;</span></span>
  <span className="pln">  </span><span className="pun">{'}'}</span>
  <span className="pun">{'}'}</span></pre>

          <h3>How to build lib for development</h3>
          <p>First time:</p>

          <pre className="prettyprint lang-bash prettyprinted">
  <span className="pln">git clone</span><span
            className="pln"> https://github.com/valor-software/ngx-bootstrap.git</span>
  <span className="atn">cd</span><span className="pln"> ngx-bootstrap</span>
  <span className="pln">npm ci</span>
  <span className="pln">npm run build</span>
  <span className="pln">npm start</span></pre>

          <h2 id="compatibility">
            Compatibility
            {/*<a className="anchor-link" routerLink="." fragment="compatibility">#</a>*/}
          </h2>
          <p>The only two dependencies are <a href="https://angular.io" target="_blank">Angular</a> and <a
            href="https://getbootstrap.com" target="_blank">Bootstrap</a> CSS.</p>
          <p>Here is the versions compatibility list:</p>
          <table className="compatibility mb-4">
            <thead>
            <tr>
              <th>ngx-bootstrap</th>
              <th>Angular</th>
              <th>Bootstrap CSS</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>10.x.x</th>
              <th>15.x.x</th>
              <th>5.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>9.0.0</th>
              <th>14.x.x</th>
              <th>5.x.x or 4.x.x or 3.x.x</th>
            </tr>
            <tr>
              <th>8.0.0</th>
              <th>12.x.x - 13.x.x</th>
              <th>5.x.x or 4.x.x or 3.x.x</th>
            </tr>
            <tr>
              <th>7.1.0</th>
              <th>11.x.x - 12.x.x</th>
              <th>5.x.x or 4.x.x or 3.x.x</th>
            </tr>
            <tr>
              <th>7.0.0</th>
              <th>11.x.x - 12.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>6.0.0</th>
              <th>9.x.x - 10.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>5.6.x</th>
              <th>7.x.x - 9.1.0</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>5.0.0 - 5.6.0</th>
              <th>7.x.x - 8.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>4.x.x</th>
              <th>6.x.x - 7.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>3.x.x</th>
              <th>6.x.x - 7.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>2.x.x</th>
              <th>2.x.x - 4.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            <tr>
              <th>1.x.x</th>
              <th>2.x.x</th>
              <th>3.x.x or 4.x.x</th>
            </tr>
            </tbody>
          </table>

          <h2 id="troubleshooting">
            Troubleshooting
            {/*<a className="anchor-link" routerLink="." fragment="troubleshooting">#</a>*/}
          </h2>
          <p>
            So if you are in trouble, here's where you can look for help.
          </p>
          <p>
            The best place to ask questions is on <a href="https://stackoverflow.com/questions/tagged/ngx-bootstrap"
                                                     target="_blank">StackOverflow (under the ngx-bootstrap tag)</a> You
            can also join <a
            href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY"
            target="_blank">our Slack channel</a> and link your stackoverflow question there. But try to avoid asking
            generic help questions directly on
            Slack since they can easily get lost in the chat. You can also <a
            href="https://github.com/valor-software/ngx-bootstrap/issues?utf8=%E2%9C%93&q=is%3Aissue" target="_blank">search
            among the existing GitHub issues</a>.
          </p>
          <p>If, <b>and only if</b>, none of the above helped, please open a <a
            href="https://github.com/valor-software/ngx-bootstrap/issues/new" target="_blank">new issue</a></p>

          <h2 id="contribution">
            Contribution
            {/*<a className="anchor-link" routerLink="." fragment="contribution">#</a>*/}
          </h2>
          <p>Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping
            other
            developers to solve issues are very appreciated! Thanks in advance!</p>
          <p>Please read our <a href="https://github.com/valor-software/ngx-bootstrap/blob/development/CONTRIBUTING.md"
                                target="_blank">contribution guidelines</a>.</p>

          <h3 id="credits">
            Credits
            {/*<a className="anchor-link" routerLink="." fragment="credits">#</a>*/}
          </h3>
          <p>Crossbrowser testing sponsored by
            <a href="https://saucelabs.com/" className="pr-1 pe-1" target="_blank">Saucelabs</a>
            <a href="https://saucelabs.com/" target="_blank">
              <img src="https://avatars2.githubusercontent.com/u/88837?s=200&v=4" alt="Saucelabs" width="31"
                   height="31"/>
            </a>
          </p>

          <p>End-to-end testing sponsored by
            <a href="https://www.cypress.io/" className="pr-1 pe-1" target="_blank">Cypress</a>
            <a href="https://www.cypress.io/" target="_blank">
              <img src="https://raw.githubusercontent.com/cypress-io/cypress-icons/master/src/favicon/favicon.ico"
                   alt="Cypress" width="31" height="31"/>
            </a>
          </p>

          <h3 id="license">
            License
            {/*<a className="anchor-link" routerLink="." fragment="license">#</a>*/}
          </h3>
          <p><a href="https://github.com/valor-software/ngx-bootstrap/blob/development/LICENSE" target="_blank">MIT</a>
          </p>
        </div>


      </div>
    </DemoSection>
  );
});

