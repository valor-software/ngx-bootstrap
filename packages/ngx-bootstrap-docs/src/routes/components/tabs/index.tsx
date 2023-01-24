import {component$, JSXNode, QwikJSX, render, useClientEffect$, useSignal, useStore} from '@builder.io/qwik';
import DemoSection from '../../../components/demo-section/demo-section';
import DocsSection from '../../../components/docs-section/docs-section';
import BasicTabDemoComponent from './demos/basic';
import { demoComponentContent } from './tabs-section.list';
import {isBrowser} from "@builder.io/qwik/build";
import HtmlTag from './demos/basic.html?raw';

export default component$(() => {
    const state = useStore({
        code: ''
    })
    const name = 'Tabs';
    const src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';
    const useDidMount = demoComponentContent?.[0].content?.[0].component;


    // useClientEffect$(() => {
    //     if (isBrowser) {
    //         @ts-ignore
            // console.log(demoComponentContent[0].content[0].component);
            //
            // const filename = require.resolve('./demos/basic.tsx');
            // fs.readFile(filename, 'utf8', function (err, words) {
            //     console.log(words);
            // });



        // }
    // })

    return (
        <DemoSection src={src} name={name}>
            <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus. <strong>Nested tabs are not supported.</strong></p>
            <p>The easiest way to add the tabs component to your app (will be added to the root module)</p>

            <DocsSection
                // @ts-ignore
                section={demoComponentContent}>
                <div q:slot="overview" id={'examples-box'}>
                    {/*Stuck with dynamic rendering components, these list of components should be fixed*/}
                    <BasicTabDemoComponent></BasicTabDemoComponent>
                    {/*<pre className="prettyprint linenums lang-js">{useDidMount.default.toString()}</pre>*/}
                    {/*<pre className="prettyprint linenums lang-js" dangerouslySetInnerHTML={HtmlTag}></pre>*/}
                    <pre className="prettyprint linenums lang-js" dangerouslySetInnerHTML={useDidMount}></pre>
                    {/*<pre className="prettyprint linenums lang-js" dangerouslySetInnerHTML={state.code}></pre>*/}
                    {/*<HtmlTag></HtmlTag>*/}
                </div>
                <div q:slot="api">
                    api
                </div>
                <div q:slot="examples">
                    examples
                </div>
            </DocsSection>
        </DemoSection>
    );
});

