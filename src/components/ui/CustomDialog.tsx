"use client"
import { useState, useEffect } from "react"
import { Button } from "@/_components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { useHouseContext } from "@/context/HouseContext"
import { House } from "@/utils/types"
import { toast } from "sonner"

export function CustomDialog({ 
  open, 
  onClose, 
  title, 
  defaultValues 
}: { 
  open: boolean, 
  onClose: () => void, 
  title: string, 
  defaultValues?: House 
}) {
  const [houseName, setHouseName] = useState(defaultValues?.name || "");
  const [floors, setFloors] = useState(defaultValues?.floors || 1);
  const houseContext = useHouseContext();

  // Update local state when defaultValues changes
  useEffect(() => {
    if (defaultValues) {
      setHouseName(defaultValues.name);
      setFloors(defaultValues.floors);
    }
  }, [defaultValues]);

  if (!houseContext) {
    throw new Error('useHouseContext must be used within a HouseProvider');
  }

  const { houses, setHouses } = houseContext;

  const handleSaveHouse = () => {
    if (defaultValues) {
      // Update existing house
      const updatedHouses = houses.map(house => 
        house.id === defaultValues.id 
          ? { ...house, name: houseName, floors: floors, color: defaultValues.color }
          : house
      );
      setHouses(updatedHouses);
      toast.success("House updated successfully!");
    } else {
      // Create new house
      const newHouse = {
        id: houses.length > 0 ? Math.max(...houses.map(h => h.id)) + 1 : 1,
        name: houseName,
        floors: floors,
        color: "#FFC0CB" // Default color
      };
      setHouses([...houses, newHouse]);
      toast.success("House created successfully!");
    }
    
    setHouseName('');
    setFloors(1);
    onClose();
  };

  const isNameEmpty = houseName.trim() === "";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="text-right whitespace-nowrap col-span-2">
              House Name
            </Label>
            <Input 
              id="name" 
              value={houseName} 
              onChange={(e) => setHouseName(e.target.value)}
              className="col-span-4" 
              placeholder="Enter house name"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="floors" className="text-right whitespace-nowrap col-span-2">
              Number of Floors
            </Label>
            <Input 
              id="floors" 
              type="number"
              min={1}
              max={20}
              value={floors} 
              onChange={(e) => setFloors(Number(e.target.value))}
              className="col-span-4" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveHouse} disabled={isNameEmpty}>
            {defaultValues ? "Update" : "Create"} House
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

