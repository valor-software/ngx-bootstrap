import {component$, JSXNode, render, useClientEffect$, useSignal} from '@builder.io/qwik';
import DemoSection from '../../../components/demo-section/demo-section';
import DocsSection from '../../../components/docs-section/docs-section';
import {demoComponentContent} from './dropdown-section.list';
import BasicTabDemoComponent from './demos/basic';

export default component$(() => {
  const name = 'Dropdown';
  const src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

    useClientEffect$(() =>{
      const elem = document.getElementById('examples-box') as Element;

  })

    return (
    <DemoSection src={src} name={name}>
      <p>Dropdowns are toggleable, contextual overlays for displaying lists of links and more.
        They’re made interactive with the included dropdown directives.</p>
      <p>The easiest way to add the dropdown component to your app (will be added to the root module)</p>
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

