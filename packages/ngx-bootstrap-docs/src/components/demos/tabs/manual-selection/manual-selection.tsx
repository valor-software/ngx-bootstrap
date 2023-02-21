import {component$, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';
import {isBrowser} from "@builder.io/qwik/build";

export default component$(() => {
    /**
     * it is needed if tab Element is not one on the page
     * */
    const customId = 'manualSelectionTabs';

    const openTabManualy = $((tabId: string) => {
        const eventDetail: TabsetCustomEvent = {
            tabsetId: customId,
            tab: {id: tabId, active: true}
        }

        window.dispatchEvent(new CustomEvent('updateTabBs', {'detail': eventDetail}))
    })

    return (
        <>
            <p>You can select tabs directly from component</p>
            <button class="btn btn-primary" onClick$={() => openTabManualy('tabs-manual-selection-2')}>Select second tab</button>
            <button class="btn btn-primary" onClick$={() => openTabManualy('tabs-manual-selection-3')}>Select third tab</button>
            <hr/>
            <Tabset customId={customId}>
                <Tab heading="Basic title" id="tabs-manual-selection-1">Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-manual-selection-2">Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-manual-selection-3">Basic content 2</Tab>
            </Tabset>
        </>
    );
});
