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
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { barbers, type Barber } from "@/lib/data"
import { Users, Plus, Edit2, Phone, Mail, Calendar, DollarSign } from "lucide-react"

export function StaffPage() {
  const [staffList, setStaffList] = useState<Barber[]>(barbers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Barber | null>(null)
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
  })

  function toggleStatus(id: string, newStatus: Barber["status"]) {
    setStaffList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    )
  }

  function handleAddStaff() {
    if (newStaff.name && newStaff.role) {
      const newBarber: Barber = {
        id: `b${staffList.length + 1}`,
        name: newStaff.name,
        phone: newStaff.phone,
        email: newStaff.email,
        role: newStaff.role,
        status: "present",
        avatar: newStaff.name.split(" ").map((n) => n[0]).join("").toUpperCase(),
        joinDate: new Date().toISOString().split("T")[0],
        clientsHandled: 0,
        revenueGenerated: 0,
      }
      setStaffList((prev) => [...prev, newBarber])
      setShowAddModal(false)
      setNewStaff({ name: "", phone: "", email: "", role: "" })
    }
  }

  function handleEditStaff() {
    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((b) => (b.id === editingStaff.id ? editingStaff : b))
      )
      setEditingStaff(null)
    }
  }

  const statusColor: Record<string, string> = {
    present: "bg-emerald-100 text-emerald-700",
    absent: "bg-red-100 text-red-700",
    "half-day": "bg-amber-100 text-amber-700",
    "on-leave": "bg-muted text-muted-foreground",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your salon team and their duties
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {staffList.map((staff) => (
          <Card key={staff.id} className="border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                    {staff.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setEditingStaff({ ...staff })}>
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {staff.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {staff.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {staff.joinDate}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{staff.clientsHandled}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">Clients</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">₹{staff.revenueGenerated.toLocaleString()}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">Revenue</p>
                  </div>
                </div>
                <Badge className={`${statusColor[staff.status]} text-xs`}>{staff.status}</Badge>
              </div>

              {/* Availability Toggle */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Availability</span>
                <Select
                  value={staff.status}
                  onValueChange={(v) => toggleStatus(staff.id, v as Barber["status"])}
                >
                  <SelectTrigger className="h-8 w-[120px] border-border bg-background text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="half-day">Half Day</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Staff Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Plus className="h-5 w-5 text-primary" />
              Add New Staff
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Full Name</label>
              <Input
                placeholder="Enter full name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="border-border bg-background"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone</label>
              <Input
                placeholder="Phone number"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                className="border-border bg-background"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <Input
                placeholder="Email address"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                className="border-border bg-background"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Role</label>
              <Select value={newStaff.role} onValueChange={(v) => setNewStaff({ ...newStaff, role: v })}>
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senior Stylist">Senior Stylist</SelectItem>
                  <SelectItem value="Barber">Barber</SelectItem>
                  <SelectItem value="Hair Colorist">Hair Colorist</SelectItem>
                  <SelectItem value="Spa Specialist">Spa Specialist</SelectItem>
                  <SelectItem value="Junior Barber">Junior Barber</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAddStaff}>Add Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={!!editingStaff} onOpenChange={() => setEditingStaff(null)}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Edit2 className="h-5 w-5 text-primary" />
              Edit Staff
            </DialogTitle>
          </DialogHeader>
          {editingStaff && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Full Name</label>
                <Input
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone</label>
                <Input
                  value={editingStaff.phone}
                  onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Role</label>
                <Select
                  value={editingStaff.role}
                  onValueChange={(v) => setEditingStaff({ ...editingStaff, role: v })}
                >
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Senior Stylist">Senior Stylist</SelectItem>
                    <SelectItem value="Barber">Barber</SelectItem>
                    <SelectItem value="Hair Colorist">Hair Colorist</SelectItem>
                    <SelectItem value="Spa Specialist">Spa Specialist</SelectItem>
                    <SelectItem value="Junior Barber">Junior Barber</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1 border-border" onClick={() => setEditingStaff(null)}>Cancel</Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleEditStaff}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
