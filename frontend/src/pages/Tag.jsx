import { useState, useEffect } from "react";
import * as emulate from "../services/tag";
import { v4 as uuidv4 } from "uuid";

export default function Tag() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [pingStatus, setPingStatus] = useState("");
  
  // Retrieve or generate UID
  const [uid] = useState(() => {
    const storedUid = sessionStorage.getItem("uid");
    if (storedUid) {
      return storedUid;
    } else {
      const newUid = uuidv4();
      sessionStorage.setItem("uid", newUid);
      return newUid;
    }
  });

  useEffect(() => {
    let interval;

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          sendLocation(latitude, longitude);
        },
        (err) => setError(err.message)
      );
    };

    const sendLocation = async (lat, long) => {
      try {
        const response = await emulate.broadcastSignal(
          { lat, long },
          uid
        );

        if (!(response.status === 200)) throw new Error("Failed to send location");
        setPingStatus(`Pinged at ${new Date().toLocaleTimeString()}`);
      } catch (err) {
        setError(err.message);
      }
    };

    getLocation();
    interval = setInterval(getLocation, 5000);

    return () => clearInterval(interval);
  }, [uid]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">GPS Pinger</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
      <p className="text-green-500 mt-2">{pingStatus}</p>
    </div>
  );
}