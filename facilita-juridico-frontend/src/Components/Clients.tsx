import styles from "./Clients.module.css";
import { useState, useEffect } from "react";
import Points from "./Points";

interface Client {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  x: number;
  y: number;
}

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [openBoxes, setOpenBoxes] = useState<Record<string, boolean>>({});
  const [showPoints, setShowPoints] = useState(false);

  const url = "http://localhost:3001/clients";

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setClients(data);
    };

    fetchClients();
  }, []);

  const toggleBoxClients = (id: string) => {
    setOpenBoxes({ ...openBoxes, [id]: !openBoxes[id] });
  };

  return (
    <body
      style={{
        fontFamily: "monospace",
      }}
    >
      <h1>Clients List</h1>
      <div style={{ display: "flex" }}>
        <div className={styles.clients_list}>
          {clients.map((client, index) => {
            return (
              <div key={index} style={{ alignItems: "end" }}>
                <strong className={styles.identifierClient}>
                  <div style={{ fontWeight: "lighter" }}>{index + 1}.</div>
                  {client.name}
                  <button
                    onClick={() => toggleBoxClients(client.id)}
                    className={styles.infoButton}
                  >
                    Info
                  </button>
                </strong>
                {openBoxes[client.id] && (
                  <div className={styles.container} key={index}>
                    <ul className={styles.info_values}>
                      <li className={styles.li} key={client.id}>
                        <strong className={styles.identifierClientProperty}>
                          Id:
                        </strong>
                        <p className={styles.responseClientValue}>
                          {client.id};
                        </p>
                      </li>
                      <li className={styles.li} key={client.name}>
                        <strong className={styles.identifierClientProperty}>
                          Name:
                        </strong>
                        <p className={styles.responseClientValue}>
                          {client.name};
                        </p>
                      </li>
                      <li className={styles.li} key={client.email}>
                        <strong className={styles.identifierClientProperty}>
                          Email:
                          <p className={styles.responseClientValue}>
                            {client.email} ;
                          </p>
                        </strong>
                      </li>
                      <li className={styles.li} key={client.phone_number}>
                        <strong className={styles.identifierClientProperty}>
                          PhoneNumber:
                        </strong>
                        <p className={styles.responseClientValue}>
                          {client.phone_number} ;
                        </p>
                      </li>
                      <li className={styles.li} key={client.id}>
                        <strong className={styles.identifierClientProperty}>
                          Coordinates(x, y):
                        </strong>
                        <p className={styles.responseClientValue}>
                          {"(" + client.x + ", " + client.y + ")"}
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        className={styles.pointsButton}
        onClick={() => {
          setShowPoints(!showPoints);
        }}
      >
        Points
      </button>
      {showPoints && <Points />}
    </body>
  );
};

export default Clients;
