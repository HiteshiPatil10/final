"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Store, Bell, Clock, Globe, Shield, Save } from "lucide-react"

export function SettingsPage() {
  const [salonName, setSalonName] = useState("Tressora Premium Salon")
  const [salonPhone, setSalonPhone] = useState("+91 98765 00000")
  const [salonEmail, setSalonEmail] = useState("hello@tressora.com")
  const [salonAddress, setSalonAddress] = useState("123 Main Street, Mumbai, Maharashtra")
  const [openTime, setOpenTime] = useState("09:00")
  const [closeTime, setCloseTime] = useState("19:00")
  const [slotDuration, setSlotDuration] = useState("30")
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [autoConfirm, setAutoConfirm] = useState(true)
  const [sendReceipts, setSendReceipts] = useState(true)
  const [allowOnlineBooking, setAllowOnlineBooking] = useState(true)

  function handleSave() {
    alert("Settings saved successfully!")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure your salon preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Salon Info */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Store className="h-4 w-4 text-primary" />
              Salon Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Salon Name</label>
              <Input value={salonName} onChange={(e) => setSalonName(e.target.value)} className="border-border bg-background" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone</label>
              <Input value={salonPhone} onChange={(e) => setSalonPhone(e.target.value)} className="border-border bg-background" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <Input value={salonEmail} onChange={(e) => setSalonEmail(e.target.value)} className="border-border bg-background" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Address</label>
              <Input value={salonAddress} onChange={(e) => setSalonAddress(e.target.value)} className="border-border bg-background" />
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Clock className="h-4 w-4 text-primary" />
              Working Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Opening Time</label>
                <Input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} className="border-border bg-background" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Closing Time</label>
                <Input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} className="border-border bg-background" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Slot Duration (minutes)</label>
              <Input type="number" value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} className="border-border bg-background" />
            </div>
            <Separator className="my-1" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Online Booking</p>
                <p className="text-xs text-muted-foreground">Allow clients to book online</p>
              </div>
              <Switch checked={allowOnlineBooking} onCheckedChange={setAllowOnlineBooking} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Bell className="h-4 w-4 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">WhatsApp Notifications</p>
                <p className="text-xs text-muted-foreground">Send automated WhatsApp messages</p>
              </div>
              <Switch checked={whatsappEnabled} onCheckedChange={setWhatsappEnabled} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto Confirm Bookings</p>
                <p className="text-xs text-muted-foreground">Automatically confirm new bookings</p>
              </div>
              <Switch checked={autoConfirm} onCheckedChange={setAutoConfirm} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Send Receipts</p>
                <p className="text-xs text-muted-foreground">Automatically send bill receipts</p>
              </div>
              <Switch checked={sendReceipts} onCheckedChange={setSendReceipts} />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Shield className="h-4 w-4 text-primary" />
              Data & Export
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="outline" className="w-full border-border justify-start" onClick={() => alert("Exporting all appointment data as CSV...")}>
              Export Appointments (CSV)
            </Button>
            <Button variant="outline" className="w-full border-border justify-start" onClick={() => alert("Exporting client data as CSV...")}>
              Export Clients (CSV)
            </Button>
            <Button variant="outline" className="w-full border-border justify-start" onClick={() => alert("Exporting revenue report as CSV...")}>
              Export Revenue Report (CSV)
            </Button>
            <Button variant="outline" className="w-full border-border justify-start" onClick={() => alert("Exporting staff data as CSV...")}>
              Export Staff Data (CSV)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
