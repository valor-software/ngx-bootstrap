import {component$, JSXNode, QwikJSX, render, useClientEffect$, useSignal, useStore} from '@builder.io/qwik';
import DemoSection from '../../../components/demo-section/demo-section';
import DocsSection from '../../../components/docs-section/docs-section';
import { demoComponentContent } from './tabs-section.list';

//todo Demos imports are here, cause there is trouble with dynamic imports, should be replaced in tabs-section.list.ts
import BasicTabDemoComponent from '../../../components/demos/tabs/basic/basic';


export default component$(() => {
    const state = useStore({
        code: ''
    })
    const name = 'Tabs';
    const src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';
    const useDidMount = demoComponentContent?.[0].content?.[0].component;
    const Demo = import('../../../components/demos/tabs/basic/basic');

    return (
        <DemoSection src={src} name={name}>
            <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus. <strong>Nested tabs are not supported.</strong></p>
            <p>The easiest way to add the tabs component to your app (will be added to the root module)</p>

            <DocsSection
                // @ts-ignore
                section={demoComponentContent}>
                <div q:slot="overview" id={'examples-box'}>
                    <BasicTabDemoComponent></BasicTabDemoComponent>
                    <pre className="lang-js prettyprint"><code dangerouslySetInnerHTML={useDidMount}></code></pre>
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

