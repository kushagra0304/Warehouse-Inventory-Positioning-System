import { useState, useEffect, useRef } from "react";
import * as emulate from "../services/scanner";
import { startScanner } from "../services/scanner"; // Import startScanner

const SCAN_INTERVAL = 3000;
const STORAGE_KEY = "scannerActive";

const Scanner = () => {
  const [scanning, setScanning] = useState(
    localStorage.getItem(STORAGE_KEY) === "true"
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      startScanningProcess(); // Call the updated function
    }
    return stopScanner;
  }, []);

  const senseNearByTags = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Call startScanner when getting location
            await startScanner({ lat: latitude, long: longitude });

            const tags = (await emulate.senseNearByTags({ lat: latitude, long: longitude })).data;
            const tagIds = tags.map(tag => tag.id);

            console.log(tagIds);
            await emulate.markTagsAsFound(tagIds);

            console.log("Location sent:", latitude, longitude);
          } catch (error) {
            console.error("Error sending location:", error);
          }
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const startScanningProcess = () => {
    if (!intervalRef.current) {
      senseNearByTags();
      intervalRef.current = setInterval(senseNearByTags, SCAN_INTERVAL);
      localStorage.setItem(STORAGE_KEY, "true");
      setScanning(true);
    }
  };

  const stopScanner = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      localStorage.setItem(STORAGE_KEY, "false");
      setScanning(false);
    }
  };

  return (
    <div>
      <h2>Scanning for nearby tags</h2>
      <button onClick={startScanningProcess} disabled={scanning}>
        Start Scan
      </button>
      <button style={{ marginLeft: '1rem' }} onClick={stopScanner} disabled={!scanning}>
        Stop Scan
      </button>
    </div>
  );
};

export default Scanner;
