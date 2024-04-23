//https://photo-sphere-viewer-data.netlify.app/assets/tour/key-biscayne-1.jpg
// {image_URL, position,}

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

// !!!! somehtign is wrong with the code. Each time I switch panoramas, it gets slower and slower. Its somehow stacking up on eachtoher

const Panorama = ({ panoramas }) => {
  const viewerRef = useRef(null);

  console.log(panoramas);

  useEffect(() => {
    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: Object.values(panoramas)[0].img_URL,
      navbar: ["zoom", "fullscreen"],
      plugins: [MarkersPlugin],
      defaultZoomLvl: 0,
      defaultYaw: Object.values(panoramas)[0].camera?.yaw || 0,
      defaultPitch: Object.values(panoramas)[0].camera?.pitch || 0,
    });

    const panoramaContainer = viewerRef.current;
    panoramaContainer.style.transition = "3s"; // Set the transition for opacity

    const markersPlugin = viewer.getPlugin(MarkersPlugin);
    let activeListener = null; // To track the active event listener

    const setupMarkers = (panoramaId) => {
      const panorama = panoramas[panoramaId]; // Access the specific panorama object
      markersPlugin.clearMarkers();
      panorama.markers.forEach((marker) => {
        markersPlugin.addMarker({
          id: marker.id,
          image: "https://photo-sphere-viewer-data.netlify.app/assets/pictos/pin-red.png",
          position: marker.position,
          tooltip: marker.id,
          size: { width: 50, height: 50 },
        });
      });

      // Clear existing listener before setting up a new one
      if (activeListener) {
        markersPlugin.removeEventListener("select-marker", activeListener);
      }

      activeListener = (e) => {
        const newPanoramaId = e.marker.id;
        const newPanorama = panoramas[newPanoramaId]; // Access the new panorama object
        markersPlugin.clearMarkers();
        viewer
          .setPanorama(newPanorama.img_URL, {
            speed: 500,
            position: { yaw: newPanorama.camera?.yaw || 0, pitch: newPanorama.camera?.pitch || 0 },
          })
          .then(() => {
            setupMarkers(newPanoramaId); // Re-setup markers for the new panorama
          });
      };

      markersPlugin.addEventListener("select-marker", activeListener);
    };

    setupMarkers(Object.keys(panoramas)[0]);

    return () => {
      viewer.destroy();
      if (activeListener) {
        markersPlugin.removeEventListener("select-marker", activeListener);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <div ref={viewerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Panorama;
