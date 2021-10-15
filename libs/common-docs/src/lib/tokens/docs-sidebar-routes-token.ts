import { InjectionToken } from "@angular/core";
import { Routes, Route } from "@angular/router";

export type SidebarRoutesType = {
  [key in "documentation" | "components" | "themes"]: SidebarRouteItemValueType;
};

export type SidebarRouteItemValueType = {
  nestedRoutes: NestedRouteType[];
  isOpened: boolean;
  title: string;
  icon: string;
  path?: string;
};

export type NestedRouteType = {
  title: string;
  path?: string;
  isOpened: boolean;
  fragments: {
    title: string;
    path: string;
    isOpened: boolean;
  }[] | [];
};

export const SidebarRoutesStructure: SidebarRoutesType = {
  documentation: {
    nestedRoutes:[],
    isOpened: false,
    title: 'DOCUMENTATION',
    icon: 'assets/images/icons/icon-folder.svg'
  },
  components: {
    nestedRoutes: [],
    isOpened: false,
    title: 'COMPONENTS',
    icon: 'assets/images/icons/icon-components.svg',
    path: 'components'
  },
  themes: {
    nestedRoutes:[],
    isOpened: false,
    title: 'THEMES',
    icon: 'assets/images/icons/icon-theme.svg',
    path: 'themes'
  }
};

export function initNestedRoutes(routes: Routes, sideBarMenu: SidebarRoutesType): SidebarRoutesType {
    routes.forEach(item => {
      if (item.children?.length) {
        item.children.forEach(childRoute => {
          const key = childRoute.data?.[1]?.sideBarParentTitle;
          initSideBarItem(key, childRoute, sideBarMenu);
        });
      }

      if (!item.children?.length) {
        const key = item.data?.[1]?.sideBarParentTitle;
        initSideBarItem(key, item, sideBarMenu);
      }
    });
  return sideBarMenu;
}

function initSideBarItem(key: string, route: Route, sideBarMenu: SidebarRoutesType) {
  if (key && sideBarMenu[key as keyof SidebarRoutesType]) {
    const sideBarItem = sideBarMenu[key as keyof SidebarRoutesType];
    const nestedItem: NestedRouteType = {
      title: route.data?.[0],
      path: route.path,
      isOpened: false,
      fragments: key === 'components' ? initFragments() : []
    };

    if (!SidebarRoutesStructure[key as keyof SidebarRoutesType].nestedRoutes.filter( menuItem => menuItem.title === nestedItem.title).length) {
      sideBarItem.nestedRoutes.push(nestedItem);
    }
  }
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


export const SIDEBAR_ROUTES = new InjectionToken<SidebarRoutesType>('structured route data for sidebar');

