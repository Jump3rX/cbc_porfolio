import React, { useState } from "react";
import axios from "axios";

function ParentPortfolioView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolioData, setPortfolioData] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.get(
        `/api/get-portfolio?query=${searchQuery}`
      );
      if (Array.isArray(response.data)) {
        setPortfolioData(response.data);
      } else {
        setMessage("Invalid portfolio data received.");
        setPortfolioData([]);
      }
    } catch (error) {
      setMessage("Error retrieving portfolio data. Please try again.");
      setPortfolioData([]);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!portfolioData.length) {
      setMessage("No portfolio to comment on.");
      return;
    }

    try {
      const response = await axios.post("/api/add-comment", {
        portfolioId: portfolioData[0]?.id,
        comment: comment,
      });
      setMessage("Comment added successfully!");
      setComment("");
    } catch (error) {
      setMessage("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Parent Portfolio View
      </h2>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search by Student Name or Registration Number
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {portfolioData.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Portfolio of {portfolioData[0].student_name}
          </h3>

          <div className="space-y-4 mb-6">
            <p>
              <strong>Grade:</strong> {portfolioData[0].grade}
            </p>
            <p>
              <strong>Subject:</strong> {portfolioData[0].subject}
            </p>
            <p>
              <strong>Project Description:</strong>{" "}
              {portfolioData[0].description || "No description available"}
            </p>
            <div>
              <h4 className="font-semibold">Uploaded Files</h4>
              <ul>
                {portfolioData[0].files &&
                typeof portfolioData[0].files === "string" ? (
                  <li>
                    <a
                      href={`${portfolioData[0].files}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {portfolioData[0].files.split("/").pop() ||
                        "Uploaded File"}
                    </a>
                  </li>
                ) : (
                  <li>No files available</li>
                )}
              </ul>
            </div>
          </div>

          <form onSubmit={handleAddComment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Add Comment
              </label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      )}

      {message && (
        <p
          className={`text-sm mt-2 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ParentPortfolioView;
