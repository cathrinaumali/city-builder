"use client"

import Header from "../components/Header";
import Footer from "../components/Footer";
import House from "../components/House";
import HouseList from "../components/house/HouseList";
import { useHouseContext } from "../context/HouseContext";

import { HouseListProps } from '../utils/types';

export default function Home() {
  const { houses } = useHouseContext();

  return (
    <div className="grid grid-rows-[60px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8 pb-20 sm:p-20">
        <div>
          <HouseList />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {houses.map(({id, name, floors, color}: HouseListProps) => (
            <House key={id} houseName={name} floors={floors} wallColor={color} roofColor="#fff" doorColor="#fff" />
          ))}

        </div>
      </main>
    </div>
  );
}
