import { useContext } from "react";
import { ProtocolContext } from "../context/protocolContext.tsx";

export const useProtocol = () => {
  const context = useContext(ProtocolContext);
  if (!context) {
    throw new Error("useProtocol must be used within a ConnectionProvider");
  }
  return context;
};
