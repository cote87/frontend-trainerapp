// PasswordInput.jsx
import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

export default function PasswordInput({ value, onChange, placeholder, name }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <FormControl
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        style={{
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "50px",
          border: "none",
          boxShadow: "none",
        }}
      />

      <InputGroup.Text
        onClick={() => setShow(!show)}
        style={{
          cursor: "pointer",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          background: "white",
          border: "none",
          userSelect: "none",
        }}
      >
        <i className={show ? "bi bi-eye-slash" : "bi bi-eye"} />
      </InputGroup.Text>
    </>
  );
}

export const PasswordInputForm = ({ value, onChange, placeholder, name }) => {
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <FormControl
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="form-control"
      />
      <InputGroup.Text
        style={{ cursor: "pointer" }}
        onClick={() => setShow(!show)}
      >
        <i className={show ? "bi bi-eye-slash" : "bi bi-eye"} />
      </InputGroup.Text>
    </InputGroup>
  );
};
