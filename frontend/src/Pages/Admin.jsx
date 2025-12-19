import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import ProjectManager from "../components/ProjectManager";
import ClientManager from "../components/ClientManager";
import ContactTable from "../components/ContactTable";
import SubscriberTable from "../components/SubscriberTable";

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
