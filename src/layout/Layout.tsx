import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import "./Layout.styles.scss";

function Layout() {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
