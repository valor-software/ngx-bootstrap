import { isBs3 } from 'ngx-bootstrap/utils';

export function getIndexHtmlCode(tag: string, component: string) {
  return `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/${isBs3() ? '3.3.7' : '4.0.0'}/css/bootstrap.min.css">
    <div class="card-header mb-2 well">
  This demo shows functionality of <strong>${component}</strong> from <strong>ngx-bootstrap.</strong><br/>
    You can find the full demo here <strong><a href="https://valor-software.com/ngx-bootstrap">https://valor-software.com/ngx-bootstrap</a></strong>
  </div>
  <div style="position: relative"><${tag}>Loading ngx-bootstrap...</${tag}></div>`;
}
