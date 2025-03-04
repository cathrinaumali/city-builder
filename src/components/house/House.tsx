"use client"

import { useState } from "react";
import { cn } from "@/lib/utils"
import { Slider } from "@/_components/ui/slider"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select"
import { Trash2, Pencil } from "lucide-react"
import { colors } from "../../utils/constant"
import { HouseListProps } from '../../utils/types';
import { useHouseContext } from '@/context/HouseContext';

const House = ({ house }: { house: HouseListProps }) => {
  const [floors, setFloors] = useState(house.floors || 1);
  const [color, setColor] = useState(house.color || colors[0].value);
  const context = useHouseContext();

  if (!context) {
    throw new Error('useHouseContext must be used within a HouseProvider');
  }

  const { houses, setHouses } = context;

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    const updatedHouses = houses.map((h: HouseListProps) =>
      h.id === house.id ? { ...h, color: newColor } : h
    );
    setHouses(updatedHouses);
  };

  const handleFloorsChange = (newFloors: number) => {
    if (newFloors > 20) return;
    setFloors(newFloors);
    const updatedHouses = houses.map((h: HouseListProps) =>
      h.id === house.id ? { ...h, floors: newFloors } : h
    );
    setHouses(updatedHouses);
  };

  const handleDelete = () => {
    const updatedHouses = houses.filter((h: HouseListProps) => h.id !== house.id);
    setHouses(updatedHouses);
  };

  return (
    <div className="flex flex-col gap-2" key={house.id}>
      <div className="flex justify-between items-center">
        <Label htmlFor="floors">{house.name}</Label>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
            <Pencil className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-gray-600"
            onClick={handleDelete}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-2">
          <Label htmlFor="floors">Floors:</Label>
          <Input
            type="number"
            id="floors"
            className="w-16"
            min={1}
            max={20}
            value={floors}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleFloorsChange(value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>Color:</Label>
          <Select value={color} onValueChange={handleColorChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {colors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Slider 
          defaultValue={[house.floors]} 
          value={[floors]} 
          min={1} 
          max={20} 
          step={1} 
          className={cn("w-[60%]")} 
          onValueChange={(value) => handleFloorsChange(value[0])} 
          />
      </div>
    </div>
  )
}

export default House