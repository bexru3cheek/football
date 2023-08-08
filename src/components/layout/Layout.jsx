import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HeaderP from "../../pages/HeaderP";
import Footer from "../../pages/Footer";

const Layout = () => {
  return (
    <Fragment>
      <header>
        <HeaderP />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default Layout;
