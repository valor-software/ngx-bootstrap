import { component$ } from '@builder.io/qwik';
import DemoSection from '../../../components/demo-section/demo-section';
import DocsSection from '../../../components/docs-section/docs-section';

export default component$(() => {
  const name = 'Dropdowns';
  const src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

  return (
    <DemoSection src={src} name={name}>
      <p>Dropdowns are toggleable, contextual overlays for displaying lists of links and more.
        They’re made interactive with the included dropdown directives.</p>
      <p>The easiest way to add the dropdown component to your app (will be added to the root module)</p>
        <DocsSection></DocsSection>
    </DemoSection>
  );
});

