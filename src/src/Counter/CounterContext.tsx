import { createContext, useContext, useState } from "react";

type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};


type CounterProviderProps = {
  children: JSX.Element
};
const CounterContext = createContext<CounterContextType | undefined>(undefined);

const CounterProvider = ({ children }: CounterProviderProps) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);

  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  return context;
};

export default CounterProvider;
