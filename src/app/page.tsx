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
    <div id="main-container" className="flex flex-col md:flex-row gap-2 m-2 md:m-4 min-h-screen">
      <div id="house-details" className="w-full md:w-[40%] lg:w-[30%] mt-4 md:mt-10 flex justify-center h-[600px] md:h-[800px] overflow-y-auto" >
        <HouseList />
      </div>
      <div className="w-full md:w-[60%] lg:w-[70%] mt-4 md:mt-10 h-[600px] md:h-[800px]">
        <HouseListCanvas houses={houses} />
      </div>
    </div>
  );
}
