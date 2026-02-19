"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { appointments, barbers, timeSlots, type Appointment } from "@/lib/data"
import { Calendar, Clock, User, RefreshCw, X } from "lucide-react"

export function SlotsPage() {
  const [selectedDate] = useState("2026-02-13")
  const [selectedSlot, setSelectedSlot] = useState<Appointment | null>(null)
  const [showReassign, setShowReassign] = useState(false)
  const [reassignBarber, setReassignBarber] = useState("")

  const todayAppointments = appointments.filter((a) => a.date === selectedDate)

  function getSlotStatus(barberId: string, time: string) {
    const barber = barbers.find((b) => b.id === barberId)
    if (!barber) return "unknown"
    if (barber.status === "absent" || barber.status === "on-leave") return "absent"
    if (barber.status === "half-day" && parseInt(time) >= 13) return "absent"
    if (time === "13:00" || time === "13:30") return "break"

    const booking = todayAppointments.find(
      (a) => a.barberId === barberId && a.time === time
    )
    if (booking) return "booked"
    return "available"
  }

  function getBooking(barberId: string, time: string) {
    return todayAppointments.find(
      (a) => a.barberId === barberId && a.time === time
    )
  }

  const statusColors: Record<string, string> = {
    available: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
    booked: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200 cursor-pointer",
    absent: "bg-muted text-muted-foreground border-border",
    break: "bg-amber-100 text-amber-700 border-amber-200",
    unknown: "bg-muted text-muted-foreground border-border",
  }

  const statusLabels: Record<string, string> = {
    available: "Free",
    booked: "Booked",
    absent: "N/A",
    break: "Break",
    unknown: "-",
  }

  const availableBarbers = barbers.filter(
    (b) =>
      b.status === "present" &&
      selectedSlot &&
      !todayAppointments.find(
        (a) => a.barberId === b.id && a.time === selectedSlot.time
      ) &&
      b.id !== selectedSlot?.barberId
  )

  function handleReassign() {
    if (reassignBarber && selectedSlot) {
      const newBarber = barbers.find((b) => b.id === reassignBarber)
      if (newBarber) {
        alert(`Appointment reassigned to ${newBarber.name} successfully!`)
      }
      setShowReassign(false)
      setSelectedSlot(null)
      setReassignBarber("")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Appointment Slot Control</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all time slots across barbers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 border-primary/30 px-3 py-1.5 text-primary">
            <Calendar className="h-3.5 w-3.5" />
            {selectedDate}
          </Badge>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground">Legend:</span>
        {[
          { label: "Available", cls: "bg-emerald-100 text-emerald-700" },
          { label: "Booked", cls: "bg-red-100 text-red-700" },
          { label: "Absent/N/A", cls: "bg-muted text-muted-foreground" },
          { label: "Break", cls: "bg-amber-100 text-amber-700" },
        ].map((l) => (
          <Badge key={l.label} className={`${l.cls} text-xs hover:opacity-80`}>{l.label}</Badge>
        ))}
      </div>

      {/* Slot Matrix */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-4 w-4 text-primary" />
            Daily Slot Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="rounded-lg bg-primary/5 px-3 py-2 text-left text-xs font-semibold text-muted-foreground">
                  Time
                </th>
                {barbers.map((b) => (
                  <th key={b.id} className="rounded-lg bg-primary/5 px-3 py-2 text-center text-xs font-semibold text-muted-foreground">
                    <div className="flex flex-col items-center gap-0.5">
                      <span>{b.name.split(" ")[0]}</span>
                      <Badge
                        className={`text-[10px] ${
                          b.status === "present"
                            ? "bg-emerald-100 text-emerald-600"
                            : b.status === "absent"
                            ? "bg-red-100 text-red-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {b.status}
                      </Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td className="rounded-lg bg-secondary/30 px-3 py-1.5 text-xs font-medium text-foreground">
                    {time}
                  </td>
                  {barbers.map((b) => {
                    const status = getSlotStatus(b.id, time)
                    const booking = getBooking(b.id, time)
                    return (
                      <td key={`${b.id}-${time}`} className="px-1 py-0.5">
                        <button
                          onClick={() => {
                            if (booking) setSelectedSlot(booking)
                          }}
                          disabled={status !== "booked"}
                          className={`w-full rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-all ${statusColors[status]}`}
                        >
                          {status === "booked" && booking
                            ? booking.clientName.split(" ")[0]
                            : statusLabels[status]}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedSlot && !showReassign} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <User className="h-5 w-5 text-primary" />
              Booking Details
            </DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-medium text-foreground">{selectedSlot.clientName}</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="font-medium text-foreground">{selectedSlot.service}</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Barber</p>
                  <p className="font-medium text-foreground">{selectedSlot.barberName}</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium text-foreground">{selectedSlot.duration} min</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">{selectedSlot.time}</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Payment</p>
                  <Badge
                    className={
                      selectedSlot.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {selectedSlot.paymentStatus}
                  </Badge>
                </div>
              </div>
              <DialogFooter className="flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-border"
                  onClick={() => setSelectedSlot(null)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Close
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setShowReassign(true)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reassign Barber
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reassign Dialog */}
      <Dialog open={showReassign} onOpenChange={() => { setShowReassign(false); setReassignBarber("") }}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <RefreshCw className="h-5 w-5 text-primary" />
              Reassign Barber
            </DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Reassign <span className="font-medium text-foreground">{selectedSlot.clientName}</span>{"'s "}
                appointment ({selectedSlot.service} at {selectedSlot.time}) to another barber.
              </p>
              <Select value={reassignBarber} onValueChange={setReassignBarber}>
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select available barber" />
                </SelectTrigger>
                <SelectContent>
                  {availableBarbers.length > 0 ? (
                    availableBarbers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name} ({b.role})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No barbers available at this time
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <DialogFooter className="flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-border"
                  onClick={() => { setShowReassign(false); setReassignBarber("") }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleReassign}
                  disabled={!reassignBarber}
                >
                  Confirm Reassign
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
