//TODO add header

import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
};