import {component$, useClientEffect$, useStore, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';

export default component$(() => {
    const state = useStore({
        activatedTab: ''
    })

    const customId = 'selectEventTabs';

    const showSelectedEvent = $((data: any) => {
        state.activatedTab = data;
    })

    return (
        <>
            {state.activatedTab ?
                (
                    <div className="mb-3">
                        <pre className="card card-block card-header">Event select is fired. The heading of the selected tab is: {state.activatedTab}</pre>
                    </div>
                ) :
                ('')
            }

            <Tabset customId={customId} activeTabIsChanged={showSelectedEvent}>
                <Tab heading="Basic title" id="tabs-disabled-1">Basic content</Tab>
                <Tab heading="Basic Title 1" id="tabs-disabled-2">Basic content 1</Tab>
                <Tab heading="Basic Title 2" id="tabs-disabled-3">Basic content 2</Tab>
            </Tabset>
        </>
    );
});
