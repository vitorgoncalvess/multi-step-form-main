/* eslint-disable react/prop-types */

import { useState } from "react";
import { createContext } from "react";
import Button from "./Button";
import Etapas from "./Etapas";
import Body from "./Body";

export const FormUI = {
  Button,
  Etapas,
  Body
};

export const FormContext = createContext();

const Form = ({ children, body }) => {
  const [etapa, setEtapa] = useState(0);
  const [form, setForm] = useState({});
  return (
    <FormContext.Provider value={{ etapa, setEtapa, body, form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default Form;
