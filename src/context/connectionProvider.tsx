import { useState } from "react";
import { ConnectionContext, ConnectionType } from "./connectionContext";

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectionType, setConnectionType] = useState<ConnectionType>("rest");

  return (
    <ConnectionContext.Provider value={{ connectionType, setConnectionType }}>{children}</ConnectionContext.Provider>
  );
};
