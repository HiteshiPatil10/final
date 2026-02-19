"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { appointments, barbers, services } from "@/lib/data"
import { Search, Filter, Plus, CalendarDays, Phone, X } from "lucide-react"

export function AppointmentsPage() {
  const [search, setSearch] = useState("")
  const [filterBarber, setFilterBarber] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterService, setFilterService] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAppt, setNewAppt] = useState({
    clientName: "",
    clientPhone: "",
    service: "",
    barberId: "",
    date: "2026-02-13",
    time: "10:00",
  })

  const filtered = appointments.filter((a) => {
    if (search && !a.clientName.toLowerCase().includes(search.toLowerCase())) return false
    if (filterBarber !== "all" && a.barberId !== filterBarber) return false
    if (filterStatus !== "all" && a.status !== filterStatus) return false
    if (filterService !== "all" && a.service !== filterService) return false
    return true
  })

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      completed: "bg-emerald-100 text-emerald-700",
      upcoming: "bg-blue-100 text-blue-700",
      "in-progress": "bg-amber-100 text-amber-700",
      cancelled: "bg-red-100 text-red-700",
    }
    return map[status] || ""
  }

  const paymentBadge = (status: string) => {
    const map: Record<string, string> = {
      paid: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      partial: "bg-orange-100 text-orange-700",
    }
    return map[status] || ""
  }

  function handleAddAppointment() {
    if (newAppt.clientName && newAppt.service && newAppt.barberId) {
      alert(
        `Appointment booked for ${newAppt.clientName} with ${barbers.find((b) => b.id === newAppt.barberId)?.name} on ${newAppt.date} at ${newAppt.time}`
      )
      setShowAddModal(false)
      setNewAppt({ clientName: "", clientPhone: "", service: "", barberId: "", date: "2026-02-13", time: "10:00" })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all salon appointments
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by client name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-background pl-9"
            />
          </div>
          <Select value={filterBarber} onValueChange={setFilterBarber}>
            <SelectTrigger className="w-[160px] border-border bg-background">
              <Filter className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Barber" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Barbers</SelectItem>
              {barbers.map((b) => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] border-border bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="w-[170px] border-border bg-background">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {[...new Set(appointments.map((a) => a.service))].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              All Appointments
            </span>
            <span className="text-sm font-normal text-muted-foreground">{filtered.length} records</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Barber</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date & Time</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id} className="border-b border-border/40 transition-colors hover:bg-secondary/30">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {apt.clientName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-foreground">{apt.clientName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{apt.clientPhone}</td>
                  <td className="px-3 py-3 text-sm text-foreground">{apt.service}</td>
                  <td className="px-3 py-3 text-sm text-foreground">{apt.barberName}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{apt.date} {apt.time}</td>
                  <td className="px-3 py-3">
                    <Badge className={`${statusBadge(apt.status)} text-xs`}>{apt.status}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={`${paymentBadge(apt.paymentStatus)} text-xs`}>{apt.paymentStatus}</Badge>
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-medium text-foreground">
                    ₹{apt.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <CalendarDays className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-2 text-sm text-muted-foreground">No appointments found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Appointment Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Plus className="h-5 w-5 text-primary" />
              New Appointment
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Client Name</label>
                <Input
                  placeholder="Enter name"
                  value={newAppt.clientName}
                  onChange={(e) => setNewAppt({ ...newAppt, clientName: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone</label>
                <Input
                  placeholder="Phone number"
                  value={newAppt.clientPhone}
                  onChange={(e) => setNewAppt({ ...newAppt, clientPhone: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Service</label>
                <Select value={newAppt.service} onValueChange={(v) => setNewAppt({ ...newAppt, service: v })}>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.filter((s) => s.active).map((s) => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name} (₹{s.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Barber</label>
                <Select value={newAppt.barberId} onValueChange={(v) => setNewAppt({ ...newAppt, barberId: v })}>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue placeholder="Select barber" />
                  </SelectTrigger>
                  <SelectContent>
                    {barbers.filter((b) => b.status === "present").map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Date</label>
                <Input
                  type="date"
                  value={newAppt.date}
                  onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Time</label>
                <Input
                  type="time"
                  value={newAppt.time}
                  onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddAppointment}
            >
              Book Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
