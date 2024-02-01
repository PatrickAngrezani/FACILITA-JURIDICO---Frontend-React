import React from "react";
import styles from "../CSSModules/ClientsFilter.module.css";

interface IClientsFilterProps {
  filterText: string;
  onFilterChange: (text: string) => void;
}

const ClientsFilter: React.FC<IClientsFilterProps> = ({
  filterText,
  onFilterChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className={styles.input_client}>
      <label htmlFor="filter">Look for Clients: </label>
      <input
        type="text"
        id="filter"
        value={filterText}
        onChange={handleChange}
        className={styles.input_text}
      />
    </div>
  );
};

export default ClientsFilter;
