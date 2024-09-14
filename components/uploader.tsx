"use client";

import React, { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react"
import Image from 'next/image'

const Uploader = () => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {

  });

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if(uploading) {
      return
    }
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];  
    
      if (file && file.type.startsWith("image/")) {
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
    
        try {
          const response = await fetch("/api/uploadImages", {
            method: "POST",
            body: formData,
          });

          if (response.status === 200) {
            const result = await response.json();
            setPreviewUrl(result.url);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setUploading(false);
        }
      } else {
        alert("请上传有效图片");
      }
    }
  };

  return (
    <div className="w-full md:w-[500px] flex-shrink-0">
    {previewUrl? (
        <div className="">
          {/* <video controls src={previewUrl}></video> */}
          <Image src={`https://${previewUrl}`} width={500} height={500} alt="" />
        </div>
    ) : (
        <div className="relative w-full h-[400px] flex flex-col justify-center items-center text-[#243e63] bg-secondary border-2 border-dashed rounded-lg">
          <UploadCloud size={50} />
          <p>上传文件</p>
          <input 
            type="file" accept="image/*"
            className="absolute top-0 left-0 opacity-0 w-full h-full" 
            onChange={handleFileChange} 
          />
        </div>
    )} 
    </div>
  );
};

export default Uploader;
