import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/contacts";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => setContacts(res.data));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Contact Form Responses</h1>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.mobile}</td>
              <td className="p-3">{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactTable;
