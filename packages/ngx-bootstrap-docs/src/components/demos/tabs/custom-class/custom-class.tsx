import {component$, useClientEffect$, useStore, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';

export default component$(() => {
    const customId = 'customClassTabs';

    return (
        <>
            <Tabset customId={customId}>
                <Tab heading="Basic title" id="tabs-disabled-1" customClass={'customClass'}>Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-disabled-2" customClass={'customClass'}>Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-disabled-3" customClass={'customClass'}>Basic content 2</Tab>
            </Tabset>
        </>
    );
});
