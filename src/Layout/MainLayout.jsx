import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-288px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
