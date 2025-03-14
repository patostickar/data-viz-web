import { createContext, useState } from "react";

export type Protocol = "rest" | "graphql";

interface ProtocolContextType {
  connectionType: Protocol;
  setConnectionType: (type: Protocol) => void;
}

export const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

export const ProtocolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectionType, setConnectionType] = useState<Protocol>("rest");

  return <ProtocolContext.Provider value={{ connectionType, setConnectionType }}>{children}</ProtocolContext.Provider>;
};
