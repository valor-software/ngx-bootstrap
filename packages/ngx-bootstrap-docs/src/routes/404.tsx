import { component$ } from '@builder.io/qwik';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export interface IState { routesList: string[]; showSideBar: boolean};

export default component$((opts: { url: string | undefined }) => {
    return (
        <>
            <Header />
            <main>
                <section>
                    Custom 404 works
                </section>
            </main>
            <Footer>
            </Footer>
        </>
    )
});
