import {component$, useSignal, useTask$} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';
import {isBrowser} from "@builder.io/qwik/build";

export default component$(() => {
    /**
     * it is needed if tab Element is not one on the page
     * */
    const customId = 'basicTabs';
    return (
        <>
            <Tabset customId={customId}>
                <Tab heading="Basic title" id="tabs-basic-1">Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-basic-2">Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-basic-3">Basic content 2</Tab>
            </Tabset>
        </>
    );
});
