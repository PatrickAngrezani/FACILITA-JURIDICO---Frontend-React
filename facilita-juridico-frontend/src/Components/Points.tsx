import { useEffect, useState } from "react";
import styles from "./Points.module.css";

interface Visit {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Result {
  totalDistance: string;
  orderOfVisits: Visit[];
}

const Points = (): JSX.Element => {
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

  const introductionPoints = `Below is a comprehensive list about clients coordinates and the optimal visitation order.`;
  const advice =
    "*The initial and terminal points correspond to our corporate headquarters, augmenting the comprehensiveness and precision of the  calculations.";

  return (
    <body>
      <h2 className={styles.introductionPoints}>{introductionPoints}</h2>
      <p className={styles.advice}>{advice}</p>

      <div className={styles.orderPoints}>
        {result?.orderOfVisits.map((point, index) => {
          return (
            <ul key={index}>
              <li>
                <strong>
                  {index + 1}. {point.name} - ({point.id})
                </strong>
                <p>
                  x: {point.x} | y:{point.y}
                </p>
              </li>
            </ul>
          );
        })}
      </div>
    </body>
  );
};

export default Points;
