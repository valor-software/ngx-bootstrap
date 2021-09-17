import { NgxModuleData } from './app.module';

export function getIndexHtmlCode(tag: string, component: NgxModuleData, config: { crossorigin?: string, integrity?: string, cdnLink: string }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tes11angularclean</title>
  <base href="/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href=${ config.cdnLink } integrity=${ config.integrity } crossorigin=${ config.crossorigin }>
<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
  </head>
  <body>
  <div class="card-header mb-2 well">
This demo shows functionality of <strong>${component.moduleFolder}</strong> from <strong>ngx-bootstrap.</strong><br/>
You can find the full demo here <strong><a target="_blank" href="https://valor-software.com/ngx-bootstrap/#${component.moduleRoute}">https://valor-software.com/ngx-bootstrap/#${component.moduleRoute}</a></strong>
</div>
<div style="position: relative"><${tag}>Loading ngx-bootstrap...</${tag}></div>
  <app-root></app-root>
  </body>
  </html>`;
}
