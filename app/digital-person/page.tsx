"use client";
import React, { useEffect, useRef, useState } from "react";
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { Avatar } from "@readyplayerme/visage";

const config: AvatarCreatorConfig = {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en',
};

const style = { width: "100%", height: "100vh", border: "none" };

const Page = () => {
  const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/66ebd8552d878c047ff04aa4.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0');
  const [animUrl, setAnimUrl] = useState('/uploads/Talking.fbx');
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
      setAvatarUrl(event.data.url);
  };
  const [mouseOpenV, setMouseOpenV] = useState(0.1);

  const talking = () => {
    setInterval(() => {
      const value = Math.abs(Math.sin(Date.now() * 0.002));
      setMouseOpenV(value)
    }, 200);   
  }

  useEffect(() => {
    // talking()
  }, []);

  const onphone = () => {
    setAnimUrl('http://localhost:3000/uploads/Talking_On_Phone.fbx')
  }
  const ondancing = () => {
    setAnimUrl('http://localhost:3000/uploads/Rumba_Dancing.fbx')
  }

  return (
    <div className="flex min-h-screen">
      {/* <AvatarCreator subdomain="demo" config={config} style={style} onAvatarExported={handleOnAvatarExported} /> */}
      <Avatar 
        animationSrc={animUrl}
        style={style}
        headMovement={true}
        modelSrc={avatarUrl} 
        bloom={{
            intensity: 1,
            kernelSize: 1,
            luminanceSmoothing: 1,
            luminanceThreshold: 1,
            materialIntensity: 1,
            mipmapBlur: true
        }}
        cameraInitialDistance={3.2}
        cameraTarget={1.65}
        emotion={{
          // jawOpen: 0.3,
          // cheekSquintLeft: 0.3,
          // eyeLookInRight: 0.6,
          // eyeLookOutLeft: 0.6,
          // mouthDimpleLeft: 0.5,
          // mouthPressLeft: 0.5,
          // mouthSmileLeft: 0.1,
          // mouthSmileRight: 0.1
        }}
        environment="soft"
        fillLightColor="#6794FF"
        fillLightIntensity={3}
        fov={50}
        keyLightColor="#FFFFFF"
        keyLightIntensity={0.8}
        onLoaded={function noRefCheck(){}}
        onLoading={function noRefCheck(){}}
        scale={1}
        shadows
      />
        <button className="absolute bottom-3 right-12" onClick={onphone}>打电话</button>
        <button className="absolute bottom-3 right-3" onClick={ondancing}>跳舞</button>
    </div>
    
  );
};

export default Page;
