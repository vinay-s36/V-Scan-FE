import React, { useState, useEffect } from "react";
import axios from "axios";

const VulnerabilityScanner = () => {
  const [scanData, setScanData] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const backend_url = "http://localhost:8080";

  const fetchScanData = async () => {
    try {
      const response = await axios.get(`${backend_url}/scans`);
      if (response.status === 200) {
        setScanData(response.data);
      } else {
        console.error("Failed to fetch scan data.");
      }
    } catch (error) {
      console.error("Error fetching scan data:", error);
    }
  };

  useEffect(() => {
    fetchScanData();
  }, []);

  const handleScan = async () => {
    if (!targetUrl) {
      alert("Please enter a URL to scan!");
      return;
    }

    setIsScanning(true);
    setScanData((prevData) => [
      ...prevData,
      { target_url: targetUrl, status: "In Progress"},
    ]);

    try {
      const response = await axios.post(`${backend_url}/scan`, {
        target_url: targetUrl,
      });

      if (response.status === 200) {
        await fetchScanData();
        alert("Scanning completed successfully!");
      } else {
        alert("Failed to scan. Please try again.");
      }
    } catch (error) {
      console.error("Error during scan:", error);
      alert("An error occurred while scanning the website.");
    } finally {
      setIsScanning(false);
      setTargetUrl("");
    }
  };

  return (
    <div className="p-8">
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

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Target</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Vulnerabilities</th>
            <th className="border p-2">Date & Time</th>
            <th className="border p-2">Report</th>
          </tr>
        </thead>
        <tbody>
          {scanData.map((scan) => (
            <tr key={scan.id}>
              <td className="border p-2 text-center">{scan.target_url}</td>
              <td className="border p-2 text-center">{scan.status}</td>
              <td className="border p-2 text-center">{scan.total_vulnerabilities || "-"}</td>
              <td className="border p-2 text-center">{scan.date || "-"}</td>
              <td className="border p-2 text-center">
                {scan.report ? (
                  <a
                    href={`${backend_url}/reports/${scan.report}`}
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
