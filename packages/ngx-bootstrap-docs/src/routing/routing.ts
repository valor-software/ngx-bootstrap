// this one will be called by the <App/> component and initialize
// the state once for the entire lifecycle of the application
import {ROUTING, RoutingState} from './routing-state';
import {$, useContextProvider, useStore} from '@builder.io/qwik';
import {RoutingConfig, RoutingConfigItem} from './routing-types';
// import {routingConfig} from '../routing-config';
import {isServer} from '@builder.io/qwik/build';
import cityPlan from "@qwik-city-plan";
import documentation from "~/routes/documentation";
import {RouteLocation, RouteParams, useLocation} from "@builder.io/qwik-city";

let generalRoutesStructure: Partial<SidebarRoutesType>;
let _location: {path: string, query: Record<string, string>};

export type SidebarRoutesType = {
  [key in "documentation" | "components" | "themes"]: Partial<SidebarRouteItemValueType>;
};

export type SidebarRouteItemValueType = {
  nestedRoutes: Partial<NestedRouteType>[];
  isOpened: boolean;
  title: string;
  icon: string;
  path?: string;
};
export type NestedRouteType = {
  parentRoute: string;
  path?: string;
  isOpened: boolean;
  fragments: {
    title: string;
    path: string;
    isOpened: boolean;
  }[] | [];
};

export const SidebarRoutesStructure: Partial<SidebarRoutesType> = {
  documentation: {
    nestedRoutes:[],
    isOpened: false,
    title: 'DOCUMENTATION',
    icon: '/images/icons/icon-folder.svg',
    path: '/documentation'
  },
  components: {
    nestedRoutes: [],
    isOpened: false,
    title: 'COMPONENTS',
    icon: '/images/icons/icon-components.svg',
    path: '/components'
  }
  // themes: {
  //   nestedRoutes:[],
  //   isOpened: false,
  //   title: 'THEMES',
  //   icon: 'assets/images/icons/icon-theme.svg',
  //   path: 'themes'
  // }
};

export const SideBarNestedRoutes = {
  dropdown: {
    sideBarParentTitle: 'components', parentRoute: 'components', title: 'Dropdowns'
  }
}

// export function initializeRouter(url?: string): RoutingState {
//     // create a store and state
//     const routingState = useStore<RoutingState>(
//         getRoutingStateByPath(url)
//     );
//
//     useContextProvider(ROUTING, routingState);
//     return routingState;
// }

export function refactorPathName(path: string): string {
  return path.split('/').join('').toString()
}

export function refactorPathsNames(path: string): string[] {
  const route = path.split('/').filter(item => item);
  return route;
}

// safely get the window object
// export function getWindow(): Window | undefined {
//     if (!isServer) {
//         return typeof window === 'object' ? window : undefined
//     }
//     return undefined;
// }
//
// export function navigateTo(path: string, routingState: RoutingState): void {
//     if (!isServer) {
//         // we don't actually navigate, we just push a new state to
//         // the history object
//         getWindow()?.history?.pushState({page: path}, path, path);
//         setRoutingState(path, routingState);
//     }
// }

// export function getRouteStructureKey(route: string, routesList: SidebarRoutesType) {
//   return routesList[route as keyof SidebarRoutesType];
// }

export function setRoutesCollection(): SidebarRoutesType  {
  let routesList: SidebarRoutesType = {documentation: {}, themes: {}, components: {}};
  const mainRoutesItems = ['documentation', 'themes', 'components'];
  let nestedRouts: {[key: string]: Partial<NestedRouteType>}  = {};
  for (let link of cityPlan.routes) {
    const routesArr: string[] = link[3].split('/').filter((item: string) => item);
    routesArr.map((item) => {
      if (mainRoutesItems.includes(item)) {
        const routeItem: Partial<SidebarRouteItemValueType> | null = createRouteItem(routesArr) || null;
        // @ts-ignore
        routesList[item] = routeItem;
      } else {
        if (SideBarNestedRoutes[item as keyof typeof SideBarNestedRoutes]) {
          const data = SideBarNestedRoutes[item as keyof typeof SideBarNestedRoutes];
          const nestedItem: Partial<NestedRouteType> = {
            path: `/${data?.parentRoute}/${item}`,
            isOpened: false,
            fragments: data.parentRoute === 'components' ? initFragments() : []
          };
          const nestedRes = {...data, ...nestedItem}
          nestedRouts ={...nestedRouts, [item]: nestedRes}
        }
      }

    })
  }

  Object.keys(nestedRouts).map((item) => {
    const parentRoute = nestedRouts[item as keyof typeof nestedRouts]?.parentRoute;
    if (routesList[parentRoute as keyof typeof routesList]) {
      routesList[parentRoute as keyof typeof routesList].nestedRoutes?.push(nestedRouts[item as keyof typeof nestedRouts])
    }
  })
  generalRoutesStructure = routesList;
  return routesList;
}

function createRouteItem(route: string[]): Partial<SidebarRouteItemValueType> | void {
  let res: Partial<SidebarRouteItemValueType> | undefined;
  route.map(item => {
    if (item === 'documentation' || item === 'components' || item === 'themes') {
        res = SidebarRoutesStructure[item];
    }
  });
  return res;
}

function initFragments(): {title: string, path: string, isOpened: boolean}[] {
  return [
    {
      title: 'Overview',
      path: 'overview',
      isOpened: false
    },
    {
      title: 'API',
      path: 'api',
      isOpened: false
    },
    {
      title: 'Examples',
      path: 'examples',
      isOpened: false
    }
  ];
}

// export function listenToRouteChanges(routingState: RoutingState): void {
//     if (!isServer) {
        // when the navigation buttons are being used
        // we want to set the routing state
        // getWindow()?.addEventListener('locationchange', (e) => {
            // const path = e.state.page;
            // setRoutingState(path, routingState);
        // })
    // }
// }

// export function setRoutingState(path: string, routingState: RoutingState): void {
//     const oldUrl = new URL(routingState.url);
//     const newUrl = new URL(oldUrl.origin + path);
//     const {segments, url} = getRoutingStateByPath(newUrl.toString())
//     routingState.segments = segments;
//     routingState.url = url;
// }


// this will retrieve the routingstate by the path (the current url)
// export function getRoutingStateByPath(path?: string): RoutingState {
//     if (!path) {
//       return {
//         url: '',
//         segments: []
//       }
//     }
//
//     const url = new URL(path);
//     const segments = url.pathname.split('/');
//     segments.splice(0, 1);
//     return {
//         url: path,
//         segments: segments
//     }
// }

// export function getMatchingConfig(segments: string[], config: RoutingConfig): RoutingConfigItem {
//     const found = config.find(item => segmentsMatch(segments, item))
//     if (found) {
//         return found;
//     }
//     return null;
// }

// export function segmentsMatch(pathSegments: string[], configItem: RoutingConfigItem): boolean {
//     const configItemSegments = configItem.path.split('/');
//     if (configItemSegments.length !== pathSegments.length) {
//         return false;
//     }
//     const matches = pathSegments.filter((segment, index) => {
//         return segment === configItemSegments[index] || configItemSegments[index].indexOf(':') === 0
//     });
//     return matches.length === pathSegments.length;
// }

// export function getParams(routingState: RoutingState): { [key: string]: string } {
//     const matchingConfig = getMatchingConfig(routingState.segments, routingConfig);
//     const params = matchingConfig.path.split('/')
//         .map((segment: string, index: number) => {
//             if (segment.startsWith(':')) {
//                 return {
//                     index,
//                     paramName: segment.replace(':', '')
//                 }
//             } else {
//                 return undefined
//             }
//         })
//         .filter(v => !!v);
//     const returnObj: { [key: string]: string } = {};
//     params.forEach(param => {
//         returnObj[param.paramName] = routingState.segments[param.index]
//     })
//     return returnObj;
// }

// export function getSearchParams(routingState: RoutingState): URLSearchParams {
//     return new URL(routingState.url).searchParams;
// }



export function toggleMenuItem(value: string, routes: Partial<SidebarRoutesType>): Partial<SidebarRoutesType> {
  let routesStructure = {...generalRoutesStructure};
  if (routesStructure) {
    const key = value.toLowerCase();
    routesStructure = resetMenuItems();
    if (routesStructure[key as keyof SidebarRoutesType]) {
      // @ts-ignore
      routesStructure[key as keyof SidebarRoutesType].isOpened = !routesStructure[key as keyof SidebarRoutesType].isOpened;
    }
  }

  generalRoutesStructure = routesStructure;
  return routesStructure;
}

export function resetMenuItems(): Partial<SidebarRoutesType> {
  let routesStructure = {...generalRoutesStructure};

  for(const item in routesStructure) {
    if (routesStructure[item as keyof SidebarRoutesType]) {
      // @ts-ignore
      routesStructure[item as keyof SidebarRoutesType].isOpened = false;
    }
    if (routesStructure[item as keyof SidebarRoutesType]?.nestedRoutes?.length) {
      // @ts-ignore
      routesStructure[item as keyof SidebarRoutesType].nestedRoutes = _resetSemiMenu(routesStructure[item as keyof SidebarRoutesType]?.nestedRoutes);
    }
  }

  generalRoutesStructure = routesStructure;
  return routesStructure;
}

function _resetSemiMenu (nestedRoutes?: Partial<NestedRouteType>[]): Partial<NestedRouteType>[] | undefined {
  if (!nestedRoutes) return;
  nestedRoutes.forEach(item => {
    item.isOpened = false;
  });
  return nestedRoutes;
};

export function resetSemiMenu (nestedRoutes?: Partial<NestedRouteType>[]) {
  const _nestedRoutes = _resetSemiMenu(nestedRoutes);
  if (_nestedRoutes?.[0]?.parentRoute && generalRoutesStructure) {
    const parentRoute = _nestedRoutes[0].parentRoute;
    if (generalRoutesStructure[parentRoute as keyof typeof generalRoutesStructure] && generalRoutesStructure[parentRoute as keyof typeof generalRoutesStructure]?.nestedRoutes) {
      // @ts-ignore
      generalRoutesStructure[parentRoute as keyof typeof generalRoutesStructure].nestedRoutes = _nestedRoutes;
    }
  }
  return generalRoutesStructure;
}

export function initBodyClass(property: boolean) {
  property ? document.body.classList.add('menuIsOpened') : document.body.classList.remove('menuIsOpened');
}

export function firstMenuIniting(location: string): Partial<SidebarRoutesType> {
  if (!generalRoutesStructure) {
    setRoutesCollection();
  }

  if (generalRoutesStructure) {
    resetMenuItems();
  }

  generalRoutesStructure = openMenuWithRoutePath(refactorPathsNames(location)) || generalRoutesStructure;
  return generalRoutesStructure;
}

export function openMenuWithRoutePath(path: string[]): Partial<SidebarRoutesType> | undefined {

  if (path.length > 1) {
    return openMenuWithRoute(`/${path[0]}/${path[1]}`, path[0]) || generalRoutesStructure;
  }

  const currentRoute = _location.path;
  // if (!currentRoute?.length || (!currentRoute[0].data?.[1]?.sideBarParentTitle && !currentRoute[0].children?.length)) {
  //   return;
  // }
  //
  // const key = currentRoute[0].children?.length ? currentRoute[0].path : currentRoute[0].data?.[1]?.sideBarParentTitle;
  return openMenuWithRoute(path[0], path[0]);
}

export function openMenuWithRoute(routePath: string, parentPath: string) {
  if (!generalRoutesStructure) {
    return;
  }
  // @ts-ignore
  generalRoutesStructure[parentPath as keyof typeof generalRoutesStructure].isOpened = true;
  let currentMenuItem = generalRoutesStructure[parentPath as keyof typeof generalRoutesStructure]?.nestedRoutes?.find(route => route.path === routePath);
  currentMenuItem = setMenuProperties(currentMenuItem) || currentMenuItem;
  return generalRoutesStructure;
}

export function setMenuProperties(currentMenuItem?: Partial<NestedRouteType>) {
  if (!currentMenuItem || !_location) {
    return;
  }
  let query = _location.query;
  const {tab} = query;

  currentMenuItem.isOpened = true;
  currentMenuItem?.fragments?.forEach((item: {title: string, path: string, isOpened: boolean}) => {
    item.isOpened = item.path === tab;
  });

  return currentMenuItem;
}

export function setLocationPath(value: {path: string, query: Record<string, string>}): void {
  _location = {
    path: value.path,
    query: value.query,
  };
}

