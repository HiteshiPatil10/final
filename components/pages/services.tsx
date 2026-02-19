"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
import { services as initialServices, type Service } from "@/lib/data"
import { Scissors, Plus, Edit2, Trash2, Clock, DollarSign } from "lucide-react"

export function ServicesPage() {
  const [servicesList, setServicesList] = useState<Service[]>(initialServices)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
  })

  function handleAddService() {
    if (newService.name && newService.price && newService.duration && newService.category) {
      const s: Service = {
        id: `s${servicesList.length + 1}`,
        name: newService.name,
        price: parseInt(newService.price),
        duration: parseInt(newService.duration),
        category: newService.category,
        active: true,
      }
      setServicesList((prev) => [...prev, s])
      setShowAddModal(false)
      setNewService({ name: "", price: "", duration: "", category: "" })
    }
  }

  function handleEditService() {
    if (editingService) {
      setServicesList((prev) =>
        prev.map((s) => (s.id === editingService.id ? editingService : s))
      )
      setEditingService(null)
    }
  }

  function toggleActive(id: string) {
    setServicesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    )
  }

  function deleteService(id: string) {
    setServicesList((prev) => prev.filter((s) => s.id !== id))
  }

  const categories = [...new Set(servicesList.map((s) => s.category))]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Services Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit, and manage salon services
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((cat) => {
          const catServices = servicesList.filter((s) => s.category === cat)
          const activeCount = catServices.filter((s) => s.active).length
          return (
            <Card key={cat} className="border-border/60 bg-card shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{cat}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{catServices.length}</p>
                <p className="text-xs text-muted-foreground">{activeCount} active</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {servicesList.map((service) => (
          <Card
            key={service.id}
            className={`border-border/60 shadow-sm transition-all hover:shadow-md ${
              !service.active ? "opacity-60" : "bg-card"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                  <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary text-xs">
                    {service.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setEditingService({ ...service })}>
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteService(service.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">₹{service.price}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{service.duration} min</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {service.active ? "Active" : "Inactive"}
                </span>
                <Switch checked={service.active} onCheckedChange={() => toggleActive(service.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Service Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Plus className="h-5 w-5 text-primary" />
              Add New Service
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Service Name</label>
              <Input
                placeholder="e.g. Premium Haircut"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Price (₹)</label>
                <Input
                  type="number"
                  placeholder="500"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Duration (min)</label>
                <Input
                  type="number"
                  placeholder="30"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</label>
              <Select value={newService.category} onValueChange={(v) => setNewService({ ...newService, category: v })}>
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hair">Hair</SelectItem>
                  <SelectItem value="Grooming">Grooming</SelectItem>
                  <SelectItem value="Spa">Spa</SelectItem>
                  <SelectItem value="Combo">Combo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAddService}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Edit2 className="h-5 w-5 text-primary" />
              Edit Service
            </DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Service Name</label>
                <Input
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Price (₹)</label>
                  <Input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: parseInt(e.target.value) || 0 })}
                    className="border-border bg-background"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Duration (min)</label>
                  <Input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: parseInt(e.target.value) || 0 })}
                    className="border-border bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</label>
                <Select
                  value={editingService.category}
                  onValueChange={(v) => setEditingService({ ...editingService, category: v })}
                >
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hair">Hair</SelectItem>
                    <SelectItem value="Grooming">Grooming</SelectItem>
                    <SelectItem value="Spa">Spa</SelectItem>
                    <SelectItem value="Combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1 border-border" onClick={() => setEditingService(null)}>Cancel</Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleEditService}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
