import {component$, Slot, useClientEffect$, useOnWindow, $, useStore} from '@builder.io/qwik';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Sidebar from "~/components/sidebar/sidebar";
import { useLocation } from "@builder.io/qwik-city";
import { refactorPathName } from '../routing/routing';

export interface IState { routesList: string[]; showSideBar: boolean};

export default component$((opts: { url: string | undefined }) => {
  const state = useStore<IState>({
    routesList: [],
    showSideBar: false
  });
  const location = useLocation();

  useClientEffect$(() => {
    state.showSideBar = !!refactorPathName(location.pathname);
  })

  useOnWindow('locationchange', $((ev) => {
    state.showSideBar = !!refactorPathName(location.pathname);
  }))

  return (
    <>
      <Header />
      {state.showSideBar && (<Sidebar />)}
      <main>
        <section>
          <Slot />
        </section>
      </main>
      <Footer>
      </Footer>
    </>
  )
});
