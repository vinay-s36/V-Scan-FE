import React, { useState } from "react";
import axios from "axios";

const VulnerabilityScanner = () => {
  const [scanData, setScanData] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const backend_url = "http://localhost:8080";

  const handleScan = async () => {
    if (!targetUrl) {
      alert("Please enter a URL to scan!");
      return;
    }

    setIsScanning(true);
    setScanData((prevData) => [
      ...prevData,
      { target: targetUrl, status: 'In Progress', vulnerabilities: '-', report: '-' },
    ]);

    try {
      // Make the request to the backend
      const response = await axios.post(`${backend_url}/scan`, {
        target_url: targetUrl,
        "Content-Type": "application/json",
      });

      if (response.status === 200) {
        const { report, total_vulnerabilities } = response.data;

        // Update scan data with the new result
        const newScan = {
          id: Date.now(),
          target: targetUrl,
          status: "Completed",
          vulnerabilities: total_vulnerabilities,
          reportUrl: `${backend_url}/reports/${report}`, // URL to download the report
        };

        setScanData((prevData) =>
          prevData.map((scan) =>
            scan.target === targetUrl
              ? { ...scan, ...newScan }
              : scan
          )
        );
        alert("Scanning completed successfully!");
      } else {
        alert("Failed to scan. Please try again.");
      }
    } catch (error) {
      console.error("Error during scan:", error);
      alert("An error occurred while scanning the website.");
      setScanData((prevData) =>
        prevData.map((scan) =>
          scan.target === targetUrl
            ? { ...scan, status: "Failed" }
            : scan
        )
      );
    } finally {
      setIsScanning(false);
      setTargetUrl(""); // Reset input field
    }
  };

  return (
    <div className="p-8">
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter URL to scan"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`px-4 py-2 rounded-lg text-white ${
            isScanning ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isScanning ? "Scanning..." : "Scan"}
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Target</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Vulnerabilities</th>
            <th className="border p-2">Report</th>
          </tr>
        </thead>
        <tbody>
          {scanData.map((scan) => (
            <tr key={scan.id}>
              <td className="border p-2 text-center">{scan.target}</td>
              <td className="border p-2 text-center">{scan.status}</td>
              <td className="border p-2 text-center">{scan.vulnerabilities}</td>
              <td className="border p-2 text-center">
                {scan.status === "Completed" ? (
                  <a
                    href={scan.reportUrl}
                    download
                    className="text-blue-500 underline"
                  >
                    Download
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VulnerabilityScanner;
