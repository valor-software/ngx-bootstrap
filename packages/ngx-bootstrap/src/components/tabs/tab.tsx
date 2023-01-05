import {component$, Slot, useClientEffect$, useContext, useContextProvider} from "@builder.io/qwik";
import { TabsContext } from "./tabs";

export interface ITab {
    heading?: string;
    id?: string;
    disabled?: boolean;
    removable?: boolean;
    customClass?: string;
    active?: boolean;
}

export const Tab = component$((props:ITab) => {
    const tabsArr = useContext(TabsContext);
    // useContextProvider(TabsContext, tabsArr);

    useClientEffect$(() => {
        if (!tabsArr.includes(props)) {
            tabsArr.push(props);
        }

        console.log('tab comp', tabsArr)
    })

    //todo test with more details such events for angular as ex
//     /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
// @Output() selectTab: EventEmitter<TabDirective> = new EventEmitter();
//     /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
// @Output() deselect: EventEmitter<TabDirective> = new EventEmitter();
//     /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
// @Output() removed: EventEmitter<TabDirective> = new EventEmitter();

    return (
        <div
            id={props.id}
            class={`${props.customClass}`}
        >
            <Slot></Slot>
        </div>
    )
})
