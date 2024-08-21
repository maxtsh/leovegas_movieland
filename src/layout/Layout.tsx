import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import "./Layout.styles.scss";

function Layout() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
