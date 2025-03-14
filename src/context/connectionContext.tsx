import { createContext } from "react";

export type ConnectionType = "rest" | "graphql";

interface ConnectionContextType {
  connectionType: ConnectionType;
  setConnectionType: (type: ConnectionType) => void;
}

export const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);
