import {component$, useClientEffect$, useContext, useStore, useTask$, $} from '@builder.io/qwik';
import { Tabset, Tab } from 'ngx-bootstrap';
// import DocsSection, {tabsNames} from '../../components/docs-section/docs-section';

// export enum tabsNames {
//     overview = 'overview',
//     api = 'api',
//     examples = 'examples'
// }

export default component$(() => {
    // const state = useStore({
    //     activeTab: tabsNames.overview
    // });
    //
    // const onChangeFunc = $((activeTabId: string) => {
    //     console.log('onchange func', activeTabId);
    // })

    return (

        <div>
          {/*Components page*/}
          {/*  <div style={'margin-top: 200px; margin-left: 400px;'}>*/}
          {/*      <Tabset onChange={onChangeFunc}>*/}
          {/*          <Tab heading="overview" id={'tab-overview'} active={state.activeTab === tabsNames.overview}>Justified content</Tab>*/}
          {/*          <Tab heading="api" id={'tab-api'} active={state.activeTab === tabsNames.api}>SJ</Tab>*/}
          {/*          <Tab heading="examples" id={'tab-examples'} active={state.activeTab === tabsNames.examples}>Long Justifie</Tab>*/}
          {/*      </Tabset>*/}
          {/*  </div>*/}
        </div>
    );
});

