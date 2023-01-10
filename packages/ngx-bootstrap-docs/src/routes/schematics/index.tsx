import { component$ } from '@builder.io/qwik';
import DemoSection from "~/components/demo-section/demo-section";
import { CustomLink } from "~/routing/link";

export default component$(() => {
  return (
    <DemoSection>
        <div id="content" className="content-box d-block pl-0 ps-0 pe-0 pr-0">
            <div className="common-header">
                <div className="title-box">
                    <h1>Welcome to ngx-bootstrap!</h1>
                    <p>
                        The best way to quickly integrate <a href="https://getbootstrap.com/docs/5.2" target="_blank">Bootstrap
                        5 </a> or <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4 </a> Components with Angular
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

            <section className="section">
                <h2 id="getting-started">
                    Schematics
                </h2>
            </section>

            <section className="section">
                <p>
                    The ngx-bootstrap library contains Angular Cli Schematics to allow easier installation. You can add
                    ngx-bootstrap with one simple command.
                </p>
                <pre className="prettyprint lang-bash prettyprinted"><span
                    className="pln">ng add ngx-bootstrap</span></pre>
                <p>Alternative installation methods can be found
                    <CustomLink path={'/documentation#installation'}>there</CustomLink>
                </p>
                <p>When you install ngx-bootstrap with Angular Cli Schematics you will get such updates:</p>
                <ul id="installation">
                    <li><p><code>package.json</code></p>
                        <p>List of dependencies will be updated with 2 new packages <code>"bootstrap":
                            "^5.2.3"</code>, <code>"ngx-bootstrap": "10.x.x"</code>. After packages will be installed
                            and node_modules folder will be updated also.</p>
                    </li>
                    <li id="style_updates"><p>Depending on which style extension is used in the project, schematics will
                        add necessary imports or styles links. It, as expected, allows the use SCSS or CSS
                        extensions.</p>
                        <p>In case CSS extension - <code>angular.json</code> file will be updated.</p>
                        <pre className="prettyprint lang-js prettyprinted">
<span className="kwd">"styles"</span><span className="pun">: [</span><br/>
<span>  </span>"<span className="lit">./node_modules/bootstrap/dist/css/bootstrap.min.css</span>",<br/>
<span>  </span>"<span className="lit">./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css</span>",<br/>
<span>  </span><span className="pln">  &hellip;</span><br/>
<span className="pun">]</span>
          </pre>
                        <p>In case SCSS extension - for updating will be used main style file (standard
                            ex. <code>styles.scss</code>).</p>
                        <pre className="prettyprint lang-js prettyprinted">
/* Importing Bootstrap SCSS file. */<br/>
<span className="kwd">@import</span>"<span className="lit">~bootstrap/scss/bootstrap</span>";<br/>
/* Importing Datepicker SCSS file. */<br/>
<span className="kwd">@import</span>"<span className="lit">node_modules/ngx-bootstrap/datepicker/bs-datepicker</span>";
          </pre>
                        <p>If the project will not have any style file or project will not have style files with
                            available extensions - project will be updated with default CSS extension (first case).</p>
                    </li>
                    <li>
                        <p>The project's main module (standard ex. <code>app.module.ts</code>) will be updated with
                            import of <code>BrowserAnimationsModule</code>, if it has not been previously imported.</p>
                        <pre className="prettyprint lang-js prettyprinted">
// added import of BrowserAnimationsModule to app.module.ts by ngx-bootstrap schematics<br/>
<span className="kwd">import </span><span className="pun">{'{'}</span>
<span className="lit"> BrowserAnimationsModule </span>
<span className="pun">{'}'}</span>
<span className="kwd"> from </span><span>'@angular/platform-browser/animations';</span><br/>

@NgModule(<span className="pun">{'{'}</span><br/>
<span>  </span>declarations: [
      AppComponent
    ],<br/>
<span>  </span><span className="kwd">imports</span>: [<br/>
        <span>      </span><span className="pln">&hellip;</span><br/>
        <span>      </span><span className="lit">BrowserAnimationsModule</span>,<br/>
    <span>  </span>],<br/>
    <span>  </span>providers: [],<br/>
        <span>  </span>bootstrap: [AppComponent]<br/>
    <span className="pun">{'}'}</span>)<br/>
          </pre>
                    </li>
                </ul>
            </section>

            <section className="section">
                <p>ngx-bootstrap's <code>ng add</code> schematic allows the easy installation. Additionally specific
                    modules can be installed directly to a module with the following flag.</p>
                <pre className="prettyprint lang-bash prettyprinted"><span className="pln">ng add ngx-bootstrap  --component accordion</span></pre>
                <p>Property <code>component</code> accepts name of component which should be added into project.</p>
                <ul>
                    <li>
                        <p>If ngx-bootstrap has been installed previously, in this case will be updated only project's
                            main file (standard ex. <code>app.module.ts</code>)</p>
                        <pre className="prettyprint lang-js prettyprinted">
// added import of AccordionModule to app.module.ts by ngx-bootstrap schematics<br/>
<span className="kwd">import </span><span className="pun">{'{'}</span>
                            <span className="lit"> AccordionModule </span><span className="pun">{'}'}</span><span
                            className="kwd"> from </span><span>'ngx-bootstrap/accordion';</span><br/>

@NgModule(<span className="pun">{'{'}</span><br/>
    <span>  </span>declarations: [<br/>
      <span>    </span>AppComponent<br/>
    <span>  </span>],<br/>
    <span>  </span><span className="kwd">imports</span>: [<br/>
        <span>    </span><span className="pln">&hellip;</span><br/>
        <span>    </span><span className="lit">AccordionModule.forRoot()</span>,<br/>
    <span>  </span>],<br/>
        <span>  </span>bootstrap: [AppComponent]<br/>
    <span className="pun">{'}'}</span>)
          </pre>
                    </li>
                    <li>If library hasn't been installed before updates will include changes from Installation

                        {/*<a routerLink="./"*/}
                        {/*                                                                             fragment="installation">Installation</a> */}
                        also.
                        <p>All available values for property <code>component</code> are:</p>
                        <ul>
                            <li>accordion</li>
                            <li>alerts</li>
                            <li>buttons</li>
                            <li>carousel</li>
                            <li>collapse</li>
                            <li>datepicker</li>
                            <li>dropdowns</li>
                            <li>modals</li>
                            <li>pagination</li>
                            <li>popover</li>
                            <li>progressbar</li>
                            <li>rating</li>
                            <li>sortable</li>
                            <li>tabs</li>
                            <li>timepicker</li>
                            <li>tooltip</li>
                            <li>typeahead</li>
                        </ul>
                    </li>
                </ul>
                <p><strong>Note:</strong> Styles for datepicker will be added only if you add all library or use
                    property <code>component</code> with datepicker</p>
                <p>More information for each of the components you can find in <strong>Components</strong>.</p>
                <p>One more property which can be used with ngx-bootstrap schematics is <code>stylesExtension</code>.
                    This property accepts preferred style extension and update project regarding these
                    use cases
                    {/*<a routerLink="./"*/}
                    {/*                                                                                fragment="style_updates">these*/}
                    {/*    use cases</a>*/}
                </p>
                <p>For more information ngx-bootstrap's schematics you can always use the help command</p>
                <pre className="prettyprint lang-bash prettyprinted"><span
                    className="pln">ng add ngx-bootstrap --help</span></pre>
            </section>
        </div>

    </DemoSection>
  );
});

