import SideBar from "./component/SideBar";
import { Outlet } from "react-router-dom";

const Dashbord = () => {
  return (
    <div className="min-h-screen bg-sky-50">
      <SideBar />

      {/* Content */}
      <main className="p-4 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashbord;