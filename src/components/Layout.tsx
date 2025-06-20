import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import CustomCursor from './CustomCursor';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-dark text-gray-200 overflow-x-hidden">
            {/* <CustomCursor /> */}
            <Header />
            <main className="relative">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout; 