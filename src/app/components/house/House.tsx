"use client"

import { useState } from "react";
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Pencil } from "lucide-react"
import { colors } from "./constant"

const House = () => {
  const [floors, setFloors] = useState(1);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="floors">House 1</Label>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
            <Pencil className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
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
              if (value > 20) return;
              setFloors(value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>Color:</Label>
          <Select>
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
        <Slider defaultValue={[1]} value={[floors]} max={20} step={1} className={cn("w-[60%]")} onValueChange={(value) => setFloors(value[0])} />
      </div>
    </div>
  )
}

export default House