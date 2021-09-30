import { InjectionToken } from "@angular/core";
import { Routes } from "@angular/router";

export type SidebarRoutesType = {
  [key in "documentation" | "components" | "resources" | "themes"]: {
    nestedRoutes: NestedRoute[];
    isOpened: boolean;
    title: string;
    icon: string;
  };
};

export type NestedRoute = {
  title: string;
  path?: string;
  isOpened: boolean;
  fragments: {
    title: string;
    path: string;
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
    icon: 'assets/images/icons/icon-components.svg'
  },
  resources: {
    nestedRoutes:[],
    isOpened: false,
    title: 'RESOURCES',
    icon: 'assets/images/icons/icon-resources.svg'
  },
  themes: {
    nestedRoutes:[],
    isOpened: false,
    title: 'THEMES',
    icon: 'assets/images/icons/icon-theme.svg'
  }
};

export function updateNestedRoutes(routes: Routes, sideBarMenu: SidebarRoutesType): SidebarRoutesType {
    routes.forEach(item => {
      const key = item.data?.[1]?.sideBarParentTitle;
      if (key && sideBarMenu[key as keyof SidebarRoutesType]) {
        const sideBarItem = sideBarMenu[key as keyof SidebarRoutesType];
        const nestedItem: NestedRoute = {
          title: item.data?.[0],
          path: item.path,
          isOpened: false,
          fragments: key === 'components' ? generateFragments() : []
        };

        if (!SidebarRoutesStructure[key as keyof SidebarRoutesType].nestedRoutes.filter( menuItem => menuItem.title === nestedItem.title).length) {
          sideBarItem.nestedRoutes.push(nestedItem);
        }
      }
    });

  return sideBarMenu;
}

function generateFragments(): {title: string, path: string}[] {
  return [
    {
      title: 'Overview',
      path: 'overview'
    },
    {
      title: 'API',
      path: 'api'
    },
    {
      title: 'Examples',
      path: 'example'
    }
  ];
}


export const SIDEBAR_ROUTES = new InjectionToken<SidebarRoutesType>('structured route data for sidebar');

