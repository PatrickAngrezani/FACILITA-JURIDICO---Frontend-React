import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../CSSModules/ClientsForm.module.css";
import SuccessMessage from "./SuccessMessage";
interface IClientFormData {
  name: string;
  email: string;
  phoneNumber: string;
  x: number;
  y: number;
}

interface IClientFormProps {
  onAddClient?: (formData: IClientFormData) => void;
}

const ClientForm: React.FC<IClientFormProps> = ({ onAddClient }) => {
  const [formData, setFormData] = useState<IClientFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    x: 0,
    y: 0,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "x" || name === "y" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error on register client");
      }

      if (onAddClient) {
        onAddClient(formData);
      }

      setShowSuccessMessage(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        x: 0,
        y: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Customer Registration</h1>
      <form onSubmit={handleSubmit}>
        <ul className={styles.clients_form}>
          <li>
            <label htmlFor="name" className={styles.label_form}>
              Name:
            </label>
            <input
              className={styles.clients_form_personal}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </li>

          <li>
            <label htmlFor="email">E-mail:</label>
            <input
              className={styles.clients_form_personal}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </li>

          <li>
            <label htmlFor="phoneNumber">Phone:</label>
            <input
              className={styles.clients_form_personal}
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </li>

          <li>
            <label htmlFor="x">x:</label>
            <input
              className={styles.clients_form_coordinates}
              type="number"
              id="x"
              name="x"
              value={Number(formData.x)}
              onChange={handleChange}
            />
          </li>

          <li>
            <label htmlFor="y">y:</label>
            <input
              className={styles.clients_form_coordinates}
              type="number"
              id="y"
              name="y"
              value={Number(formData.y)}
              onChange={handleChange}
            />
          </li>
        </ul>

        <button className={styles.register_button} type="submit">
          Register
        </button>
      </form>

      <SuccessMessage
        show={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      />
    </div>
  );
};

export default ClientForm;
