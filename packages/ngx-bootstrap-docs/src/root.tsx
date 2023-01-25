import { component$, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import globalStyles from './global.scss?inline';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <title>Angular Bootstrap</title>
        <meta charSet="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="description"
        content="Bootstrap 5 and Bootstrap 4 widgets for Angular: accordion, alerts, buttons, carousel, collapse, datepicker, dropdowns, modals, pagination, popover, progressbar, rating, sortable, tabs, timepicker, tooltip, typeahead"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href='/images/favicons/favicon-32x32.png'/>
        <link rel="icon" type="image/png" sizes="16x16" href='/images/favicons/favicon-16x16.png'/>
        <link rel="author" href="https://github.com/valor-software/ngx-bootstrap/graphs/contributors"/>
        <link rel="stylesheet" className="style-manager-theme"
        href='/css/bootstrap-5.2.3/css/bootstrap.min.css'/>
        {/*<link href="themes/prism.css" rel="stylesheet" />*/}
        <link href="/css/prism.css" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="application-name" content="ngx-bootstrap"/>
        <meta name="apple-mobile-web-app-title" content="ngx-bootstrap"/>
        <meta name="theme-color" content="#1d1d2b"/>
        <meta name="msapplication-navbutton-color" content="#1d1d2b"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="msapplication-starturl" content="/"/>
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <script async src='/js/prism.js'></script>
      </body>
    </QwikCityProvider>
  );
});
