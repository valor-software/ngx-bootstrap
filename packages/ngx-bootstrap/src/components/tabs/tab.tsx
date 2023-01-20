import {component$, Slot, useClientEffect$, useContext, useContextProvider, useStore, useTask$} from "@builder.io/qwik";
import { TabsContext} from "./tabs";

export interface ITab {
    heading?: string;
    id: string;
    disabled?: boolean;
    removable?: boolean;
    customClass?: string;
    active?: boolean;
}

export const Tab = component$((props:ITab) => {
    let tabsState = useContext(TabsContext);

    useClientEffect$(() => {
        tabsState._tabs.push(props);
        tabsState.tabsCheck = {};
        console.log(props);
    });

    useTask$(({ track }: { track: Function }) => {
        track(() => tabsState.tabsActiveId);
    });

    //todo test with more details such events for angular as ex
//     /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
// @Output() selectTab: EventEmitter<TabDirective> = new EventEmitter();
//     /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
// @Output() deselect: EventEmitter<TabDirective> = new EventEmitter();
//     /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
// @Output() removed: EventEmitter<TabDirective> = new EventEmitter();

    return (
        <>
            {tabsState.tabsActiveId === props.id ? (
                <div
                    id={props.id}
                    class={['tab-pane active', props.customClass]}
                    role={'tab-panel'}
                    aria-labelledby={`${props.id}`}
                >
                    <Slot></Slot>
                </div>
            ) : (
                // it is needed for component rendering, little workaround
                <div></div>
            )}
        </>
    )
})
