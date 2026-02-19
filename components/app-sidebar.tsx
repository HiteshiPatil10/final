"use client"

import { useStore, type Page } from "@/lib/store"
import {
  LayoutDashboard,
  CalendarClock,
  CalendarCheck,
  Users,
  ClipboardCheck,
  UserCircle,
  TrendingUp,
  Scissors,
  Tag,
  MessageCircle,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems: { label: string; icon: React.ElementType; page: Page }[] = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Slot Control", icon: CalendarClock, page: "slots" },
  { label: "Appointments", icon: CalendarCheck, page: "appointments" },
  { label: "Staff", icon: Users, page: "staff" },
  { label: "Attendance", icon: ClipboardCheck, page: "attendance" },
  { label: "Clients CRM", icon: UserCircle, page: "clients" },
  { label: "Analytics", icon: TrendingUp, page: "analytics" },
  { label: "Services", icon: Scissors, page: "services" },
  { label: "Offers", icon: Tag, page: "offers" },
  { label: "WhatsApp Logs", icon: MessageCircle, page: "whatsapp" },
  { label: "Payments", icon: CreditCard, page: "payments" },
  { label: "Settings", icon: Settings, page: "settings" },
]

export function AppSidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useStore()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        sidebarOpen ? "w-64" : "w-[72px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <Scissors className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-sidebar-foreground">
              Tressora
            </span>
          </div>
        )}
        {!sidebarOpen && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Scissors className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.page
            return (
              <li key={item.page}>
                <button
                  onClick={() => setCurrentPage(item.page)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", isActive && "drop-shadow-sm")} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  )
}
