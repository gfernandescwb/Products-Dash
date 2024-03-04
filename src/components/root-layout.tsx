import { Fragment } from 'react';
import MainHeader from "./main-header";
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function RootLayout() {
    return (
        <Fragment>
            <MainHeader />

            <main>
                <Outlet />
            </main>

            <Toaster />
            
        </Fragment>
    )
}

export default RootLayout;
