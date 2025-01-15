"use client";

import { useState } from "react";

export default function GuestForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    behalf: "",
    numberOfGuests: "",
    event1: false,
    event2: false,
    event3: false,
  });

  const [message, setMessage] = useState("");
  const [qrCode, setQRCode] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setQRCode("");
    try {
      const response = await fetch("/api/registerGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Guest registered successfully!");
        setQRCode(`${data.qrCode}`);
        setFormData({
          name: "",
          phone: "",
          behalf: "",
          numberOfGuests: "",
          event1: false,
          event2: false,
          event3: false,
        });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register a Guest</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="behalf"
          placeholder="On Behalf Of (Bride/Groom)"
          value={formData.behalf}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="numberOfGuests"
          placeholder="Number of Guests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="event1"
              checked={formData.event1}
              onChange={handleChange}
            />
            Event 1
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="event2"
              checked={formData.event2}
              onChange={handleChange}
            />
            Event 2
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="event3"
              checked={formData.event3}
              onChange={handleChange}
            />
            Event 3
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {qrCode && (
        <a
          href={qrCode}
          download="invitation.png"
          className="text-blue-500 underline mt-4"
        >
          Download Invitation QR Code
        </a>
      )}
    </div>
  );
}
