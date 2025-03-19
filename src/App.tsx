import React, { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import WSIViewer from "./components/WSIViewer";
import HubView from "./components/HubView";
import { ArrowLeft } from "lucide-react";


export default function App() {
  const [viewport, setViewport] = useState({ x: 50, y: 50, zoom: 1 });
  const [imageUrl, setImageUrl] = useState("");
  const [detectionResults, setDetectionResults] = useState([]);
  const [patientData, setPatientData] = useState({ id: "Unknown", sampleType: "N/A" });

  // Fetch JSON Data from Backend
  useEffect(() => {
    fetch("http://localhost:5000/api/detections")
      .then((res) => res.json())
      .then((data) => {
        if (data.wsiImage && data.detectionResults) {
          setImageUrl(data.wsiImage);
          setDetectionResults(data.detectionResults);
          setPatientData({ id: data.patient_id || "Unknown", sampleType: data.sample_type || "N/A" });
        } else {
          console.warn("Invalid API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="p-4 bg-white shadow-md flex items-center">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="ml-4 text-gray-400">{new Date().toDateString()}</div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="w-1/4 bg-white overflow-y-auto h-screen shadow-md p-4">
         
            <LeftPanel />
         
        </div>

        {/* Right Section (WSI Viewer with Hub View inside) */}
        <div className="flex-1 p-4 relative bg-gray-300 rounded-md">
          {imageUrl ? (
            <>
              <WSIViewer
                imageUrl={imageUrl}
                detectionResults={detectionResults}
                viewport={viewport}
                setViewport={setViewport}
              />

              {/* 🟡 Hub View (Now Inside WSI Viewer for Proper Visibility) */}
              <div className="absolute top-4 right-4 w-[220px] h-[150px] bg-gray-800 bg-opacity-80 rounded-md shadow-md p-2 text-white">
                <HubView imageUrl={imageUrl} viewport={viewport} patientData={patientData} />
              </div>

              {/* Report Button */}
              <button
                className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-red-700"
                onClick={() => alert("Report Generated!")}
              >
                Report
              </button>
            </>
          ) : (
            <p className="text-center pt-20">Loading WSI Viewer...</p>
          )}
        </div>
      </div>
    </div>
  );
}
