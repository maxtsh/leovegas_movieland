import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

function Layout() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
