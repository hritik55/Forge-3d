import { createContext, useContext, useState } from "react";

interface InterfaceState {
  viewMode: string;
  transformControl: string;
  editMode: boolean;
  isCanvasEmpty: boolean;
}

interface InterfaceContextProps {
  interfaceState: InterfaceState;
  setInterfaceState: (state: Partial<InterfaceState>) => void;
}

export const InterfaceContext = createContext<
  InterfaceContextProps | undefined
>(undefined);

interface InterfaceProviderProps {
  children: React.ReactNode;
}

export const InterfaceProvider: React.FC<InterfaceProviderProps> = ({
  children,
}) => {
  const [interfaceState, setInterfaceState] = useState<InterfaceState>({
    viewMode: "",
    transformControl: "",
    editMode: false,
    isCanvasEmpty: true,
  });

  const handleSetInterfaceState = (state: Partial<InterfaceState>) => {
    setInterfaceState((prevState) => ({ ...prevState, ...state }));
  };

  return (
    <InterfaceContext.Provider
      value={{ interfaceState, setInterfaceState: handleSetInterfaceState }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export const useInterfaceContext = () => {
  const context = useContext(InterfaceContext);
  if (!context) {
    throw new Error(
      "useInterfaceContext must be used within a InterfaceProvider"
    );
  }
  return context;
};
