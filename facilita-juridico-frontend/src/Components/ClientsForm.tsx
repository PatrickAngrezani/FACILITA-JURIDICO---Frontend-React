import { ChangeEvent, FormEvent, useState } from "react";

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
    x: 12,
    y: 19,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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
      const json = await response.json();
      console.log({ json });

      if (!response.ok) {
        throw new Error("Erro ao adicionar cliente");
      }

      if (onAddClient) {
        onAddClient(formData);
      }

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        x: Number(""),
        y: Number(""),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Customer Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNumber">Phone:</label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="x">x:</label>
        <input
          type="number"
          id="x"
          name="x"
          value={Number(formData.x)}
          onChange={handleChange}
        />

        <label htmlFor="y">y:</label>
        <input
          type="number"
          id="y"
          name="y"
          value={Number(formData.y)}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ClientForm;
