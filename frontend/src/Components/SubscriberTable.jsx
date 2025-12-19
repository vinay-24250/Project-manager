import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/subscribers";

const SubscriberTable = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(API);
        setSubs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscribed Emails</h1>

      {loading && (
        <p className="text-gray-500">Loading subscribers...</p>
      )}

      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}

      {!loading && !error && subs.length === 0 && (
        <p className="text-gray-500">No subscribers found.</p>
      )}

      {!loading && !error && subs.length > 0 && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border-collapse">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Email Address</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-3">{s.id}</td>
                  <td className="p-3">{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriberTable;
