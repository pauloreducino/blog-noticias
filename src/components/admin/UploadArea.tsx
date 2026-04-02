"use client";

import { useState } from "react";

export function UploadArea() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  return (
    <div className="bg-surface border border-white/5 rounded-xl p-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          isDragging
            ? "border-cyan bg-cyan/5"
            : "border-white/10 hover:border-cyan/30"
        }`}
      >
        <div className="text-6xl mb-4">📁</div>
        <h3 className="font-headline font-bold text-xl text-text-primary mb-2">
          Arraste arquivos aqui
        </h3>
        <p className="font-body text-text-secondary mb-6">
          ou clique para selecionar arquivos do seu computador
        </p>
        <div className="flex items-center justify-center gap-4">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="px-6 py-3 bg-cyan text-base font-mono font-semibold text-black rounded-lg hover:bg-cyan/80 transition-all cursor-pointer"
          >
            Selecionar Arquivos
          </label>
          <span className="font-body text-sm text-text-muted">
            PNG, JPG, GIF, MP4 até 10MB
          </span>
        </div>
      </div>
    </div>
  );
}
