import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$((props: {
  name?: string,
  src?: string,
  html?: string,
  ts?: string
}) => {
  return (
    <main class="main">
      <section class="main-container transition-option">
        {/*<bread-crumbs></bread-crumbs>*/}
        <div class="content-box">
          <div class="content w-100">
            <div class="content-header">


              {(props.name || props.src) &&
  (             <h1>{props.name}
                <Link href={props.src} target="_blank" rel="noopener">
                  <img src="/images/link-doc.png" alt="component on github"/>
                </Link>
                </h1>)
              }
        </div>

        <div id="content">
          <div id="example" class="section">
            <div class="item">
              <Slot/>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</main>
  );
});
