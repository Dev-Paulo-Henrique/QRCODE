import { useEffect, useState } from "react";

function useMediaDeviceInfos(): MediaDeviceInfo[] {
  const [videos, setVideos] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    (async () => {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      setVideos(mediaDevices);
    })();
  }, []);
  return videos;
}

export function useVideoDeviceInfos(): MediaDeviceInfo[] {
  return useMediaDeviceInfos()?.filter((info) => info.kind === "videoinput");
}
