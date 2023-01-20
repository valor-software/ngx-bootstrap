import {component$, useClientEffect$, $, Slot, useStore} from '@builder.io/qwik';
import {getQueryParams} from "~/routing/routing";
import {tabsNames} from "~/components/docs-section/docs-section";
import SampleBox from '~/components/sample-box/sample-box';
import { ContentSection } from '~/models/content-section.model';


export default component$((props: {section:ContentSection}) => {
    const state = useStore({
        tabName: tabsNames.overview
    })

    useClientEffect$(() => {
        const key = tabsNames[getQueryParams('tab') as keyof typeof tabsNames]
        state.tabName = key || tabsNames.overview;
        console.log(props.section)
    });

    // const openStackBlitzDemo = $((comp, html) => {
    //     console.log(comp, html);
    // })

    return (

        <div class='examples'>
        {!!props.section?.description && (<p dangerouslySetInnerHTML={props.section?.description}></p>)}

        {props.section?.content?.map((item) => (
            <div class="example-section">
                {!!item.title &&
                    (<h3 id={item.anchor} class="d-flex justify-content-between">
                        { item.title }

                        {// @ts-ignore
                            !!(item?.component || state.tabName === 'examples') && (
                            <p class="m-0">
                                {!!(item.title !== 'Accessibility' && state.tabName !== 'examples') &&
                                    (<a
                                    title="Open this demo in StackBlitz"
                                    href="#"
                                    class="stackblitz-link"
                                    // onclick$={() => {
                                    //     // @ts-ignore
                                    //     openStackBlitzDemo(item?.component?.default, item?.html?.default)
                                    // }}
                                    >
                                    <img src="/images/stackblitz.png" alt="" width="20"/>
                                    </a>
                                    )
                                }

                                {/*<a *ngIf="tabName !== 'examples'" class="anchor-link d-inline-block" routerLink="." [fragment]="item.anchor">#</a>*/}
                                {/*<a *ngIf="item.title !== 'Accessibility' && tabName === 'examples'" [queryParams]="{tab: 'overview'}" routerLink="." [fragment]="initFragment(item.anchor)">*/}
                                {/*<img src="assets/images/icons/icon-code.svg" alt="" width="20">*/}
                                {/*</a>*/}
                            </p>
                        )}

                    </h3>)
                }

                {    // @ts-ignore
                    !!item.description && (
                    <p
                        // @ts-ignore
                        dangerouslySetInnerHTML={item.description}></p>
                )}

            <SampleBox
                // @ts-ignore
                html={item.html?.default} ts={item.component?.default} style={item.style}>
                <Slot></Slot>
            {/*<ng-container *ngComponentOutlet="item.outlet"></ng-container>*/}
            </SampleBox>
            </div>


        ))}


        </div>

    );
});

