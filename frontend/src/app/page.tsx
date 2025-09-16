"use client";

import { useState } from "react";
import axios from "axios";

export default function VideoUploader() {
  const [progress, setProgress] = useState(0);

  const uploadVideo = async (file: File) => {
    const sigRes = await fetch("http://localhost:5000/api/video/url");
    const sigJson = await sigRes.json();
    const { timestamp, signature, apiKey, cloudName } = sigJson.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "videos");
    formData.append("resource_type", "video");

    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          const percentage = Math.round(
            (event.loaded / (event.total || 1)) * 100
          );
          setProgress(percentage);
        },
      }
    );

    console.log("Uploaded URL:", uploadRes.data.secure_url);
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => e.target.files && uploadVideo(e.target.files[0])}
      />
      <div>Upload Progress: {progress}%</div>
    </div>
  );
}
