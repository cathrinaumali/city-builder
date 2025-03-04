"use client"

import Header from "../components/Header";
import Footer from "../components/Footer";
import HouseList from "../components/house/HouseList";
import HouseListCanvas from "../components/house/HouseListCanvas";
import { useHouseContext } from "../context/HouseContext";

import { HouseListProps } from '../utils/types';

export default function Home() {
  const context = useHouseContext();

  if (!context) {
    throw new Error('useHouseContext must be used within a HouseProvider');
  }

  const { houses } = context;

  return (
    <div id="main-container" className="flex flex-col sm:flex-row gap-4 m-4 min-h-screen">
      <div id="house-details" className="w-full sm:w-[30%] mt-10 flex justify-center h-[800px]" >
        <HouseList />
      </div>
      <div className="w-full sm:w-[70%] mt-10 h-[800px]">
        <HouseListCanvas houses={houses} />
      </div>
    </div>
  );
}
