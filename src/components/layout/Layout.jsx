import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <header>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">Products</Link>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Layout;
