import React, { useState } from "react";
import axios from "axios";

function ParentUpload() {
  const [formData, setFormData] = useState({
    student_name: "",
    reg_number: "",
    grade: "",
    subject: "",
    description: "",
    files: null,
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, files: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await axios.post(
        "/api/add-portfolio", // Adjust API endpoint as needed
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Upload successful!");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Parent Upload</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Name
          </label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            name="reg_number"
            value={formData.reg_number}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          >
            <option value="">-- Select Grade --</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          >
            <option value="">-- Select Subject --</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload File
          </label>
          <input
            type="file"
            name="file"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ParentUpload;
