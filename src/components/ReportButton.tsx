import React from "react";
import { FileText } from "lucide-react";

export default function ReportButton() {
  return (
    <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
      <FileText className="w-5 h-5" />
      Download Report
    </button>
  );
}
