import { Outlet } from "react-router-dom"

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-none">
            <Header/>
        </div>
        <div className="grow">
            <Outlet/>
        </div>
        <div className="flex-none">
            <Footer/>
        </div>
    </div>
  )
}

export default Layout;