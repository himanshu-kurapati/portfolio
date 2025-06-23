import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
// import CustomCursor from './CustomCursor';

const Layout: React.FC = () => {
    const location = useLocation();
    const isProjectDetailsPage = location.pathname.startsWith('/project/');
    const isProjectsPage = location.pathname === '/projects';

    return (
        <div className="min-h-screen bg-dark text-gray-200 overflow-x-hidden">
            {/* <CustomCursor /> */}
            {!isProjectDetailsPage && !isProjectsPage && <Header />}
            <main className="relative">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout; 