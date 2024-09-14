"use client";

import React, { useEffect, useRef, useState } from "react";

const Uploader = () => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {

  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
        handleUpload(file);
    } else {
      alert("请上传一个有效的视频文件");
    }
  };

  const handleUpload = async (file:any) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.status === 200) {
        setPreviewUrl(result.url);       
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col">
    {previewUrl? (
        <div>
            <video controls src={previewUrl}></video>
        </div>
    ) : (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
    )} 
    </div>
  );
};

export default Uploader;
