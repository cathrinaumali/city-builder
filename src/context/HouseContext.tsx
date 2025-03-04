"use client"

import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useHouses, useSaveHouses } from '../hooks/useHouses';
import { House } from '../utils/types';
import { getHouses, saveHouses as saveHousesToStorage } from '../utils/helpers';

import { Toaster } from 'sonner';

const ToastProvider = () => {
  return <Toaster />;
}
const HouseContext = createContext<{
  houses: House[];
  // saveHouses: (houses: House[]) => void;
  setHouses: (houses: House[]) => void;
} | null>(null);

const defaultHouse: House = {
  id: 1,
  name: "Yellow House",
  floors: 8,
  color: "#FFD700"
};

export const HouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [houses, setHousesState] = useState<House[]>([]);

  // Load houses from localStorage on initial mount
  useEffect(() => {
    const storedHouses = getHouses();

    if (storedHouses.length > 0) {
      setHousesState(storedHouses);
    } else {
      // If no houses in storage, set default house
      setHousesState([defaultHouse]);
      saveHousesToStorage([defaultHouse]);
    }
  }, []);

  const setHouses = (newHouses: House[]) => {
    setHousesState(newHouses);
    saveHousesToStorage(newHouses);
  };

  // const saveHouses = (housesToSave: House[]) => {
  //   setHousesState(housesToSave);
  //   saveHousesToStorage(housesToSave);
  // };

  return (
    <HouseContext.Provider value={{ houses, setHouses }}>
      {children}
      <Toaster />
    </HouseContext.Provider>
  );
};

export const useHouseContext = () => useContext(HouseContext);
