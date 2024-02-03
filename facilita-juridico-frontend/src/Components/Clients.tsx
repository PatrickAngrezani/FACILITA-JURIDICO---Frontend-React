import { useState, useEffect } from "react";
import styles from "../CSSModules/Clients.module.css";
import ClientsFilter from "./ClientsFilter";
import Points from "./Points";

interface IClient {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  x: number;
  y: number;
}

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [openBoxes, setOpenBoxes] = useState<Record<string, boolean>>({});
  const [showPoints, setShowPoints] = useState(false);
  const [filterText, setFilterText] = useState("");

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

  const handleFilterChange = (text: string) => {
    setFilterText(text);
  };

  const filteredClients = clients.filter((client) => {
    const lowerCaseFilterText = filterText.toLowerCase();

    return (
      client.name.toLowerCase().includes(lowerCaseFilterText) ||
      client.email.toLowerCase().includes(lowerCaseFilterText) ||
      client.phone_number.toLowerCase().includes(lowerCaseFilterText)
    );
  });

  return (
    <body>
      <h1>Clients List</h1>
      <div>
        <ClientsFilter
          filterText={filterText}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.clients_list}>
        {filteredClients.map((client, index) => {
          return (
            <div key={index} style={{ alignItems: "end" }}>
              <strong className={styles.identifierClient}>
                <div style={{ fontWeight: "lighter", paddingLeft: 10 }}>
                  {index + 1}.
                </div>
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
                      <p className={styles.responseClientValue}>{client.id};</p>
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
                          {client.email};
                        </p>
                      </strong>
                    </li>
                    <li className={styles.li} key={client.phone_number}>
                      <strong className={styles.identifierClientProperty}>
                        PhoneNumber:
                      </strong>
                      <p className={styles.responseClientValue}>
                        {client.phone_number};
                      </p>
                    </li>
                    <li className={styles.li} key={client.id}>
                      <strong className={styles.identifierClientProperty}>
                        Coordinates(x, y):
                      </strong>
                      <p className={styles.responseClientValue}>
                        {"(" + client.x + ", " + client.y + ")"}.
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
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
