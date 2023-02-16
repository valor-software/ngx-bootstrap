import { component$, Slot } from '@builder.io/qwik';

export default component$((props:{code?: string}) => {
    return (
        <>
            <div class="section bd-example">
                <Slot/>
            </div>
            <div class="section">
                <div class="item">
                    <pre className="lang-js prettyprint">
                        <code dangerouslySetInnerHTML={props.code}></code>
                    </pre>
                </div>
            </div>
        </>
    );
});


// import { component$, type QRL, useOnDocument, $, useSignal, type Signal } from "@builder.io/qwik";
//
// export const useClickOutside = (ref: Signal<HTMLElement | undefined>, onClickOut: QRL<() => void>) => {
//     useOnDocument("click", $((event) => {
//         if (!ref.value) { return }
//         const target = event.target as HTMLElement;
//         if (!ref.value.contains(target)) {
//             onClickOut();
//         }
//     }));
// };
//
// export default component$(() => {
//     const hitBoxRef = useSignal<HTMLElement>();
//     useClickOutside(hitBoxRef, $(() => {
//         alert("you clicked outside of the box!")
//     }))
//     return <div style={"display: grid; place-content: center; width: 100%; height; 100%"}>
//         <div ref={hitBoxRef} style="width: 20rem; height: 20rem; border: 1px dashed white;"></div>
//     </div>
// })

