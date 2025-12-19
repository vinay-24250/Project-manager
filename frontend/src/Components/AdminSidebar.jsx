const AdminSidebar = ({ active, setActive }) => {
  const menu = [
    { id: "projects", label: "Projects" },
    { id: "clients", label: "Clients" },
    { id: "contacts", label: "Contact Forms" },
    { id: "subscribers", label: "Subscribers" },
  ];

  return (
    <aside className="w-64 bg-indigo-700 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`cursor-pointer px-4 py-2 rounded transition ${
              active === item.id
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
