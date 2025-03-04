"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomDialog({ open, onClose, title }: { open: boolean, onClose: () => void, title: string }) {
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
            <Input id="name" value="" className="col-span-4" />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="username" className="text-right whitespace-nowrap col-span-2">
              Number of Floors
            </Label>
            <Input id="username" value="" className="col-span-4" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create House</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

