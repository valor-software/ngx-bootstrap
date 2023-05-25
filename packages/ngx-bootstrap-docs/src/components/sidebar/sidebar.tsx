import {component$, $, useClientEffect$, useStore, useTask$, useSignal} from '@builder.io/qwik';
import SearchInput from "~/components/header/serach-input";
import {
  SidebarRoutesType,
  initBodyClass, firstMenuIniting, setLocationPath, refactorPathName
} from "~/routing/routing";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { CustomLink } from "~/routing/link";
import { AvailableBsVersions, getStoredTheme } from "~/components/sidebar/theme-storage";
import { currentBsVersion } from './theme-provider';
import { isBrowser } from "@builder.io/qwik/build";
import { installBsTheme } from './styleManager';

interface IState {
  menuIsOpened: boolean;
  routesStructure: Partial<SidebarRoutesType>,
  currentTheme: AvailableBsVersions | null;
  showSideBar: boolean;
}

export default component$(() => {
  const navigation = useNavigate();
  const location = useLocation();

  const state = useStore<IState>({
    menuIsOpened: true,
    routesStructure: {},
    currentTheme: null,
    showSideBar: false
  }, {recursive: true});

  useTask$(({track}) => {
    track(() => state.currentTheme);
    if (state.currentTheme) {
      installBsTheme(state.currentTheme);
    }
  })

  useClientEffect$(()=> {
    if (isBrowser && !state.currentTheme) {
      state.currentTheme = getStoredTheme() || currentBsVersion();
    }
  });

  useClientEffect$(() => {
    const listener = ()=> {
      setTimeout(() => {
        setLocationPath({path: location.pathname, query: location.query});
        state.routesStructure = firstMenuIniting(location.pathname);
        state.showSideBar = !!refactorPathName(location.pathname);
      }, 100)
    }

    if (isBrowser) {
      initBodyClass(state.menuIsOpened);
      if (!Object.keys(state.routesStructure).length) {
        listener();
      }
      window.addEventListener('locationchange', listener);
    }

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

    navigation(`${value}`)
    window.dispatchEvent(new Event('locationchange'));
  });

  const closeAdaptiveMenu = $(() => {
    if (innerWidth <= 991) {
      state.menuIsOpened = false;
    }
  });

  return (
      <>
        {!state.showSideBar ? (<div></div>) : (
            <div id="sidebar" className={`sidebar ${state.menuIsOpened ? 'menuIsOpened' : ''}`}>
              <div className="sidebar-search icon w-100">
                <button id="mobile-main-menu" type="button" className="align-self-baseline" onClick$={() => {
                  state.menuIsOpened = !state.menuIsOpened
                }}>
                  <img src="/images/icons/menu-left.svg" alt="left menu"/>
                </button>
                <div className="w-100">
                  <SearchInput showInput={false}></SearchInput>
                </div>
              </div>

              <div className={`mobile-menu ${state.menuIsOpened ? 'menuIsOpened w-100' : ''}`}>
                <div className="bootstrap-version transition-option">
                  <span className={`transition-option ${!state.menuIsOpened ? 'hideText' : ''}`}>Bootstrap: </span>
                  <div className="flex-nowrap d-flex">
                    <button type="button" className={`btn ${state.currentTheme === 'bs4' ? 'selected' : ''}`}
                            onClick$={() => state.currentTheme = 'bs4'}>4
                    </button>
                    <button type="button" className={`btn ${state.currentTheme === 'bs5' ? 'selected' : ''}`}
                            onClick$={() => state.currentTheme = 'bs5'}>5
                    </button>
                  </div>
                </div>
              </div>

              <div className="sidebar-content position-relative w-100">
                <ul className={'sidebar-list'}>
                  {Object.keys(state.routesStructure).map((item) => {
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
                                  <a className={`transition-option ${!state.menuIsOpened ? 'hideText m-0' : ''}`}
                                     href="javascript:void(0);">
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
                                  {!!item.fragments?.length && (
                                      <div className={`sidebar-list sidebar-list-fragment ${item.isOpened ? 'show' : ''}`}>
                                        {item.fragments.map((fragment: { title: string, path: string, isOpened: boolean }) => {
                                          return (<div
                                              className={`sidebar-item sidebar-item-fragment ${fragment.isOpened ? 'active' : ''}`}>
                                            <CustomLink
                                                path={`${item.path}?tab=${fragment.path}`}>{fragment.title}</CustomLink>
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
              <div className={`double-arrow position-absolute ${state.menuIsOpened ? 'menu-opened' : ''}`}
                   onClick$={() => state.menuIsOpened = !state.menuIsOpened}></div>
            </div>
        )}
      </>
)
})

