import {component$, Slot, useClientEffect$, useContext, useContextProvider, useStore, useTask$} from "@builder.io/qwik";
import { TabsContext} from "./tabs";
import { ITab } from './models';

export const defaultTab = {
    heading: '',
    id: '',
    disabled: false,
    removable: false,
    customClass: '',
    active: false,
    hasCustomTemplate: false
}



export const Tab = component$((props:ITab) => {
    let tabsState = useContext(TabsContext);

    useClientEffect$(() => {
        const tab = Object.assign({}, defaultTab);
        for (let key in tab) {
            // @ts-ignore
            tab[key as keyof typeof tab] = key in props ? props[key as keyof typeof tab] : tab[key as keyof typeof tab];
        }

        tabsState._tabs.push(tab);
        tabsState.tabsCheck = {};
    });

    useTask$(({ track }: { track: Function }) => {
        track(() => tabsState.tabsActiveId);
    });

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
