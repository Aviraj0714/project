const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve images & JSON files

app.get("/api/detections", (req, res) => {
    fs.readFile(path.join(__dirname, "public/output.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading JSON file" });
        }

        try {
            let jsonData = JSON.parse(
                data
                    .replace(/'/g, '"') // Convert single quotes to double
                    .replace(/\bNone\b/g, "null") // Replace Python None with null
            );

            // ✅ Fix `inference_results` stored as a string
            if (typeof jsonData.inference_results === "string") {
                jsonData.inference_results = JSON.parse(jsonData.inference_results);
            }

            // ✅ Extract detection results properly
            const detectionResults = jsonData.inference_results?.output?.detection_results || [];

            // ✅ Serve WSI image correctly
            const wsiImagePath = `http://localhost:5000/${jsonData.filename}`;

            res.json({
                wsiImage: wsiImagePath,
                detectionResults,
                sampleType: jsonData.sample_type,
                date: jsonData.date,
                filename: jsonData.filename
            });

        } catch (parseError) {
            console.error("❌ JSON Parsing Error:", parseError);
            return res.status(500).json({ error: "JSON Parsing Error" });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
