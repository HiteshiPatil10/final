"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { appointments, barbers, weeklyRevenue, serviceRevenue } from "@/lib/data"
import {
  DollarSign,
  CalendarCheck,
  Users,
  Footprints,
  Globe,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const todayAppointments = appointments.filter((a) => a.date === "2026-02-13")
const todayRevenue = todayAppointments
  .filter((a) => a.paymentStatus === "paid")
  .reduce((sum, a) => sum + a.amount, 0)
const totalBookings = todayAppointments.length
const activeBarbers = barbers.filter((b) => b.status === "present" || b.status === "half-day").length
const walkIns = todayAppointments.filter((a) => a.type === "walk-in").length
const onlineBookings = todayAppointments.filter((a) => a.type === "online").length

const barberPerformance = barbers
  .filter((b) => b.status !== "absent")
  .map((b) => ({
    name: b.name.split(" ")[0],
    clients: b.clientsHandled,
    revenue: b.revenueGenerated,
  }))

const kpiCards = [
  { title: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, icon: DollarSign, change: "+12.5%", color: "text-emerald-600" },
  { title: "Total Bookings", value: totalBookings, icon: CalendarCheck, change: "+8.2%", color: "text-emerald-600" },
  { title: "Active Barbers", value: `${activeBarbers}/${barbers.length}`, icon: Users, change: "", color: "" },
  { title: "Walk-in Clients", value: walkIns, icon: Footprints, change: "+3", color: "text-emerald-600" },
  { title: "Online Bookings", value: onlineBookings, icon: Globe, change: "+5", color: "text-emerald-600" },
]

const COLORS = ["hsl(25, 55%, 45%)", "hsl(35, 60%, 55%)", "hsl(15, 40%, 35%)", "hsl(40, 50%, 60%)", "hsl(20, 70%, 50%)"]

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Here is your salon overview for today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title} className="relative overflow-hidden border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {kpi.title}
                    </span>
                    <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                {kpi.change && (
                  <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${kpi.color}`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {kpi.change} from yesterday
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weekly Revenue Line Chart */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Weekly Revenue</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <TrendingUp className="mr-1 h-3 w-3" />
              This Week
            </Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(35, 30%, 98%)",
                    border: "1px solid hsl(30, 15%, 88%)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(25, 45%, 30%)"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(25, 45%, 30%)", r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(28, 50%, 42%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Barber Performance Bar Chart */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Barber Performance</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">Today</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barberPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(35, 30%, 98%)",
                    border: "1px solid hsl(30, 15%, 88%)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="clients" fill="hsl(25, 45%, 30%)" radius={[6, 6, 0, 0]} name="Clients" />
                <Bar dataKey="revenue" fill="hsl(35, 60%, 55%)" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Service Revenue Pie */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Service Revenue Split</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={serviceRevenue}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="revenue"
                >
                  {serviceRevenue.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(35, 30%, 98%)",
                    border: "1px solid hsl(30, 15%, 88%)",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {serviceRevenue.map((s, i) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card className="col-span-1 border-border/60 bg-card shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Recent Appointments</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">Today</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {todayAppointments.slice(0, 6).map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {apt.clientName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{apt.clientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.service} with {apt.barberName.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">{apt.time}</span>
                    <Badge
                      variant={apt.status === "completed" ? "default" : apt.status === "in-progress" ? "secondary" : "outline"}
                      className={
                        apt.status === "completed"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                          : apt.status === "in-progress"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : "border-border text-muted-foreground"
                      }
                    >
                      {apt.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
