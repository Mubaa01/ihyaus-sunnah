import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main */}
      <div className="lg:ml-[320px]">
        {/* Topbar */}
        <AdminTopbar setIsOpen={setIsOpen} />

        {/* Page Content */}
        <main className="p-6 lg:p-10 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;