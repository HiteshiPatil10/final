"use client"

import { useState } from "react"
import { StoreContext, type Page } from "@/lib/store"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardPage } from "@/components/pages/dashboard"
import { SlotsPage } from "@/components/pages/slots"
import { AppointmentsPage } from "@/components/pages/appointments"
import { StaffPage } from "@/components/pages/staff"
import { AttendancePage } from "@/components/pages/attendance"
import { ClientsPage } from "@/components/pages/clients"
import { AnalyticsPage } from "@/components/pages/analytics"
import { ServicesPage } from "@/components/pages/services"
import { OffersPage } from "@/components/pages/offers"
import { WhatsAppPage } from "@/components/pages/whatsapp"
import { PaymentsPage } from "@/components/pages/payments"
import { SettingsPage } from "@/components/pages/settings"
import { cn } from "@/lib/utils"
import { Bell, Search, Menu } from "lucide-react"

const pageComponents: Record<Page, React.ComponentType> = {
  dashboard: DashboardPage,
  slots: SlotsPage,
  appointments: AppointmentsPage,
  staff: StaffPage,
  attendance: AttendancePage,
  clients: ClientsPage,
  analytics: AnalyticsPage,
  services: ServicesPage,
  offers: OffersPage,
  whatsapp: WhatsAppPage,
  payments: PaymentsPage,
  settings: SettingsPage,
}

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard",
  slots: "Slot Control",
  appointments: "Appointments",
  staff: "Staff",
  attendance: "Attendance",
  clients: "Clients CRM",
  analytics: "Analytics",
  services: "Services",
  offers: "Offers",
  whatsapp: "WhatsApp Logs",
  payments: "Payments",
  settings: "Settings",
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)

  const ActivePage = pageComponents[currentPage]

  const notifications = [
    { id: 1, text: "New appointment booked by Arjun Mehta", time: "2 min ago", unread: true },
    { id: 2, text: "Vikram Singh marked absent today", time: "15 min ago", unread: true },
    { id: 3, text: "Payment received: INV-2026-002 (Rs. 1200)", time: "30 min ago", unread: false },
    { id: 4, text: "Spa Weekend offer expiring tomorrow", time: "1 hr ago", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const searchResults = searchQuery.trim()
    ? (Object.entries(pageTitles) as [Page, string][]).filter(([, title]) =>
        title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  function handleNavigate(page: Page) {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <StoreContext value={{
      currentPage,
      setCurrentPage: handleNavigate,
      sidebarOpen,
      setSidebarOpen,
    }}>
      <div className="flex min-h-screen bg-background">
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Sidebar - Mobile */}
        <div
          className={cn(
            "fixed left-0 top-0 z-40 lg:hidden transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <AppSidebar />
        </div>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 flex flex-col min-h-screen transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"
          )}
        >
          {/* Top Header Bar */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md lg:px-6">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-muted-foreground sm:inline">Tressora</span>
                <span className="hidden text-muted-foreground/40 sm:inline">/</span>
                <span className="text-sm font-medium text-foreground">{pageTitles[currentPage]}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                {searchOpen && (
                  <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-border bg-card p-3 shadow-lg">
                    <input
                      type="text"
                      placeholder="Search pages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                    {searchResults.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1">
                        {searchResults.map(([page, title]) => (
                          <button
                            key={page}
                            onClick={() => handleNavigate(page)}
                            className="rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                          >
                            {title}
                          </button>
                        ))}
                      </div>
                    )}
                    {searchQuery && searchResults.length === 0 && (
                      <p className="mt-2 px-3 py-2 text-xs text-muted-foreground">No pages found</p>
                    )}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-border bg-card shadow-lg">
                    <div className="border-b border-border px-4 py-3">
                      <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "flex items-start gap-3 border-b border-border/40 px-4 py-3 transition-colors hover:bg-secondary/30",
                            n.unread && "bg-primary/5"
                          )}
                        >
                          <div
                            className={cn(
                              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                              n.unread ? "bg-accent" : "bg-transparent"
                            )}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{n.text}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border px-4 py-2">
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="w-full text-center text-xs font-medium text-primary hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Owner Avatar */}
              <div className="flex items-center gap-2 rounded-xl bg-secondary/50 px-3 py-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  OW
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-foreground leading-tight">Owner</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Admin</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-4 lg:p-6">
            <ActivePage />
          </div>

          {/* Footer */}
          <footer className="border-t border-border bg-card/50 px-4 py-3 lg:px-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Tressora Salon Management v1.0
              </p>
              <p className="text-xs text-muted-foreground">
                Today: {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </footer>
        </main>

        {/* Click-away to close dropdowns */}
        {(searchOpen || showNotifications) && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => { setSearchOpen(false); setShowNotifications(false); setSearchQuery("") }}
            aria-hidden="true"
          />
        )}
      </div>
    </StoreContext>
  )
}
