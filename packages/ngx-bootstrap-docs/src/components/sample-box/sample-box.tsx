import { component$, Slot } from '@builder.io/qwik';
import {Tab, Tabset} from "ngx-bootstrap";

export default component$((props:{html?: string, ts?: string, style?: string, spec?: string}) => {
    return (
        <>
            <div class="section bd-example">
                <Slot/>
            </div>
            <div class="section">
                <div class="item">
                {!!(props.html || props.ts || props.spec || props.style) && (
                    <Tabset>
                        {!!props.html && (
                            <Tab heading="template" id={'tab-template'} active={true}
                            customClass={'code-tab cursor-pointer'}>
                                <pre className="prettyprint linenums lang-html">{props.html}</pre>
                            </Tab>
                        )}

                        {!!props.ts && (
                            <Tab heading="component" id={'tab-component'}
                            customClass={'code-tab cursor-pointer'}>
                                <pre className="prettyprint linenums lang-js">{props.ts}</pre>
                            </Tab>
                        )}

                        {!!props.spec && (
                            <Tab heading="tests" id={'tab-tests'}
                            customClass={'code-tab cursor-pointer'}>
                                <pre className="prettyprint linenums lang-js">{props.spec}</pre>
                            </Tab>
                        )}

                        {!!props.style && (
                            <Tab heading="tests" id={'tab-style'}
                            customClass={'code-tab cursor-pointer'}>
                                <pre className="prettyprint linenums lang-css">{props.style}</pre>
                            </Tab>
                        )}
                    </Tabset>
                )}
            </div>
            </div>
        </>
    );
});

