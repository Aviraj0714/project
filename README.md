# Whole Slide Image (WSI) Viewer with Detection Results

## 📌 Project Overview
This project is a **Whole Slide Image (WSI) Viewer** that allows users to visualize, zoom, and pan through a large histopathology slide image. It includes **bounding box detection** for various cell types (e.g., RBCs, WBCs, Platelets, Abnormal Cells) using preprocessed **detection results**. The viewer also integrates a **Hub View**, which provides an overview of the WSI with a highlighted viewport region.

## 🎯 Features
✅ **Whole Slide Image (WSI) Viewer** - Displays the main histopathology slide.
✅ **Bounding Box Detection** - Draws bounding boxes around detected cell types.
✅ **Zoom & Pan** - Users can zoom and move the image for detailed inspection.
✅ **Hub View** - Provides an overview of the WSI with a viewport indicator.
✅ **Patient Data** - Displays Patient ID and Sample Type from JSON data.
✅ **Report Button** - Positioned at the bottom-right to generate a detection report.
✅ **Advanced UI Enhancements** - Smooth animations, optimized layouts, and high performance.

## 📂 Folder Structure
```
├── src
│   ├── components
│   │   ├── LeftPanel.tsx       # Displays detection result summary
│   │   ├── WSIViewer.tsx       # Main image viewer with zoom & pan
│   │   ├── HubView.tsx         # Miniature hub view of the WSI
│   │   ├── ErrorBoundary.tsx   # Error handling component
│   ├── App.tsx                 # Main layout and component structure
│   ├── index.tsx               # Entry point of the app
│── public
│   ├── wsi.png                 # Sample whole slide image
│── package.json
│── README.md                   # Project documentation
```

## 🛠 Setup Instructions
### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start Development Server
```sh
npm run dev
```

### 3️⃣ API Endpoint for Detection Data
Ensure your backend is running and serving the detection results via:
```sh
http://localhost:5000/api/detections
```

## 🖥 Usage
1️⃣ **View the WSI Image** with detected bounding boxes.
2️⃣ **Zoom and Pan** the image for better visibility.
3️⃣ **Use Hub View** to locate your zoomed viewport on the full image.
4️⃣ **See Patient Information** displayed in the Hub View.
5️⃣ **Click 'Report'** to generate a downloadable report of detection results.


## 📜 License
This project is licensed under the **MIT License**.

---
🔥 **Built with React, Tailwind CSS, and Node.js**

