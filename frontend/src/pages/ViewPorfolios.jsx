import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewPortfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPortfolios();
  }, []);

  async function getPortfolios() {
    try {
      const res = await axios.get("/api/view-portfolios");
      console.log(res.data);
      setPortfolios(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch portfolios.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Student Portfolios
      </h1>

      {loading && <p className="text-gray-500">Loading portfolios...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && portfolios.length === 0 && (
        <p className="text-gray-600">No portfolios uploaded yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.student_name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Reg No:</strong> {item.reg_number}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Grade:</strong> {item.grade}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Subject:</strong> {item.subject}
            </p>
            <p className="text-sm text-gray-600 mb-2 italic">
              {item.description || "No description available"}
            </p>
            <a
              href={`${item.files}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View / Download File
            </a>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700">
                Parent Comment/Feedback:
              </p>
              <p className="text-sm text-gray-600">
                {item.parent_comment || "No comment/feedback provided"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPortfolios;
