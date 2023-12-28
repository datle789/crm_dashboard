import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import React from "react";
import NavSide from "./Pages/homePage/NavSide";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main>
            <Header />
            <div className="flex">
                <div className="basis-[14%] min-h-screen fix border">
                    <NavSide />
                </div>
                <div className="basis-[86%] flex-auto">{children}</div>
            </div>
            <Footer />
        </main>
    )
}

export default Layout