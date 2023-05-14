import "../css/Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
