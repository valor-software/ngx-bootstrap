import {component$, useClientEffect$, useStore, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';

export default component$(() => {
    const state = useStore({
        isTabDisabled: false
    });

    const customId = 'disabledTabs';

    const disableTab = $(() => {
        state.isTabDisabled = !state.isTabDisabled
        const eventDetail: TabsetCustomEvent = {
            tabsetId: customId,
            tab: {id: 'tabs-disabled-2', disabled: state.isTabDisabled}
        }

        window.dispatchEvent(new CustomEvent('updateTabBs', {'detail': eventDetail}))
    })

    return (
        <>
            <button class={'btn btn-primary'} onClick$={() =>(disableTab())}>Toggle disabled state</button>
            <hr/>
            <p>disabled state value: {(state.isTabDisabled).toString()}</p>
            <hr/>
            {state.isTabDisabled}
            <Tabset customId={customId}>
                <Tab heading="Basic title" id="tabs-disabled-1">Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-disabled-2">Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-disabled-3">Basic content 2</Tab>
            </Tabset>
        </>
    );
});
