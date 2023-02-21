import {component$, useClientEffect$, useStore, useTask$, $} from '@builder.io/qwik';
import {Tabset, Tab, TabsetCustomEvent} from 'ngx-bootstrap';

export default component$(() => {

    const customId = 'customTemplateTabs';

    return (
        <>
            <div>
                <Tabset>
                    <div q:slot={'tabs-custom-template-2'}>
                        <span className="badge badge-secondary bg-secondary">Heading</span>
                    </div>
                    <div q:slot={'tabs-custom-template-3'}>
                        <i><b>Tab 3</b></i>
                    </div>
                    <Tab heading="Static" id="tabs-custom-template-1">
                        Tab 1
                    </Tab>
                    <Tab id="tabs-custom-template-2" hasCustomTemplate={true}>
                        I've got an HTML heading. Pretty cool!
                    </Tab>
                    <Tab id="tabs-custom-template-3" hasCustomTemplate={true}>
                        {/*<ng-template tabHeading>*/}
                        {/*    <i><b>Tab 3</b></i>*/}
                        {/*</ng-template>*/}
                        Tab with html tags in heading
                    </Tab>
                </Tabset>
            </div>
        </>
    );
});
