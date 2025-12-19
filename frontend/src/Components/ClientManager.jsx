import { useEffect, useState } from "react";
import axios from "axios";

const GET_API = "http://localhost:8080/api/clients";
const POST_API = "http://localhost:8080/api/clients/admin";

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    clientName: "",
    designation: "",
    description: "",
    image: null,
  });

  const fetchClients = async () => {
    try {
      const res = await axios.get(GET_API);
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async () => {
    if (!form.clientName || !form.image) {
      alert("Client name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("clientName", form.clientName);
    formData.append("designation", form.designation);
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      setLoading(true);

      await axios.post(POST_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        clientName: "",
        designation: "",
        description: "",
        image: null,
      });

      fetchClients();
    } catch (err) {
      console.error("Failed to add client", err);
      alert("Error adding client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Client Management</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <input
          name="clientName"
          placeholder="Client Name"
          className="w-full border px-3 py-2 rounded"
          value={form.clientName}
          onChange={handleChange}
        />

        <input
          name="designation"
          placeholder="Designation"
          className="w-full border px-3 py-2 rounded"
          value={form.designation}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Client"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clients.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={c.imageUrl}
              alt={c.clientName}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{c.clientName}</h3>
            <p className="text-sm text-gray-500">{c.designation}</p>
            <p className="text-sm text-gray-600 mt-2">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManager;
