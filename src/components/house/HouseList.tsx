"use client"

import { Key, useState } from "react";
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
import House from "./House"

import { useHouseContext } from "@/context/HouseContext";

const HouseList = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { houses } = useHouseContext();
  return <>
    <Card>
      <CardHeader className="bg-gray-100">
        <h1 className="text-xl font-medium">Houses List</h1>
      </CardHeader>
      <CardContent>
        {houses.map((house: { id: Key | null | undefined; }) => (
          <House key={house.id} house={house} />
        ))}
      </CardContent>
      <CardFooter>
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