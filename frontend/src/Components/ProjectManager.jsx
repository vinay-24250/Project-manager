import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/projects";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    projectName: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    const res = await axios.get(API);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const submit = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("projectName", form.projectName);
    formData.append("description", form.description);
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProjects();
      setForm({ projectName: "", description: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Project Management</h1>

      <div className="bg-white p-6 rounded shadow mb-8 space-y-4">
        <input
          className="w-full border px-3 py-2"
          placeholder="Project Name"
          value={form.projectName}
          onChange={(e) =>
            setForm({ ...form, projectName: e.target.value })
          }
        />

        <textarea
          className="w-full border px-3 py-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border px-3 py-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Project"}
        </button>
      </div>

      <ul className="space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="bg-white p-4 rounded shadow flex gap-4 items-center"
          >
            <img
              src={p.imageUrl}
              alt={p.projectName}
              className="w-20 h-16 object-cover rounded"
            />
            <div>
              <strong>{p.projectName}</strong>
              <p className="text-sm text-gray-600">{p.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectManager;
