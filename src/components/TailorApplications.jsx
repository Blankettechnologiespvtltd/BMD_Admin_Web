import React, { useEffect, useState } from "react";
import axios from "axios";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const TailorApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://192.168.1.29:8000/api/v1/admin/tailor-applications",
        {
          params: {
            page,
            limit,
            search: search || undefined,
            status: status || undefined,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(response.data.items || []);
      setTotal(response.data.total || 0);
      setHasNext(response.data.has_next || false);
    } catch (error) {
      console.error("Application Fetch Error:", error);

      if (error.response?.status === 401) {
        alert("Session Expired. Please Login Again.");
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, status]);

  const handleSearch = () => {
    setPage(1);
    fetchApplications();
  };
  const handleApprove = async (applicationId) => {
  const confirmed = window.confirm(
    "Are you sure you want to approve this application?"
  );

  if (!confirmed) return;

  try {
    setActionLoading(applicationId);

    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `http://192.168.1.29:8000/api/v1/admin/tailor-applications/${applicationId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message || "Application Approved");

    fetchApplications();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.detail ||
        "Failed to approve application"
    );
  } finally {
    setActionLoading(null);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Applications...
      </div>
    );
  }

  return (
    <div className="flex">
      <Layout />

      <div className="w-full min-h-screen bg-gray-100 p-5">
        {/* Header */}
        <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Tailor Applications
          </h1>

          <div className="flex items-center gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search application..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border outline-none text-black w-72"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
            >
              Search
            </button>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Filter size={18} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-60 z-50">
                  <h3 className="font-semibold mb-3 text-black">
                    Status
                  </h3>

                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    className="w-full border rounded-lg p-2 text-black"
                  >
                    <option value="">All</option>
                    <option value="PENDING">
                      Pending
                    </option>
                    <option value="APPROVED">
                      Approved
                    </option>
                    <option value="REJECTED">
                      Rejected
                    </option>
                  </select>

                  <button
                    onClick={() => {
                      setStatus("");
                      setShowFilter(false);
                    }}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg w-full"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            Total Applications: {total}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-4">Application No.</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">City</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Specialization</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-4">
                      {app.application_number}
                    </td>

                    <td className="p-4">
                      {app.full_name}
                    </td>

                    <td className="p-4">
                      {app.email}
                    </td>

                    <td className="p-4">
                      {app.phone}
                    </td>

                    <td className="p-4">
                      {app.city || "-"}
                    </td>

                    <td className="p-4">
                      {app.experience_years ?? "-"}
                    </td>

                    <td className="p-4">
                      {app.specialization?.join(", ") ||
                        "-"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(
                        app.submitted_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
  <div className="flex flex-col lg:flex-row gap-2 justify-center">
    <button
      onClick={() =>
        navigate(`/application-details/${app.id}`, {
          state: app,
        })
      }
      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm"
    >
      View
    </button>

    {app.status === "PENDING" && (
      <button
        onClick={() => handleApprove(app.id)}
        disabled={actionLoading === app.id}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-3 py-2 rounded-lg text-sm"
      >
        {actionLoading === app.id
          ? "Approving..."
          : "Accept"}
      </button>
    )}
  </div>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-8 text-gray-500"
                  >
                    No Applications Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-700 text-white"
            }`}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page}
          </span>

          <button
            disabled={!hasNext}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-lg ${
              !hasNext
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-teal-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailorApplications;