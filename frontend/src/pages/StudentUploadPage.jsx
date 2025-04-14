import React, { useState } from "react";
import axios from "axios";

function StudentUploadPage() {
  const [formData, setFormData] = useState({
    student_name: "",
    reg_number: "",
    grade: "",
    subject: "",
    description: "",
    files: null,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const subjects = [
    "Mathematics",
    "English",
    "Kiswahili",
    "Science",
    "Social Studies",
    "Art & Craft",
    "CRE/IRE/HRE",
  ];

  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, files: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, value);
    });

    try {
      await axios.post("/api/add-portfolio", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Portfolio uploaded successfully!");
      setFormData({
        student_name: "",
        reg_number: "",
        grade: "",
        subject: "",
        description: "",
        file: null,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to upload. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Student Portfolio Upload
      </h1>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
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
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
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
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Grade</option>
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
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
            required
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
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
            rows="4"
            placeholder="Write a short description of your project..."
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Portfolio File
          </label>
          <input
            type="file"
            name="file"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="mt-1 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default StudentUploadPage;
