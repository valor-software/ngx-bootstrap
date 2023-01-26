import {component$, useClientEffect$, $, Slot, useStore} from '@builder.io/qwik';
import {getQueryParams} from "~/routing/routing";
import {tabsNames} from "~/components/docs-section/docs-section";
import SampleBox from '~/components/sample-box/sample-box';
import {ComponentExample, ContentSection} from '~/models/content-section.model';


export default component$((props: {section:ComponentExample, code: string}) => {
    const state = useStore({
        tabName: tabsNames.overview
    })

    useClientEffect$(() => {
        const key = tabsNames[getQueryParams('tab') as keyof typeof tabsNames]
        state.tabName = key || tabsNames.overview;
    });

    return (
        <div className="example-section">
            {!!props.section.title &&
                (<h3 id={props.section.anchor} className="d-flex justify-content-between">
                    {props.section.title}

                    {
                        !!props.section?.component && (
                            <p className="m-0">
                                <a
                                    title="Open this demo in StackBlitz"
                                    href="#"
                                    className="stackblitz-link"
                                    // onclick$={() => {
                                    //     // @ts-ignore
                                    //     openStackBlitzDemo(item?.component?.default, item?.html?.default)
                                    // }}
                                >
                                    <img src="/images/stackblitz.png" alt="" width="20"/>
                                </a>

                                {/*<a *ngIf="tabName !== 'examples'" class="anchor-link d-inline-block" routerLink="." [fragment]="item.anchor">#</a>*/}
                                {/*<a *ngIf="item.title !== 'Accessibility' && tabName === 'examples'" [queryParams]="{tab: 'overview'}" routerLink="." [fragment]="initFragment(item.anchor)">*/}
                                {/*<img src="assets/images/icons/icon-code.svg" alt="" width="20">*/}
                                {/*</a>*/}
                            </p>
                        )}

                </h3>)
            }

            {
                !!props.section.description && (
                    <p
                        dangerouslySetInnerHTML={props.section.description}></p>
                )}

            <SampleBox code={props.code}>
                <Slot></Slot>
            </SampleBox>
        </div>
    );
});

