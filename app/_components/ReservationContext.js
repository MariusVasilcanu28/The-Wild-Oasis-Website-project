"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useResevation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("Context was used outside of its provider");
  }
  return context;
}

export { ReservationProvider, useResevation };
