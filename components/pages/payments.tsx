"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { invoices } from "@/lib/data"
import { CreditCard, Download, DollarSign, FileText, Banknote, Smartphone } from "lucide-react"

export function PaymentsPage() {
  const [filterMethod, setFilterMethod] = useState("all")

  const filtered = invoices.filter((inv) => {
    if (filterMethod !== "all" && inv.paymentMethod !== filterMethod) return false
    return true
  })

  const totalAmount = filtered.reduce((s, i) => s + i.amount, 0)
  const cashAmount = invoices.filter((i) => i.paymentMethod === "cash").reduce((s, i) => s + i.amount, 0)
  const cardAmount = invoices.filter((i) => i.paymentMethod === "card").reduce((s, i) => s + i.amount, 0)
  const upiAmount = invoices.filter((i) => i.paymentMethod === "upi").reduce((s, i) => s + i.amount, 0)

  const methodIcon: Record<string, React.ReactNode> = {
    cash: <Banknote className="h-4 w-4" />,
    card: <CreditCard className="h-4 w-4" />,
    upi: <Smartphone className="h-4 w-4" />,
    online: <DollarSign className="h-4 w-4" />,
  }

  const methodColor: Record<string, string> = {
    cash: "bg-emerald-100 text-emerald-700",
    card: "bg-blue-100 text-blue-700",
    upi: "bg-amber-100 text-amber-700",
    online: "bg-primary/10 text-primary",
  }

  function downloadInvoice(invoice: typeof invoices[0]) {
    alert(`Downloading PDF for ${invoice.invoiceId} - ${invoice.clientName}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Payments & Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View invoices and payment summaries
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: `₹${totalAmount.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
          { label: "Cash", value: `₹${cashAmount.toLocaleString()}`, icon: Banknote, color: "text-emerald-600" },
          { label: "Card", value: `₹${cardAmount.toLocaleString()}`, icon: CreditCard, color: "text-blue-600" },
          { label: "UPI", value: `₹${upiAmount.toLocaleString()}`, icon: Smartphone, color: "text-amber-600" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-border/60 bg-card shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filter */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-[180px] border-border bg-background">
              <SelectValue placeholder="Payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="online">Online</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="border-primary/30 px-3 py-1.5 text-primary">
            {filtered.length} invoices
          </Badge>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <FileText className="h-4 w-4 text-primary" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Invoice ID</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Barber</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Method</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-border/40 transition-colors hover:bg-secondary/30">
                  <td className="px-3 py-3">
                    <span className="rounded-lg bg-primary/5 px-2 py-1 font-mono text-xs font-medium text-primary">
                      {inv.invoiceId}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-foreground">{inv.clientName}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{inv.services.join(", ")}</td>
                  <td className="px-3 py-3 text-sm text-foreground">{inv.barber}</td>
                  <td className="px-3 py-3">
                    <Badge className={`${methodColor[inv.paymentMethod]} flex w-fit items-center gap-1 text-xs`}>
                      {methodIcon[inv.paymentMethod]}
                      {inv.paymentMethod}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{inv.date}</td>
                  <td className="px-3 py-3 text-right text-sm font-semibold text-foreground">₹{inv.amount.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-xs"
                      onClick={() => downloadInvoice(inv)}
                    >
                      <Download className="mr-1 h-3 w-3" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
