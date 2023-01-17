import { component$ } from '@builder.io/qwik';
import { Tabset, Tab } from 'ngx-bootstrap';

export default component$(() => {
  return (
    <div>
      Components page
        <div style={'margin-top: 200px; margin-left: 400px;'}>
            <Tabset>
                <Tab heading="Justified" id={'tab-1'} >Justified content</Tab>
                <Tab heading="SJ" id={'tab-2'} active={true}>SJ</Tab>
                <Tab heading="Long Justified" id={'tab-3'}>Long Justifie</Tab>
            </Tabset>
        </div>
    </div>
  );
});

