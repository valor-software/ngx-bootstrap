import {component$, JSXNode, render, useClientEffect$, useSignal} from '@builder.io/qwik';
import DemoSection from '../../../components/demo-section/demo-section';
import DocsSection from '../../../components/docs-section/docs-section';
import BasicTabDemoComponent from './demos/basic';
import {demoComponentContent} from './tabs-section.list';

export default component$(() => {
    const name = 'Tabs';
    const src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';

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

