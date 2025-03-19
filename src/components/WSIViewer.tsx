import React, { useEffect, useRef, useState } from "react";

interface WSIViewerProps {
  imageUrl: string;
  detectionResults: [number, number, number, number, string][]; // [x1, y1, x2, y2, label]
}

export default function WSIViewer({ imageUrl, detectionResults }: WSIViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 512, height: 512 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // **Handle Zooming (Only Image & Boxes, Not the Container)**
  const handleZoom = (event: React.WheelEvent) => {
    event.preventDefault();
    const scaleFactor = 1.1;
    let newZoom = event.deltaY > 0 ? zoom / scaleFactor : zoom * scaleFactor;
    newZoom = Math.max(1, Math.min(newZoom, 4)); // Limit zoom between 1x to 4x

    setZoom(newZoom);
  };

  // **Handle Dragging for Panning**
  const handleMouseDown = (event: React.MouseEvent) => {
    if (zoom === 1) return; // No panning if not zoomed
    setIsDragging(true);
    setStartPos({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - startPos.x,
      y: event.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // **Adjust Image & Canvas Size**
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    function updateSize() {
      setImageSize({ width: img.clientWidth, height: img.clientHeight });
    }

    img.onload = updateSize;
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // **Draw Bounding Boxes**
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detectionResults.forEach(([x1, y1, x2, y2, label]) => {
      const scaleFactor = imageSize.width / 512;
      const scaledX1 = (x1 * scaleFactor * zoom) + position.x;
      const scaledY1 = (y1 * scaleFactor * zoom) + position.y;
      const scaledX2 = (x2 * scaleFactor * zoom) + position.x;
      const scaledY2 = (y2 * scaleFactor * zoom) + position.y;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(scaledX1, scaledY1, scaledX2 - scaledX1, scaledY2 - scaledY1);

      ctx.fillStyle = "yellow";
      ctx.font = "14px Arial";
      ctx.fillText(label, scaledX1, scaledY1 - 5);
    });
  }, [detectionResults, imageSize, zoom, position]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-900 overflow-hidden flex items-center justify-center"
      onWheel={handleZoom}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoomed & Pannable Image */}
      <div
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
        }}
      >
        <img ref={imgRef} src={imageUrl} alt="WSI Image" className="max-w-full max-h-full" />

        {/* Overlay Canvas for Bounding Boxes */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />
      </div>
    </div>
  );
}
