import {component$, useStore, useStylesScoped$, useResource$, useClientEffect$, $} from '@builder.io/qwik';
import  SearchInput from './serach-input';
import styles from './header.css?inline';
import { CustomLink } from "~/routing/link";

export interface Istate {
  shadowRoutes: string[];
  appUrl: string;
  appHash?: string;
  currentVersion?: string;
  isBrowser: boolean;
  initBoxShadow: boolean;
  isLocalhost: boolean;
  needPrefix: boolean;
  previousDocs: {
    url: string;
    version: string;
    unprefixedUrl: string;
  }[];
}

export default component$(() => {
  const state = useStore <Partial<Istate>>({
    shadowRoutes: ['/documentation', '/discover', '/schematics', '/'],
    appUrl: '',
    initBoxShadow: false,
    isLocalhost: false,
    needPrefix: false,
    previousDocs: []
  });

  const getData= $(()=>{
    fetch('/json/versions.json'
      ,{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson: {
        url: string;
        version: string;
        unprefixedUrl: string;
      }[]) {
        state.previousDocs = myJson;
      });
  })

  useClientEffect$(() => {
    getData();
  });

  return (
    <header id="header" className={`header flex-nowrap ${state.initBoxShadow ? "box-shadow" : ""}`}>
      <div class="logo col-xl-2 col-lg-3" data-cypress="logoAtHeader">
        <CustomLink path={"/"}>
          <img  alt="ngx-bootstrap" src="/images/logos/ngx-bootstrap-logo-red.svg"/>
        </CustomLink>
      </div>
      <div class="sidebar-search col-xl-8 col-lg-6 display-lg-none">
        <SearchInput showInput={true}></SearchInput>
      </div>
       <div class="social-info col-xl-2 col-lg-3">
             <div class="prev-docs">
               <div class="dropdown-toggle">
                 {state.previousDocs?.[0]?.version && (
                   'v' + state.previousDocs?.[0].version
                 )} <span className="caret"></span>
               </div>
              </div>
         <ul data-cypress="infoButtons">
           <li>
             <a target="_blank" rel="noopener" href="https://stackoverflow.com/questions/tagged/ngx-bootstrap">
               <img src="/images/icons/stackoverflow.svg" alt="stackoverflow"/>
             </a>
           </li>
           <li>
             <a target="_blank" rel="noopener" href="https://github.com/valor-software/ngx-bootstrap">
               <img src="/images/icons/icon-git.svg" alt="ngx on github"/>
             </a>
           </li>
           <li>
             <a target="_blank" rel="noopener" href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY">
               <img src="/images/icons/icon-slack.svg" alt="ngx on slack"/>
             </a>
           </li>
         </ul>

       </div>

      {/*     todo implement when dropdown lib will be ready*/}


    </header>

);
});
