import { useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import ProjectManager from "../Components/ProjectManager";
import ClientManager from "../Components/ClientManager";
import ContactTable from "../Components/ContactTable";
import SubscriberTable from "../Components/SubscriberTable";

const Admin = () => {
  const [active, setActive] = useState("projects");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar active={active} setActive={setActive} />

      <main className="flex-1 p-8">
        {active === "projects" && <ProjectManager />}
        {active === "clients" && <ClientManager />}
        {active === "contacts" && <ContactTable />}
        {active === "subscribers" && <SubscriberTable />}
      </main>
    </div>
  );
};

export default Admin;
