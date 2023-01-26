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

