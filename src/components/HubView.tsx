import React from "react";

interface HubViewProps {
  imageUrl: string;
  viewport: { x: number; y: number; zoom: number };
  patientData: { id: string; sampleType: string };
}

export default function HubView({ imageUrl, viewport, patientData }: HubViewProps) {
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* ✅ Patient Info */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white p-2 rounded-md text-xs">
        <p><strong>Patient ID:</strong> {patientData.id}</p>
        <p><strong>Sample Type:</strong> {patientData.sampleType}</p>
      </div>

      {/* ✅ Hub Image */}
      <img src={imageUrl} alt="Hub Image" className="w-full h-full object-contain" />

      {/* ✅ Viewport Pointer */}
      <div className="absolute border-2 border-yellow-500" style={{
        left: `${viewport.x}%`,
        top: `${viewport.y}%`,
        width: `${100 / viewport.zoom}%`,
        height: `${100 / viewport.zoom}%`,
        transform: "translate(-50%, -50%)",
      }} />
    </div>
  );
}
