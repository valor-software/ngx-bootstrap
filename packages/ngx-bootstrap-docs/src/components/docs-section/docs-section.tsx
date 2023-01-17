import {component$, useStore, $, useClientEffect$} from '@builder.io/qwik';
import {Tab, Tabset} from "ngx-bootstrap";
import {useNavigate} from "@builder.io/qwik-city";

export enum tabsNames {
    overview = 'overview',
    api = 'api',
    examples = 'examples'
}

export enum tabsNamesIds {
    'tab-overview' = 'overview',
    'tab-api' = 'api',
    'tab-examples' = 'examples'
}

export default component$(() => {
    const state = useStore({
        activeTab: tabsNames.overview
    });

    const navigate = useNavigate();

    useClientEffect$(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const tab = urlParams.get('tab');
        state.activeTab = tabsNames[tab as keyof typeof tabsNames] || tabsNames.overview;
        console.log('check activeTab', state.activeTab);
    });

    useClientEffect$(() => {
        // const listener = ()=> {
        //     setTimeout(() => {
        //         const queryString = window.location.search;
        //         const urlParams = new URLSearchParams(queryString);
        //         const tab = urlParams.get('tab');
        //         console.log('tab2', tab)
        //     },100)
        // }
        //
        // window.addEventListener('locationchange', listener);
        // return ()=> {window.removeEventListener('locationchange',listener)}
    })

    const onChangeFunc = $((activeTabId: string) => {
        // if (!state.activeTab) {
            // navigate.path = `?tab=${tabsNamesIds[activeTabId as keyof typeof tabsNamesIds]}`;
            // const key = tabsNamesIds[activeTabId as keyof typeof tabsNamesIds] === 'overview' ? tabsNames.overview :
            //     tabsNamesIds[activeTabId as keyof typeof tabsNamesIds] === 'api' ? tabsNames.api : tabsNames.examples;



            // console.log('onchange func', key);
        // }

    })

    return (
        <div class="docs-section">
            <div className="example-tabset-box tabset">
                <Tabset onChange={onChangeFunc}>
                    <Tab heading="Overview" id={'tab-overview'} active={state.activeTab === tabsNames.overview}
                         customClass={'example-tabset cursor-pointer'}>Justified content</Tab>
                    <Tab heading="API" id={'tab-api'} active={state.activeTab === tabsNames.api}
                         customClass={'example-tabset cursor-pointer'}>SJ</Tab>
                    <Tab heading="Examples" id={'tab-examples'} active={state.activeTab === tabsNames.examples}
                         customClass={'example-tabset cursor-pointer'}>Long Justifie</Tab>
                </Tabset>
            </div>
        </div>
    );
});

