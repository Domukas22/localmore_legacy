//https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-1.jpg
// {image_URL, position,}

import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

// !!!! somehtign is wrong with the code. Each time I switch panoramas, it gets slower and slower. Its somehow stacking up on eachtoher

const SphereViewer = ({ panoramas }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: panoramas["pan1"].img_URL,
      navbar: ["zoom", "fullscreen"],
      plugins: [MarkersPlugin],
      defaultZoomLvl: 0,
    });

    const panoramaContainer = viewerRef.current;
    panoramaContainer.style.transition = "3s"; // Set the transition for opacity

    const markersPlugin = viewer.getPlugin(MarkersPlugin);
    let activeListener = null; // To track the active event listener

    const setupMarkers = (panoramaId) => {
      const panorama = panoramas[panoramaId];
      markersPlugin.clearMarkers();
      panorama.markers.forEach((marker) => {
        markersPlugin.addMarker({
          id: marker.id,
          image: "https://photo-sphere-viewer-data.netlify.app/assets/pictos/pin-red.png",
          position: marker.position,
          tooltip: "Come here",
          size: { width: 50, height: 50 },
          defaultYaw: 0,
          defaultPitch: 0,
        });
      });

      // Clear existing listener before setting up a new one
      if (activeListener) {
        markersPlugin.removeEventListener("select-marker", activeListener);
      }

      activeListener = (e) => {
        const newPanoramaId = e.marker.id;
        const { img_URL, camera } = panoramas[newPanoramaId];
        markersPlugin.clearMarkers();
        viewer
          .setPanorama(img_URL, {
            speed: 500,
            position: { yaw: camera.yaw, pitch: camera.pitch },
          })
          .then(() => {
            setupMarkers(newPanoramaId); // Re-setup markers for the new panorama
          });
      };

      markersPlugin.addEventListener("select-marker", activeListener);
    };

    setupMarkers("pan1");

    return () => {
      viewer.destroy();
      if (activeListener) {
        markersPlugin.removeEventListener("select-marker", activeListener);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <div ref={viewerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default SphereViewer;
