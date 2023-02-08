import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import {CustomLink} from "~/routing/link";

export default component$(() => {

  return (
    <div class="main">
      <section class="landing landing-logo m-auto">
        <div class="container">
          <div class="row flex-column container-width text-center">
            <h1 data-cypress="sloganBs">Develop better. Faster.</h1>
            <div class="logo position-relative d-block d-lg-none mt-3">
              <CustomLink path={'/components'}>
                <img src="/images/logos/ngx-bootstrap-logo.svg" alt="ngx-bootstrap logo"/>
              </CustomLink>
            </div>
            <div class="button-box d-flex justify-content-between">
                <CustomLink path={'/documentation#getting-started'} class={'btn btn-primary text-white'}>Get started</CustomLink>
                <CustomLink path={'/documentation'} class={'btn btn-outline-primary'}>Documentation</CustomLink>
          </div>
        </div>
        <div class="logo position-relative d-none d-lg-block">
          <Link href="/components" class="d-flex justify-content-center">
            <img src="/images/logos/ngx-bootstrap-logo.svg" alt="ngx-bootstrap logo"/>
          </Link>
        </div>
    </div>
</section>

      <section className="landing landing-advantages w-100" data-cypress="advantagesBs">
        <div className="container container-width m-auto">
          <h2 className="text-center text-white">Benefits of working with us</h2>
          <div className="row">
            <div className="col-12 col-xl-6 d-flex">
              <div className="img-holder">
                <img src="/images/icons/advantages-01.svg" alt=""/>
              </div>
              <div className="txt-holder">
                <h4>Flexible</h4>
                <p>
                  We put much effort into making ngx-bootstrap modular so you can implement your templates, styles,
                  whatnot. All components are designed with extensibility and adaptivity in mind. You can expect them to
                  work on Mobile and Desktop with the same level of performance.
                </p>
              </div>
            </div>

            <div className="col-12 col-xl-6 d-flex flex-wrap">
              <div className="img-holder">
                <img src="/images/icons/advantages-02.svg" alt=""/>
              </div>
              <div className="txt-holder">
                <h4>Extensible-friendly code</h4>
                <p>
                  We have incorporated a set of style guides and guidelines to enhance both code maintainability and
                  readability. Also, we always support the latest Angular versions and provide full unit-test coverage.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-xl-6 d-flex flex-wrap">
              <div className="img-holder">
                <img src="/images/icons/advantages-03.svg" alt=""/>
              </div>
              <div className="txt-holder">
                <h4>Great documentation</h4>
                <p>
                  Being developers ourselves, we understand the importance of documentation. Well-written and
                  continually updated docs significantly ease up the life of developers and improve overall software
                  quality. We are doing our best to provide you with the most complete and easy-to-understand
                  documentation out there.
                </p>
              </div>
            </div>
            <div className="col-12 col-xl-6 d-flex flex-wrap">
              <div className="img-holder">
                <img src="/images/icons/advantages-04.svg" alt=""/>
              </div>
              <div className="txt-holder">
                <h4>Tons of demos</h4>
                <p>
                  While working with visually rich libraries, you need to know what you are getting without going
                  through the installation hassle. That is why we have developed a great set of demos for most of the
                  component’s methods. More will follow!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="landing landing-additional-inf w-100">
        <div className="container-width-lg m-auto d-flex justify-content-between mw-100">
          <div className="bubble-box">
            <div className="bubble position-relative">
              <img src="/images/logos/valor-logo.svg" alt="valor software logo"/>
            </div>
          </div>
          <div className="text-holder">
            <h2>Looking for More?</h2>
            <p>
              We can help! If you are looking for a custom theme, new components, or help in migrating your existing
              designs to ngx-bootstrap, we’ve got you covered. Learn more about <a href="https://valor-software.com"
                                                                                   target="_blank">Valor Software</a>,
              the team behind ngx-bootstrap, and see how we can collaborate on our official <a
              href="https://valor-software.com/services" target="_blank">Valor Software site</a>.
            </p>
            <a className="btn btn-primary" href="https://github.com/valor-software" target="_blank">Get our help</a>
          </div>
        </div>
      </section>
      <section className="landing landing-supporting w-100">
        <div className="container-width-lg m-auto d-flex justify-content-between mw-100">
          <div className="text-holder">
            <h2>Supporting<br/>ngx-bootstrap</h2>
            <p>ngx-bootstrap is an Open Source (MIT Licensed) independent project with ongoing development made possible
              thanks to the support of our awesome backers. If you’re also willing to show support or simply give back
              to the Open Source community, please consider becoming a partner. Valor Software employees and contractors
              are not eligible to use these funds.</p>
            <div className="button-box d-flex justify-content-between w-100">
              <a className="btn btn-primary text-white" target="_blank" href="https://opencollective.com/ngx-bootstrap">Become
                a sponsor</a>
              <a className="btn btn-outline-primary" target="_blank"
                 href="https://github.com/valor-software/ngx-bootstrap/blob/development/CONTRIBUTING.md">Become a
                contributor</a>
            </div>
          </div>
          <div className="img-holder d-flex align-items-center d-none d-lg-block">
            <img src="/images/macbook_page.png" alt="macbook picture with ngx-bootstrap" className="mw-100"/>
          </div>
        </div>
      </section>

    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to ngx-bootstrap',
  meta: [
    {
      name: 'description',
      content: 'ngx-bootstrap description',
    },
  ],
};
