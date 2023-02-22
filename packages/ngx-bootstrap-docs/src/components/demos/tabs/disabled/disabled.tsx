import {component$, useClientEffect$, useStore, useTask$, $, useSignal} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';

export default component$(() => {
    const state = useStore({
        isTabDisabled: false
    });

    const customId = 'disabledTabs';

    const updatedTab = useSignal<{id: string}>();
    const setDisabledValue = $(() => {
        state.isTabDisabled = !state.isTabDisabled;
        updatedTab.value = Object.assign({},
            {
                        id: 'tabs-disabled-3',
                        disabled: state.isTabDisabled,
                        tabsetId: customId
            }
        );
    });

    return (
        <>
            <p>Tabs can be enabled or disabled by changing <code>disabled</code> input property</p>
            <button class={'btn btn-primary'} onClick$={() =>(setDisabledValue())}>Toggle disabled state</button>
            <hr/>
            <p>disabled state value: {(state.isTabDisabled).toString()}</p>
            <hr/>
            <Tabset customId={customId} updateTab={updatedTab.value}>
                <Tab heading="Basic title" id="tabs-disabled-1">Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-disabled-2">Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-disabled-3">Basic content 2</Tab>
            </Tabset>

        </>
    );
});
