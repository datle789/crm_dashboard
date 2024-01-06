import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import React, { useEffect, useState } from "react";
import NavSide from "./Pages/homePage/NavSide";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./Pages/type/GetAccessToken";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const navigate = useNavigate()
    const [check, setCheck] = useState(false)


    useEffect(() => {
        const AccessToken = getAccessToken('access_token');


        if (!AccessToken) {
            navigate('/login')
        } else {
            setCheck(true)
        }
    }, []);

    return (
        <main>
            <Header />
            {check ? <div className="flex">
                <NavSide />
                <div className="basis-[86%] flex-auto">{children}</div>
            </div> : ''}
            <Footer />
        </main>
    )
}

export default Layout