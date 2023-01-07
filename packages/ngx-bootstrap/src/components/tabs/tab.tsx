import { component$, Slot, useClientEffect$, useContext, useContextProvider, useTask$ } from "@builder.io/qwik";
import {ActiveTabContext, ActiveTabIdContext, TabsContext} from "./tabs";

export interface ITab {
    heading?: string;
    id: string;
    disabled?: boolean;
    removable?: boolean;
    customClass?: string;
    active?: boolean;
}

export const Tab = component$((props:ITab) => {
    let tab = useContext(ActiveTabContext);
    let tabsArr = useContext(TabsContext);
    let id = useContext(ActiveTabIdContext);

    useTask$(({ track }: { track: Function }) => {
        track(() => tab);
    });

    useTask$(({ track }: { track: Function }) => {
        track(() => tabsArr);
    });

    useClientEffect$(() => {
            if (!tabsArr.includes(props)) {
                tabsArr.push(props);
            }
    })

    //todo test with more details such events for angular as ex
//     /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
// @Output() selectTab: EventEmitter<TabDirective> = new EventEmitter();
//     /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
// @Output() deselect: EventEmitter<TabDirective> = new EventEmitter();
//     /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
// @Output() removed: EventEmitter<TabDirective> = new EventEmitter();

    return (
        <>
            {!props.active && <div></div>}
            <div
                id={props.id}
                class={`tab-pane ${props.customClass ? props.customClass : ''} ${props.active ? 'active' : ''} `}
                role={'tab-panel'}
                aria-labelledby={`${props.id}`}
            >
                {tab.heading}
                <Slot></Slot>
                {props.id}
            </div>

        </>
    )
})
