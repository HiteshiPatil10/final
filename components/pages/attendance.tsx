"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { barbers, type Barber } from "@/lib/data"
import { ClipboardCheck, Clock, Users, DollarSign } from "lucide-react"

export function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState<Barber[]>(barbers)

  function togglePresent(id: string) {
    setAttendanceList((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "present" ? "absent" : "present" }
          : b
      )
    )
  }

  const presentCount = attendanceList.filter((b) => b.status === "present" || b.status === "half-day").length
  const totalHours = attendanceList.reduce((s, b) => s + (b.totalHours || 0), 0)
  const totalClients = attendanceList.reduce((s, b) => s + b.clientsHandled, 0)
  const totalRevenue = attendanceList.reduce((s, b) => s + b.revenueGenerated, 0)

  const summaryCards = [
    { title: "Present Today", value: `${presentCount}/${attendanceList.length}`, icon: Users, color: "text-emerald-600" },
    { title: "Total Hours", value: `${totalHours}h`, icon: Clock, color: "text-blue-600" },
    { title: "Clients Handled", value: totalClients, icon: ClipboardCheck, color: "text-amber-600" },
    { title: "Revenue Generated", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
  ]

  const statusColor: Record<string, string> = {
    present: "bg-emerald-100 text-emerald-700",
    absent: "bg-red-100 text-red-700",
    "half-day": "bg-amber-100 text-amber-700",
    "on-leave": "bg-muted text-muted-foreground",
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Attendance & Availability</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track daily attendance and barber availability
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="border-border/60 bg-card shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{card.title}</p>
                  <p className="text-xl font-bold text-foreground">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Attendance Table */}
      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Today{"'"}s Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Staff</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Present</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Login</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Logout</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hours</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Clients</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((staff) => (
                <tr key={staff.id} className="border-b border-border/40 transition-colors hover:bg-secondary/30">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {staff.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Switch
                      checked={staff.status === "present" || staff.status === "half-day"}
                      onCheckedChange={() => togglePresent(staff.id)}
                    />
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{staff.loginTime || "-"}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{staff.logoutTime || "-"}</td>
                  <td className="px-3 py-3 text-sm font-medium text-foreground">{staff.totalHours || 0}h</td>
                  <td className="px-3 py-3 text-sm font-medium text-foreground">{staff.clientsHandled}</td>
                  <td className="px-3 py-3 text-sm font-medium text-foreground">₹{staff.revenueGenerated.toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <Badge className={`${statusColor[staff.status]} text-xs`}>{staff.status}</Badge>
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
