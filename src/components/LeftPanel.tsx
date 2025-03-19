import React, { useState, useEffect } from "react";

interface CellData {
  name: string;
  count: number;
  percentage: string;
}

const DataTable: React.FC<{ title: string; data: CellData[] }> = ({ title, data }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="bg-green-50 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-green-100">
            <th className="text-left p-2">Type</th>
            <th className="text-right p-2">Count</th>
            <th className="text-right p-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t border-green-200">
              <td className="p-2">{row.name}</td>
              <td className="text-right p-2">{row.count}</td>
              <td className="text-right p-2">{row.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function LeftPanel() {
  const [detectionResults, setDetectionResults] = useState<any[]>([]);

  // ✅ Fetch Data from Backend
  useEffect(() => {
    fetch("http://localhost:5000/api/detections")
      .then((res) => res.json())
      .then((data) => setDetectionResults(data.detectionResults || []))
      .catch((error) => console.error("Failed to load detection results:", error));
  }, []);

  // ✅ Aggregate data by counting occurrences
  const countCells = (type: string) => {
    return detectionResults.filter((item: any) => item[4] === type).length;
  };

  const totalCells = detectionResults.length || 1; // Avoid division by zero

  const RBCData: CellData[] = [
    {
      name: "RBC",
      count: countCells("Circular_RBC"),
      percentage: `${((countCells("Circular_RBC") / totalCells) * 100).toFixed(2)}%`,
    },
  ];

  const WBCData: CellData[] = [
    {
      name: "WBC",
      count: countCells("WBC"),
      percentage: `${((countCells("WBC") / totalCells) * 100).toFixed(2)}%`,
    },
  ];

  const plateletCount = countCells("Platelet");

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-screen overflow-y-auto">
      <div className="space-y-6">
        <DataTable title="RBC Count" data={RBCData} />
        <DataTable title="WBC Count" data={WBCData} />

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Platelets</h3>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span>Count</span>
              <span>{plateletCount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Percentage</span>
              <span>{((plateletCount / totalCells) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
