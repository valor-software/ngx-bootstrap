import cityPlan from "@qwik-city-plan";
import documentation from "~/routes/documentation";

let generalRoutesStructure: Partial<SidebarRoutesType>;
let _location: {path: string, query: Record<string, string>};

//add 'themes' in key if themes routing returns
export type SidebarRoutesType = {
  [key in "documentation" | "components"]: SidebarRouteItemValueType;
};

export type SidebarRouteItemValueType = {
  nestedRoutes: NestedRouteType[];
  isOpened: boolean;
  title: string;
  icon: string;
  path?: string;
};
export type NestedRouteType = {
  parentRoute: string;
  path?: string;
  isOpened: boolean;
  title: string;
  order: number;
  fragments: {
    title: string;
    path: string;
    isOpened: boolean;
  }[] | [];
};

export const SidebarRoutesStructure: SidebarRoutesType = {
  documentation: {
    nestedRoutes: [],
    isOpened: false,
    title: 'DOCUMENTATION',
    icon: '/images/icons/icon-folder.svg',
    path: '/documentation',
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
  //   path: '/themes'
  // }
};

export const SideBarNestedRoutes: {[key:string]: NestedRouteType} = {
  dropdown: {
    parentRoute: 'components', title: 'Dropdowns',
    path: '/components/dropdown',
    isOpened: false,
    fragments: [],
    order: 1
  },
  schematics: {
    parentRoute: 'documentation', title: 'Schematics',
    path: '/schematics',
    isOpened: false,
    fragments: [],
    order: 3
  },
  discover: {
    parentRoute: 'documentation', title: 'Discover',
    path: '/discover',
    isOpened: false,
    fragments: [],
    order: 2
  },
  documentation: {
    parentRoute: 'documentation', title: 'Documentation',
    path: '/documentation',
    isOpened: false,
    fragments: [],
    order: 1
  },

};

export function refactorPathName(path: string): string {
  return path.split('/').join('').toString()
}

export function refactorPathsNames(path: string): string[] {
  const route = path.split('/').filter(item => item);
  return route;
}


export function initRouteColliction(): SidebarRoutesType {
  for (let link of cityPlan.routes) {
    const routesArr: string[] = link[3].split('/').filter((item: string) => item);
    if (routesArr.length > 1) {
      const nestedRoute = SideBarNestedRoutes[routesArr[1] as keyof typeof SideBarNestedRoutes];
      if (nestedRoute) {
        nestedRoute.fragments = routesArr[0] === 'components' ? initFragments() : [];
        SidebarRoutesStructure[routesArr[0] as keyof SidebarRoutesType].nestedRoutes.push(nestedRoute);
      }
    }

    if (routesArr.length === 1 && SideBarNestedRoutes[routesArr[0]]?.parentRoute) {
      const nestedRoute = SideBarNestedRoutes[routesArr[0]];
      const parentRoute = SideBarNestedRoutes[routesArr[0]].parentRoute;
      SidebarRoutesStructure[parentRoute as keyof typeof SidebarRoutesStructure].nestedRoutes.push(nestedRoute);
    }
  }

   Object.keys(SidebarRoutesStructure).map(item => {
    if (SidebarRoutesStructure[item as keyof typeof SidebarRoutesStructure]?.nestedRoutes.length) {
      SidebarRoutesStructure[item as keyof typeof SidebarRoutesStructure]?.nestedRoutes.sort((a,b) => a.order - b.order)
    }
  })

  generalRoutesStructure = SidebarRoutesStructure;
  return SidebarRoutesStructure;
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
    initRouteColliction();
  }

  if (generalRoutesStructure) {
    resetMenuItems();
  }
  const pathArr = refactorPathsNames(location);
  generalRoutesStructure = openMenuWithRoutePath([...pathArr]) || generalRoutesStructure;
  return generalRoutesStructure;
}

export function openMenuWithRoutePath(pathValue: string[]): Partial<SidebarRoutesType> | undefined {
  if (pathValue.length > 1) {
    return openMenuWithRoute(`/${pathValue[0]}/${pathValue[1]}`, pathValue[0]) || generalRoutesStructure;
  }

  return openMenuWithRoute(pathValue[0], pathValue[0]);
}

export function openMenuWithRoute(routePath: string, parentPath: string) {
  if (!generalRoutesStructure) {
    return;
  }

  if (generalRoutesStructure[parentPath as keyof typeof generalRoutesStructure]) {
    // @ts-ignore
    generalRoutesStructure[parentPath as keyof typeof generalRoutesStructure].isOpened = true;
    let currentMenuItem = generalRoutesStructure[parentPath as keyof typeof generalRoutesStructure]?.nestedRoutes?.find(route => route.path === routePath);
    setMenuProperties(currentMenuItem);
  }

  if (SideBarNestedRoutes[routePath] && SideBarNestedRoutes[routePath].parentRoute) {
    const parentRoute = SideBarNestedRoutes[routePath].parentRoute;
    if (generalRoutesStructure[parentRoute as keyof typeof generalRoutesStructure]) {
      // @ts-ignore
      generalRoutesStructure[parentRoute as keyof typeof generalRoutesStructure].isOpened = true;
      let currentMenuItem = generalRoutesStructure[parentRoute as keyof typeof generalRoutesStructure]?.nestedRoutes?.find(route => {
        const itemPath = route.path?.split('/').join('');
        return itemPath === routePath
      });

      setMenuProperties(currentMenuItem);
    }

  }
  return generalRoutesStructure;
}

export function setMenuProperties(currentMenuItem?: NestedRouteType) {
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

