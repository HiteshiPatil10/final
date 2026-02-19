"use client"

import { createContext, useContext } from "react"

export type Page =
  | "dashboard"
  | "slots"
  | "appointments"
  | "staff"
  | "attendance"
  | "clients"
  | "analytics"
  | "services"
  | "offers"
  | "whatsapp"
  | "payments"
  | "settings"

export type StoreContextType = {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const StoreContext = createContext<StoreContextType>({
  currentPage: "dashboard",
  setCurrentPage: () => {},
  sidebarOpen: true,
  setSidebarOpen: () => {},
})

export function useStore() {
  return useContext(StoreContext)
}
