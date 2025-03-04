"use client"

import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useHouses, useSaveHouses } from '../hooks/useHouses';
import { HouseListProps } from '../utils/types';

const HouseContext = createContext<{
  houses: HouseListProps[];
  saveHouses: (houses: HouseListProps[]) => void;
  setHouses: (houses: HouseListProps[]) => void;
} | null>(null);

const _houses: HouseListProps[] = [
  {
    id: 1,
    name: "Yellow House",
    floors: 8,
    color: "#FFD700"
  }
];

export const HouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [houses, setHouses] = useState<HouseListProps[]>(_houses);

  // const { data: houses } = useHouses();
  const { mutate: saveHouses } = useSaveHouses();

  return (
    <HouseContext.Provider value={{ houses, setHouses, saveHouses }}>
      {children}
    </HouseContext.Provider>
  );
};

export const useHouseContext = () => useContext(HouseContext);
