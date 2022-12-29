import {component$, $, useOn, useOnWindow, useClientEffect$, useStore} from '@builder.io/qwik';
import * as React from 'react';
import SearchInput from "~/components/header/serach-input";
import {
  setRoutesCollection,
  SidebarRoutesType,
  SidebarRouteItemValueType,
  NestedRouteType,
  refactorPathName, refactorPathsNames, toggleMenuItem, resetSemiMenu, initBodyClass, firstMenuIniting, setLocationPath
} from "~/routing/routing";
import {useLocation, useNavigate} from "@builder.io/qwik-city";
import {CustomLink} from "~/routing/link";

interface IState {
  menuIsOpened: boolean;
  routesStructure: Partial<SidebarRoutesType>,
}

export default component$(() => {
  const state = useStore<IState>({
    menuIsOpened: true,
    routesStructure: {},
  }, {recursive: true});

  const navigation = useNavigate();
  const location = useLocation();

  useClientEffect$(() => {
    if (!Object.keys(state.routesStructure).length) {
      setLocationPath({path: location.pathname, query: location.query});
      state.routesStructure = firstMenuIniting(location.pathname);
    }

    initBodyClass(state.menuIsOpened);

    const listener = ()=> {
      setTimeout(() => {
        setLocationPath({path: location.pathname, query: location.query});
        state.routesStructure = firstMenuIniting(location.pathname);
      },100)
    }

    window.addEventListener('locationchange', listener);
    return ()=> {window.removeEventListener('locationchange',listener)}
  });

  function getSideBarItemIsOpened (): string | keyof SidebarRoutesType {
    for (const item in state.routesStructure) {
      if (state.routesStructure[item as keyof SidebarRoutesType]?.isOpened) {
        return item as keyof SidebarRoutesType;
      }
    }

    return '';
  }

  const clickedMenuItem = $((value?: string) => {
    if (!value) {
      return;
    }

      navigation.path = `${value}`;
      window.dispatchEvent(new Event('locationchange'));
  });

  const closeAdaptiveMenu = $(() => {
    if (innerWidth <= 991) {
      state.menuIsOpened = false;
    }
  })

  return (
    <div id="sidebar" className={`sidebar ${state.menuIsOpened ? 'menuIsOpened' : ''}`}>
      <div className="sidebar-search icon w-100">
        <button id="mobile-main-menu" type="button" className="align-self-baseline" onClick$={() => {state.menuIsOpened = !state.menuIsOpened}}>
          <img src="/images/icons/menu-left.svg" alt="left menu"/>
        </button>
        <div class="w-100">
          <SearchInput showInput={false}></SearchInput>
        </div>
      </div>

      <div className={`mobile-menu w-100 ${state.menuIsOpened ? 'menuIsOpened' : ''}`}>
        <div class="bootstrap-version transition-option">
          <span className={`transition-option ${!state.menuIsOpened ? 'hideText' : ''}`}>Bootstrap: </span>
          {/*<div class="flex-nowrap d-flex">*/}
          {/*  <button class="btn" type="button" className={`${}`} [class.selected]="_bsVersions.isBs4" (click)="installTheme('bs4')">4</button>*/}
          {/*<button class="btn" type="button" [class.selected]="_bsVersions.isBs5"  (click)="installTheme('bs5')">5</button>*/}
          {/*</div>*/}
        </div>
      </div>

      <div class="sidebar-content position-relative w-100">
        <ul className={'sidebar-list'}>
          {Object.keys(state.routesStructure).map( (item) =>{
              if (state.routesStructure[item as keyof SidebarRoutesType]?.title) {
                return <li
                  key={item}
                  onClick$={() => {
                    clickedMenuItem(state.routesStructure[item as keyof SidebarRoutesType]?.path);
                  }}
                  className={`
                 sidebar-item-main ${state.routesStructure[item as keyof SidebarRoutesType]?.isOpened ? 'active' : ''}
                 ${state.routesStructure[item as keyof SidebarRoutesType]?.nestedRoutes?.length && state.menuIsOpened ? 'icon' : ''}
                 `}
                >
                  <div className="sidebar-list-box">

                    <img src={
                      state.routesStructure[item as keyof SidebarRoutesType]?.icon
                    } alt="sidebar icon"/>
                    {state.routesStructure[item as keyof SidebarRoutesType]?.path && (
                      <span className={`transition-option ${!state.menuIsOpened ? 'hideText m-0' : ''}`}>
                      {state.routesStructure[item as keyof SidebarRoutesType]?.title}
                     </span>
                    )}
                    {!state.routesStructure[item as keyof SidebarRoutesType]?.path && (
                      <a className={`transition-option ${!state.menuIsOpened ? 'hideText m-0' : ''}`} href="javascript:void(0);">
                        {state.routesStructure[item as keyof SidebarRoutesType]?.title}
                      </a>
                    )}
                  </div>
                </li>
              }
            }
          )}
        </ul>
        {(state.menuIsOpened && !!getSideBarItemIsOpened()) && (
          <ul className="sidebar-list scroll-list">
            {
              // @ts-ignore
              state.routesStructure[getSideBarItemIsOpened() as keyof typeof SidebarRoutesType]?.nestedRoutes?.map(item => {
                return (
                  <li className={`w-100 ${item.isOpened ? 'active' : ''}`}>
                    <div className={
                      `sidebar-list-box d-flex flex-column secondary-items
                        ${// @ts-ignore
                        item.isOpened ? 'show' : ''}`
                    }>
                      <p onClick$={() => {
                        clickedMenuItem(item.path);
                        closeAdaptiveMenu();
                      }
                      }>{item.title}</p>
                      {item.fragments?.length && (
                        <div className={`sidebar-list sidebar-list-fragment ${item.isOpened ? 'show' : ''}`}>
                          {item.fragments.map((fragment: {title: string, path: string, isOpened: boolean}) => {
                            return (<div className={`sidebar-item sidebar-item-fragment ${fragment.isOpened ? 'active' : ''}`}>
                              <CustomLink path={`${item.path}?tab=${fragment.path}`}>{fragment.title}</CustomLink>
                            </div>)
                          })}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })
            }
          </ul>
        )}
      </div>
      <div className={`double-arrow position-absolute ${state.menuIsOpened ? 'menu-opened' : ''}`} onClick$={() => state.menuIsOpened = !state.menuIsOpened}></div>
    </div>
)
})

