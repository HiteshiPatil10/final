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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  weeklyRevenue,
  monthlyRevenue,
  yearlyRevenue,
  serviceRevenue,
  peakHours,
  barbers,
  appointments,
} from "@/lib/data"
import { TrendingUp, DollarSign, BarChart3, Clock, Users } from "lucide-react"
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = ["hsl(25, 55%, 45%)", "hsl(35, 60%, 55%)", "hsl(15, 40%, 35%)", "hsl(40, 50%, 60%)", "hsl(20, 70%, 50%)"]

export function AnalyticsPage() {
  const [period, setPeriod] = useState("weekly")
  const [barberFilter, setBarberFilter] = useState("all")

  const revenueData = period === "weekly" ? weeklyRevenue : period === "monthly" ? monthlyRevenue : yearlyRevenue
  const xKey = period === "weekly" ? "day" : period === "monthly" ? "month" : "year"

  // Barber-specific analytics
  const barberStats = barbers.map((b) => {
    const barberAppts = appointments.filter((a) => a.barberId === b.id)
    const completed = barberAppts.filter((a) => a.status === "completed")
    const totalRev = completed.reduce((s, a) => s + a.amount, 0)
    return {
      name: b.name.split(" ")[0],
      fullName: b.name,
      id: b.id,
      totalClients: barberAppts.length,
      completedClients: completed.length,
      revenue: totalRev + b.revenueGenerated,
      avgPerClient: barberAppts.length > 0 ? Math.round((totalRev + b.revenueGenerated) / barberAppts.length) : 0,
    }
  })

  const filteredBarberStats = barberFilter === "all"
    ? barberStats
    : barberStats.filter((b) => b.id === barberFilter)

  // Top stats
  const totalRevenue = period === "weekly"
    ? weeklyRevenue.reduce((s, d) => s + d.revenue, 0)
    : period === "monthly"
    ? monthlyRevenue.reduce((s, d) => s + d.revenue, 0)
    : yearlyRevenue.reduce((s, d) => s + d.revenue, 0)

  const totalBookings = period === "weekly"
    ? weeklyRevenue.reduce((s, d) => s + d.bookings, 0)
    : period === "monthly"
    ? monthlyRevenue.reduce((s, d) => s + d.bookings, 0)
    : yearlyRevenue.reduce((s, d) => s + d.bookings, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Revenue & Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Deep insights into your salon performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={barberFilter} onValueChange={setBarberFilter}>
            <SelectTrigger className="w-[160px] border-border bg-card text-sm">
              <Users className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Filter barber" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Barbers</SelectItem>
              {barbers.map((b) => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Period Tabs */}
      <Tabs value={period} onValueChange={setPeriod}>
        <TabsList className="bg-secondary/70">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Monthly</TabsTrigger>
          <TabsTrigger value="yearly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="mt-4">
          {/* Summary Cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Bookings</p>
                  <p className="text-xl font-bold text-foreground">{totalBookings.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg. per Booking</p>
                  <p className="text-xl font-bold text-foreground">₹{totalBookings > 0 ? Math.round(totalRevenue / totalBookings).toLocaleString() : 0}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Peak Hour</p>
                  <p className="text-xl font-bold text-foreground">4 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Revenue Trend */}
            <Card className="border-border/60 bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(25, 45%, 30%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(25, 45%, 30%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                    <XAxis dataKey={xKey} tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(35, 30%, 98%)",
                        border: "1px solid hsl(30, 15%, 88%)",
                        borderRadius: "12px",
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(25, 45%, 30%)" strokeWidth={2.5} fill="url(#revGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bookings Trend */}
            <Card className="border-border/60 bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Bookings Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                    <XAxis dataKey={xKey} tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(35, 30%, 98%)",
                        border: "1px solid hsl(30, 15%, 88%)",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar dataKey="bookings" fill="hsl(28, 50%, 42%)" radius={[6, 6, 0, 0]} name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Peak Hours */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Peak Booking Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={peakHours} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                <XAxis type="number" tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 11 }} />
                <YAxis dataKey="hour" type="category" tick={{ fill: "hsl(25, 10%, 45%)", fontSize: 11 }} width={50} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(35, 30%, 98%)",
                    border: "1px solid hsl(30, 15%, 88%)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="bookings" fill="hsl(25, 45%, 30%)" radius={[0, 6, 6, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Revenue Breakdown */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Top Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={serviceRevenue} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="revenue">
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
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {serviceRevenue.map((s, i) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Barber Revenue Table */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Barber Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {filteredBarberStats.map((b, i) => (
                <div key={b.id} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{b.fullName}</p>
                      <p className="text-xs text-muted-foreground">{b.totalClients} clients</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">₹{b.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
