import { useEffect } from "react";
import styles from "../CSSModules/SuccessMessage.module.css";

interface ISuccessMessageProps {
  show: boolean;
  onClose: () => void;
}

const SuccessMessage: React.FC<ISuccessMessageProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [show, onClose]);

  return (
    <div
      className={styles.success_message}
      style={{ display: show ? "block" : "none" }}
    >
      Client registered Succesfully!
    </div>
  );
};

export default SuccessMessage;
