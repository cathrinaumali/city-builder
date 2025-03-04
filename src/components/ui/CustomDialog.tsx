"use client"
import { useState } from "react"
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
import { generateHouseName } from "@/utils/houseNameGenerator"
import { useHouseContext } from "@/context/HouseContext"

export function CustomDialog({ open, onClose, title }: { open: boolean, onClose: () => void, title: string }) {
  const [houseName, setHouseName] = useState(generateHouseName());
  const [floors, setFloors] = useState(1);
  const houseContext = useHouseContext();
  const { houses, setHouses } = houseContext;

  const handleCreateHouse = () => {
     const newHouse = {
      id: houses.length + 1,
      name: houseName,
      floors: floors,
      color: "#FF5733" // Default color
    };
    
    setHouses([...houses, newHouse]);
    onClose();
  };

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
          <Button onClick={handleCreateHouse}>Create House</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

