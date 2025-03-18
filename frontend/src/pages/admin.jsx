import { useEffect, useState } from "react";
import { fetchPositionOfFoundTags } from "../services/admin";

const Admin = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetchPositionOfFoundTags();
        setPoints(response.data.relativePositions);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
    const interval = setInterval(fetchPoints, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "400px", height: "400px", border: "1px solid gray" }}>
      {points.map((point, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: "16px",
            height: "16px",
            backgroundColor: "red",
            borderRadius: "50%",
            left: `${point.xPercent}%`,
            bottom: `${point.yPercent}%`,
            transform: "translate(-50%, 50%)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Admin;