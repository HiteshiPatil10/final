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
import { offers as initialOffers, services, type Offer } from "@/lib/data"
import { Tag, Plus, Send, Percent, Calendar, Copy } from "lucide-react"

export function OffersPage() {
  const [offersList, setOffersList] = useState<Offer[]>(initialOffers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newOffer, setNewOffer] = useState({
    title: "",
    discount: "",
    validTill: "",
    code: "",
    services: [] as string[],
  })

  function handleAddOffer() {
    if (newOffer.title && newOffer.discount && newOffer.validTill && newOffer.code) {
      const o: Offer = {
        id: `o${offersList.length + 1}`,
        title: newOffer.title,
        discount: parseInt(newOffer.discount),
        validTill: newOffer.validTill,
        applicableServices: newOffer.services,
        status: "active",
        code: newOffer.code.toUpperCase(),
      }
      setOffersList((prev) => [...prev, o])
      setShowAddModal(false)
      setNewOffer({ title: "", discount: "", validTill: "", code: "", services: [] })
    }
  }

  function broadcastOffer(offer: Offer) {
    alert(`WhatsApp broadcast sent for "${offer.title}" (${offer.code}) to all clients!`)
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code)
    alert(`Code "${code}" copied to clipboard!`)
  }

  const statusColor: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    expired: "bg-red-100 text-red-700",
    scheduled: "bg-blue-100 text-blue-700",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Offers & Campaigns</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage promotional offers
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Offer
        </Button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offersList.map((offer) => (
          <Card key={offer.id} className="border-border/60 bg-card shadow-sm transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{offer.title}</h3>
                  <Badge className={`mt-1 ${statusColor[offer.status]} text-xs`}>{offer.status}</Badge>
                </div>
                <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-primary/10">
                  <span className="text-2xl font-bold text-primary">{offer.discount}</span>
                  <span className="text-[10px] font-medium text-primary">% OFF</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Valid till {offer.validTill}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="flex items-center gap-1.5 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-mono font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    {offer.code}
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {offer.applicableServices.map((s) => (
                  <Badge key={s} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                    {s}
                  </Badge>
                ))}
              </div>

              {offer.status === "active" && (
                <Button
                  variant="outline"
                  className="mt-4 w-full border-primary/30 text-primary hover:bg-primary/5"
                  onClick={() => broadcastOffer(offer)}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Broadcast via WhatsApp
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Offer Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Plus className="h-5 w-5 text-primary" />
              Create New Offer
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Offer Title</label>
              <Input
                placeholder="e.g. Summer Special"
                value={newOffer.title}
                onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                className="border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Discount %</label>
                <Input
                  type="number"
                  placeholder="20"
                  value={newOffer.discount}
                  onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Promo Code</label>
                <Input
                  placeholder="SUMMER20"
                  value={newOffer.code}
                  onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })}
                  className="border-border bg-background"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Valid Till</label>
              <Input
                type="date"
                value={newOffer.validTill}
                onChange={(e) => setNewOffer({ ...newOffer, validTill: e.target.value })}
                className="border-border bg-background"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Applicable Service</label>
              <Select onValueChange={(v) => setNewOffer({ ...newOffer, services: [...newOffer.services, v] })}>
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Add service" />
                </SelectTrigger>
                <SelectContent>
                  {services.filter((s) => s.active).map((s) => (
                    <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {newOffer.services.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {newOffer.services.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {s}
                      <button
                        className="ml-1 text-primary hover:text-primary/70"
                        onClick={() => setNewOffer({ ...newOffer, services: newOffer.services.filter((x) => x !== s) })}
                      >
                        x
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAddOffer}>Create Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
