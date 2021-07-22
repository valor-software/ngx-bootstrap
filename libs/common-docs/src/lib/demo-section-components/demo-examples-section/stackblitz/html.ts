import { currentBsVersion } from 'ngx-bootstrap/utils';
import { NgxModuleData } from './app.module';

export function getIndexHtmlCode(tag: string, component: NgxModuleData) {
  const bsVer = currentBsVersion();
  const crossorigin = bsVer !== 'bs3' ? "anonymous" : undefined;
  const integrity = bsVer === 'bs5' ? 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' : bsVer === 'bs4' ? 'sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2' : undefined;
  const cdnLink = bsVer === 'bs5' ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' : bsVer === 'bs4' ? 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css' : 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
  return `<link rel="stylesheet" href=${ cdnLink } integrity=${ integrity } crossorigin=${ crossorigin }>
<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
<div class="card-header mb-2 well">
This demo shows functionality of <strong>${component.moduleFolder}</strong> from <strong>ngx-bootstrap.</strong><br/>
You can find the full demo here <strong><a target="_blank" href="https://valor-software.com/ngx-bootstrap/#${component.moduleRoute}">https://valor-software.com/ngx-bootstrap/#${component.moduleRoute}</a></strong>
</div>
<div style="position: relative"><${tag}>Loading ngx-bootstrap...</${tag}></div>`;
}
