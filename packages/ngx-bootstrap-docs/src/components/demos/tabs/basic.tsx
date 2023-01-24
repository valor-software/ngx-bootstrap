import {component$} from '@builder.io/qwik';
import {Tabset, Tab} from 'ngx-bootstrap';

export default component$(() => {
    return (
        <Tabset>
            <Tab heading='Basic title' id='tabs-basic-1'>Basic content</Tab>
            <Tab heading='Basic Title 1' id='tabs-basic-2'>Basic content 1</Tab>
            <Tab heading='Basic Title 2' id='tabs-basic-3'>Basic content 2</Tab>
        </Tabset>
    );
});

