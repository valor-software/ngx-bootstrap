import {component$, useClientEffect$, useStore, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, ITab} from 'ngx-bootstrap';
import {demoComponentContent} from "~/routes/components/tabs/tabs-section.list";
import ExampleComponent from "~/components/example-component/example-component";

export type IState = {
    tabsList: ITab[]
};

export default component$(() => {
    const state = useStore<IState>({
        tabsList: []
    });

    const customId = 'dynamicTabs';

    useTask$(() => {
        state.tabsList = [
            {
                heading: 'basic',
                id: 'tabs-dynamic-1'
            },
            {
                heading: 'basic1',
                id: 'tabs-dynamic-2'
            },
            {
                heading: 'basic2',
                id: 'tabs-dynamic-3'
            }
        ]
    });

    const addTab = $(() => {
        const tab = {
            heading: `basic${state.tabsList.length + 1}`,
            id: `tabs-dynamic-${state.tabsList.length + 1}`,
            removable: true
        }
        state.tabsList.push(tab);
        state.tabsList = Array.from(state.tabsList);
        window.dispatchEvent(new CustomEvent('addTabBs', {'detail': {
                tabsetId: customId,
                tab
        }}))
    });

    const removeAllTabs = $(() => {
        const removedTabs = state.tabsList.splice(1, state.tabsList.length - 1);
        state.tabsList = Array.from(state.tabsList);
        window.dispatchEvent(new CustomEvent('removeTabBs', {'detail': {
                tabsetId: customId,
                tabs: removedTabs || []
            }}))
    })

        return (
        <>
            <button class="btn btn-primary" onClick$={() => addTab()}>Add tab</button>
            {state.tabsList.length > 1 ?
                (<button className="btn btn-primary" onClick$={() => removeAllTabs()}> Remove all tabs </button>) : ''
            }

            <Tabset customId={customId}>
                {state.tabsList.map((item: ITab, index) => {
                    return(
                        <Tab heading={item.heading} id={item.id} key={`key-${item.id}`} removable={item.removable}>Basic content {index}</Tab>
                    )
                })}
            </Tabset>
        </>
    );
});
