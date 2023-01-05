import { component$ } from '@builder.io/qwik';
import { Tabset, Tab } from 'ngx-bootstrap';

export default component$(() => {
  return (
    <div>
      Components page
        <div style={'margin-top: 200px; margin-left: 400px;'}>
            <Tabset>
                <Tab heading="Justified">Justified content</Tab>
                <Tab heading="SJ">Short Labeled Justified content</Tab>
                <Tab heading="Long Justified">Long Labeled Justified content</Tab>
            </Tabset>
        </div>
    </div>
  );
});

