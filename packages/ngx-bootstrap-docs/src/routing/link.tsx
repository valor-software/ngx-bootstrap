import { component$, Slot } from '@builder.io/qwik';
import { useNavigate } from "@builder.io/qwik-city";

export const CustomLink = component$((opts: { path: string, class?: string }) => {
    const navigation = useNavigate();
    return (
        <a
            // This will prevent the default behavior of the "click" event.
            preventdefault:click
            className={opts.class}
            // set the correct class when the link is active
            href={opts.path} onClick$={(e) => {
              window.dispatchEvent(new Event('locationchange'));
              navigation.path=opts.path
        }}><Slot/></a>
    );
});
