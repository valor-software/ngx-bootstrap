import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <footer>
      <div className="container-width m-auto d-flex justify-content-between align-items-center">
        <div className="footer-logo">
          <Link href="/" class="my-link">
            <img alt="ngx-bootstrap" src="/images/logos/ngx-bootstrap-logo-red.svg"/>
          </Link>
        </div>
        <div className="footer-text text-center">
          <p>© Designed and built by the ng-team at Valor Software with the help of our contributors.</p>
          <p>Code licensed under <a style="font-weight: 500"
                                    href="https://github.com/valor-software/ngx-bootstrap/blob/development/LICENSE"
                                    target="_blank" rel="noopener" className="text-white">MIT license conditions</a>, <a
            style="font-weight: 500" href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener"
            className="text-white"> docs CC BY 3.0</a></p>
        </div>
        <div className="footer-social col-xl-2 d-flex justify-content-between">
          <a className="img-holder" href="https://www.instagram.com/valor.software/" target="_blank">
            <img src="/images/icons/icon-inst.svg" alt="instagram icon"/>
          </a>
          <a className="img-holder" href="https://dribbble.com/valor-labs" target="_blank">
            <img src="/images/icons/icon-dribble.svg" alt="dribble icon"/>
          </a>
          <a className="img-holder" href="https://twitter.com/ValorSoft" target="_blank">
            <img src="/images/icons/icon-twiter.svg" alt="twiter icon"/>
          </a>
          <a className="img-holder" href="https://www.facebook.com/valorsoftware" target="_blank">
            <img src="/images/icons/icon-facebook.svg" alt="facebook icon"/>
          </a>
        </div>
      </div>
    </footer>
);
});
