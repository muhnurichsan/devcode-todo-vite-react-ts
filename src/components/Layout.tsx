import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div data-cy="layout-todo">
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
