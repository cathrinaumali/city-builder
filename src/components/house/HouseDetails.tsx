"use client"

import { useState, useEffect } from "react"
import { toast } from 'sonner';
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
import { CustomDialog } from "../ui/CustomDialog"
import { Trash2, Pencil } from "lucide-react"
import { colors } from "../../utils/constant"
import { HouseListProps } from '../../utils/types';
import { useHouseContext } from '@/context/HouseContext';

const HouseDetails = ({ house }: { house: HouseListProps }) => {
  const [floors, setFloors] = useState(house.floors || 1);
  const [color, setColor] = useState(house.color || colors[0].value);
  const [isOpen, setIsOpen] = useState(false);

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

    toast.success("Deleted!", {
      description: "House deleted successfully",
    });
  };


  useEffect(() => {
    if (house.floors) {
      setFloors(house.floors);
    }
  }, [house.floors]);

  return (
    <div className="flex flex-col gap-2" key={house.id}>
      <div className="flex justify-between items-center">
        <Label htmlFor="floors" className="truncate max-w-[200px]">{house.name}</Label>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 h-8 w-8" onClick={() => setIsOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 h-8 w-8"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <div className="flex items-center gap-1">
          <Label htmlFor="floors" className="text-sm whitespace-nowrap">Floors:</Label>
          <Input
            type="number"
            id="floors"
            className="w-12"
            min={1}
            max={10}
            value={floors}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleFloorsChange(value);
            }}
          />
        </div>
        <div className="flex items-center gap-1">
          <Label className="text-sm whitespace-nowrap">Color:</Label>
          <Select value={color} onValueChange={handleColorChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {colors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-sm truncate">{color.name}</span>
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
          max={10}
          step={1}
          className={cn("w-full")}
          onValueChange={(value) => handleFloorsChange(value[0])}
        />
      </div>
      {isOpen && <CustomDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit house"
        defaultValues={house}
      />}
    </div>
  )
}

export default HouseDetails