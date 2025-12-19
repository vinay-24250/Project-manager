import { useEffect, useState } from "react";
import axios from "axios";

const PROJECT_API = "http://localhost:8080/api/projects";
const CLIENT_API = "http://localhost:8080/api/clients";
const CONTACT_API = "http://localhost:8080/api/contacts";
const SUBSCRIBER_API = "http://localhost:8080/api/subscribers";

const DUMMY_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        const [projectRes, clientRes] = await Promise.all([
          axios.get(PROJECT_API, { signal: controller.signal }),
          axios.get(CLIENT_API, { signal: controller.signal }),
        ]);

        setProjects(projectRes.data || []);
        setClients(clientRes.data || []);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => controller.abort();
  }, []);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async () => {
    try {
      await axios.post(CONTACT_API, contact);
      alert("Contact details submitted successfully!");
      setContact({ name: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit contact form");
    }
  };

  const handleSubscribe = async () => {
    if (!newsletterEmail) return;

    try {
      await axios.post(SUBSCRIBER_API, { email: newsletterEmail });
      alert("Subscribed successfully!");
      setNewsletterEmail("");
    } catch (err) {
      console.error(err);
      alert("Subscription failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      {/* ================= HERO ================= */}
      <header className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto pl-6 py-24 md:grid-cols-2 gap-10 items-center  flex justify-center place-items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Consultation, Design & Marketing
            </h1>
            <p className="text-indigo-100 text-lg">
              We help teams build digital products with clarity, performance,
              and modern technology.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white w-80 rounded-xl shadow-xl p-6 text-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Get a Free Consultation
            </h3>

            <div className="space-y-3">
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Full Name"
                name="name"
                value={contact.name}
                onChange={handleContactChange}
              />

              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Email Address"
                name="email"
                value={contact.email}
                onChange={handleContactChange}
              />
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Mobile Number"
                name="mobile"
                value={contact.mobile}
                onChange={handleContactChange}
              />
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="City"
                name="city"
                value={contact.city}
                onChange={handleContactChange}
              />

              <button
                onClick={handleContactSubmit}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md font-semibold transition"
              >
                Get Quick Quote
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= OUR PROJECTS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading projects...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={project.imageUrl || DUMMY_IMAGE}
                    alt={project.projectName}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {project.projectName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.description}
                    </p>

                    <button className="text-indigo-600 font-medium text-sm hover:underline">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= HAPPY CLIENTS ================= */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Happy Clients
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl shadow p-6 text-center"
              >
                <img
                  src={client.imageUrl || DUMMY_IMAGE}
                  alt={client.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-4"
                />
                <p className="text-gray-600 text-sm mb-3">
                  “{client.description}”
                </p>
                <h4 className="font-semibold">{client.name}</h4>
                <span className="text-xs text-gray-500">
                  {client.designation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="bg-indigo-700 py-16 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-indigo-200 mb-6">
            Get updates on new projects and insights straight to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto ">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-shadow-white w-full border-2 border-amber-50"
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-md font-semibold transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-gray-400 py-6 text-center text-sm">
        © {new Date().getFullYear()} ProjectHub. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
