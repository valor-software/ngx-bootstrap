import {component$, useStore, $, useTask$, useClientEffect$, useOn} from '@builder.io/qwik';
import cityPlan from '@qwik-city-plan';
import { isServer, isBrowser } from '@builder.io/qwik/build';

export default component$((props: {showInput: boolean}) => {
  const state = useStore({
    isShown: false,
    search: { text: '' },
  }, { recursive: true });

  return (
    <>
      <div className={`w-100 icon ${props.showInput ? "" : "hideInput"}`}>
        <form>
          <div className={`input-container`}>
            <input
              type="text"
              aria-label="Search in docs" name="search"
              placeholder="Search..."
              value={state.search.text}
              onKeyUp$={(ev) => (state.search.text = (ev.target as HTMLInputElement).value)}
            />
          </div>
        </form>
      </div>
      <SearchList></SearchList>
    </>
);
});

export const SearchList = component$(() => {


  return (
    <>
     {/*<ul className="sidebar-list menu" data-cypress="search-result">*/}
      {/*todo finish search functionality, when routes folder will be full*/}
{/*      //   <ng-container *ngFor="let route of routes | slice:4 | SearchFilter:search.text">*/}
{/*      //   <li *ngIf="route.path"*/}
{/*      //     [routerLinkActive]="['active']"*/}
{/*      //     [routerLinkActiveOptions]="{exact: true}"*/}
{/*      //   class="w-100"*/}
{/*      //   (click)="search.text = ''"*/}
{/*      //   >*/}
{/*      //   <a [routerLink]="getRouteLink(route.path)" class="text-white d-block w-100">{{route.data[0]}}</a>*/}
{/*// </li>*/}
{/*// </ng-container>*/}
{/*     </ul>*/}
    </>
  )
})


