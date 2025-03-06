"use client"

import { Key, useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card"
import { Button } from "@/_components/ui/button"
import { CustomDialog } from "../ui/CustomDialog"
import HouseDetails from "./HouseDetails"

import { useHouseContext } from "@/context/HouseContext";
import type { House } from "@/utils/types";

const HouseList = () => {

  const [isOpen, setIsOpen] = useState(false);
  const context = useHouseContext();

  if (!context) {
    throw new Error('useHouseContext must be used within a HouseProvider');
  }

  const { houses } = context;
  const contentRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(houses.length);

  useEffect(() => {
    if (contentRef.current && houses.length > prevLengthRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    prevLengthRef.current = houses.length;
  }, [houses]);

  return <>
    <Card className="w-full md:w-[400px] lg:w-[430px] flex flex-col h-full py-0 overflow-hidden gap-0">
      <CardHeader className="bg-gray-100 border-b py-4">
        <h1 className="text-xl font-medium">Houses List</h1>
      </CardHeader>
      <CardContent 
        ref={contentRef} 
        className="flex-1 overflow-auto flex flex-col space-y-4 p-4 scroll-smooth"
      >
        {houses.map((house: House, index: number) => (
          <div
            key={house.id}
            className={`relative p-3 md:p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer
              bg-white shadow-sm border-2 ${index === houses.length - 1 && houses.length > prevLengthRef.current ? 'animate-fadeIn' : ''}
              ${index % 5 === 0 ? 'border-blue-500' : ''}
              ${index % 5 === 1 ? 'border-rose-500' : ''}
              ${index % 5 === 2 ? 'border-violet-500' : ''}
              ${index % 5 === 3 ? 'border-amber-500' : ''}
              ${index % 5 === 4 ? 'border-emerald-500' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <HouseDetails house={house} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t flex items-center justify-center h-16">
        <Button variant="outline" onClick={() => setIsOpen(true)}>Build a new house</Button>
      </CardFooter>
    </Card>
    <CustomDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="Build a new house"
    />
  </>

}

export default HouseList;