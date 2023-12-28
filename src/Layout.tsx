import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main>
            <Header />
            <div>{children}</div>
            <Footer />
        </main>
    )
}

export default Layout