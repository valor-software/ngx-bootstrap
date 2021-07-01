import { currentBsVersion } from 'ngx-bootstrap/utils';
import { NgxModuleData } from './app.module';

export function getIndexHtmlCode(tag: string, component: NgxModuleData) {
  const bsVer = currentBsVersion();
  return `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/${bsVer === 'bs3' ? '3.3.7' : bsVer === 'bs5' ? '5.0.1' : '4.0.0'}/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
<div class="card-header mb-2 well">
This demo shows functionality of <strong>${component.moduleFolder}</strong> from <strong>ngx-bootstrap.</strong><br/>
You can find the full demo here <strong><a target="_blank" href="https://valor-software.com/ngx-bootstrap/#${component.moduleRoute}">https://valor-software.com/ngx-bootstrap/#${component.moduleRoute}</a></strong>
</div>
<div style="position: relative"><${tag}>Loading ngx-bootstrap...</${tag}></div>`;
}
