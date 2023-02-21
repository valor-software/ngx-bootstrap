import {component$, useClientEffect$, useStore, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';

export default component$(() => {

    const customId = 'justifiedPillsTabs';

    return (
        <>
            <p><i>Bootstrap 4 doesn't have justified classes</i></p>
            <Tabset customId={customId} justified={true}>
                <Tab heading="Basic title" id="tabs-disabled-1">Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-disabled-2">Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-disabled-3">Basic content 2</Tab>
            </Tabset>
        </>
    );
});
