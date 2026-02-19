"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { clients, type Client } from "@/lib/data"
import { Search, UserCircle, Phone, Mail, Heart, Star, Calendar, DollarSign, X } from "lucide-react"

export function ClientsPage() {
  const [search, setSearch] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const filtered = clients.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search))
      return false
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Clients CRM</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage client relationships and visit history
        </p>
      </div>

      {/* Search */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clients by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-background pl-9"
            />
          </div>
          <Badge variant="outline" className="border-primary/30 px-3 py-1.5 text-primary">
            {filtered.length} clients
          </Badge>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <UserCircle className="h-4 w-4 text-primary" />
            Client Directory
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Visits</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Spend</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Visit</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fav. Barber</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-border/40 transition-colors hover:bg-secondary/30">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {client.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{client.phone}</td>
                  <td className="px-3 py-3">
                    <Badge className="bg-primary/10 text-primary">{client.totalVisits}</Badge>
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-foreground">₹{client.totalSpend.toLocaleString()}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{client.lastVisit}</td>
                  <td className="px-3 py-3 text-sm text-foreground">{client.favoriteBarber}</td>
                  <td className="px-3 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-xs"
                      onClick={() => setSelectedClient(client)}
                    >
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Client Profile Drawer */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <UserCircle className="h-5 w-5 text-primary" />
              Client Profile
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="flex flex-col gap-4">
              {/* Profile Header */}
              <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
                  {selectedClient.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-secondary/50 p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{selectedClient.totalVisits}</p>
                  <p className="text-xs text-muted-foreground">Visits</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">₹{selectedClient.totalSpend.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Spend</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3 text-center">
                  <p className="text-sm font-bold text-foreground">{selectedClient.favoriteBarber.split(" ")[0]}</p>
                  <p className="text-xs text-muted-foreground">Fav. Barber</p>
                </div>
              </div>

              {/* Preferred Services */}
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Preferred Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.preferredServices.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-primary/10 text-primary">{s}</Badge>
                  ))}
                </div>
              </div>

              {/* Visit History */}
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Recent Visits</h4>
                <div className="flex flex-col gap-2">
                  {selectedClient.visits.map((visit, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{visit.service}</p>
                        <p className="text-xs text-muted-foreground">with {visit.barber} on {visit.date}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">₹{visit.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
