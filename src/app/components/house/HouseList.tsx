"use client"

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { CustomDialog } from "../ui/CustomDialog"


import House from "./House"

const HouseList = () => {

  const [isOpen, setIsOpen] = useState(false);
  return <>
    <Card>
      <CardHeader className="bg-gray-100">
        <h1 className="text-xl font-medium">Houses List</h1>
      </CardHeader>
      <CardContent>
        <House />
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