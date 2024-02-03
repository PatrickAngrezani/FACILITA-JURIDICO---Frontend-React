import { useEffect, useState } from "react";
import styles from "../CSSModules/Points.module.css";

interface IVisit {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface IResult {
  totalDistance: string;
  orderOfVisits: IVisit[];
}

const Points = (): JSX.Element => {
  const [result, setResult] = useState<IResult>({
    totalDistance: "",
    orderOfVisits: [],
  });

  const url = "http://localhost:3001/clients/ordinate-points";

  useEffect(() => {
    const fetchPoints = async () => {
      const response = await fetch(url);

      const data = await response.json();
      setResult(data);
    };

    fetchPoints();
  }, []);

  const introductionPoints = `Below is a comprehensive list about clients coordinates and the optimal visitation order.`;
  const advice =
    "*The starting and ending points correspond to our corporate headquarters, enhancing the range and precision of the calculations.";

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
