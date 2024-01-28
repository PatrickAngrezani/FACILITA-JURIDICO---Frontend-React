import styles from "./Clients.module.css";
import { useState, useEffect } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone_number: string;
}

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [openBoxes, setOpenBoxes] = useState<Record<string, boolean>>({});

  const url = "http://localhost:3001/clients";

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setClients(data);
    };

    fetchClients();
  }, []);

  const toggleBox = (id: string) => {
    setOpenBoxes({ ...openBoxes, [id]: !openBoxes[id] });
  };

  return (
    <div>
      <h1>Clients List</h1>
      {clients.map((client, index) => {
        return (
          <div key={index}>
            <div key={index}>
              <p>
                <strong>
                  {index + 1} - {client.name}
                </strong>
                <div key={index} className={styles.container}>
                  <button onClick={() => toggleBox(client.id)} className={styles.button}>
                    Client Info
                  </button>
                </div>
                {openBoxes[client.id] && (
                  <div className={styles.container} key={index}>
                    Id: {client.id} | Name: {client.name} | Email:{" "}
                    {client.email} | PhoneNumber: {client.phone_number}
                  </div>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Clients;
