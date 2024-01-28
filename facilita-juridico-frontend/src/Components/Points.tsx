import { useEffect, useState } from "react";
import styles from "./Points.module.css";

interface Visit {
  x: number;
  y: number;
}

interface Result {
  totalDistance: string;
  orderOfVisits: Visit[];
}

function Points() {
  const [result, setResult] = useState<Result>({
    totalDistance: "",
    orderOfVisits: [],
  });

  const url = "http://localhost:3001/clients/ordinate-points";

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await fetch(url);

      const data = await response.json();
      console.log({ data });
      setResult(data);
    };

    fetchPoints();
  }, []);

  return (
    <div>
      {result?.orderOfVisits.map((point, index) => {
        return (
          <div key={index}>
            <p>
              <strong>{index + 1}:</strong>
            </p>
            <p className={styles.container}>
              x: {point.x} | y: {point.y}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Points;
