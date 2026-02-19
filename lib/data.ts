// ==================== MOCK DATA FOR TRESSORA ====================

export type Barber = {
  id: string
  name: string
  phone: string
  email: string
  role: string
  status: "present" | "absent" | "half-day" | "on-leave"
  avatar: string
  joinDate: string
  loginTime?: string
  logoutTime?: string
  totalHours?: number
  clientsHandled: number
  revenueGenerated: number
}

export type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  service: string
  barberId: string
  barberName: string
  date: string
  time: string
  duration: number
  status: "upcoming" | "completed" | "cancelled" | "in-progress"
  paymentStatus: "paid" | "pending" | "partial"
  amount: number
  type: "online" | "walk-in"
}

export type Client = {
  id: string
  name: string
  phone: string
  email: string
  totalVisits: number
  totalSpend: number
  lastVisit: string
  favoriteBarber: string
  preferredServices: string[]
  visits: { date: string; service: string; barber: string; amount: number }[]
}

export type Service = {
  id: string
  name: string
  price: number
  duration: number
  category: string
  active: boolean
}

export type Offer = {
  id: string
  title: string
  discount: number
  validTill: string
  applicableServices: string[]
  status: "active" | "expired" | "scheduled"
  code: string
}

export type WhatsAppLog = {
  id: string
  clientName: string
  phone: string
  messageType: "booking-confirmation" | "bill-receipt" | "thank-you" | "offer-broadcast"
  dateSent: string
  status: "delivered" | "sent" | "failed" | "read"
}

export type Invoice = {
  id: string
  invoiceId: string
  clientName: string
  amount: number
  paymentMethod: "cash" | "card" | "upi" | "online"
  date: string
  services: string[]
  barber: string
}

export const barbers: Barber[] = [
  { id: "b1", name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul@tressora.com", role: "Senior Stylist", status: "present", avatar: "RS", joinDate: "2023-01-15", loginTime: "09:00", logoutTime: "18:00", totalHours: 9, clientsHandled: 8, revenueGenerated: 4200 },
  { id: "b2", name: "Amit Patel", phone: "+91 98765 43211", email: "amit@tressora.com", role: "Barber", status: "present", avatar: "AP", joinDate: "2023-03-20", loginTime: "09:30", logoutTime: "18:00", totalHours: 8.5, clientsHandled: 6, revenueGenerated: 3100 },
  { id: "b3", name: "Sneha Kapoor", phone: "+91 98765 43212", email: "sneha@tressora.com", role: "Hair Colorist", status: "present", avatar: "SK", joinDate: "2023-06-10", loginTime: "10:00", logoutTime: "19:00", totalHours: 9, clientsHandled: 5, revenueGenerated: 5500 },
  { id: "b4", name: "Vikram Singh", phone: "+91 98765 43213", email: "vikram@tressora.com", role: "Barber", status: "absent", avatar: "VS", joinDate: "2023-09-01", loginTime: undefined, logoutTime: undefined, totalHours: 0, clientsHandled: 0, revenueGenerated: 0 },
  { id: "b5", name: "Priya Menon", phone: "+91 98765 43214", email: "priya@tressora.com", role: "Spa Specialist", status: "half-day", avatar: "PM", joinDate: "2024-01-05", loginTime: "09:00", logoutTime: "13:00", totalHours: 4, clientsHandled: 3, revenueGenerated: 2800 },
]

export const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30"
]

export const appointments: Appointment[] = [
  { id: "a1", clientName: "Arjun Mehta", clientPhone: "+91 91234 56789", service: "Haircut + Beard", barberId: "b1", barberName: "Rahul Sharma", date: "2026-02-13", time: "09:00", duration: 45, status: "completed", paymentStatus: "paid", amount: 600, type: "online" },
  { id: "a2", clientName: "Deepak Gupta", clientPhone: "+91 91234 56790", service: "Hair Color", barberId: "b3", barberName: "Sneha Kapoor", date: "2026-02-13", time: "09:00", duration: 90, status: "in-progress", paymentStatus: "pending", amount: 1500, type: "online" },
  { id: "a3", clientName: "Sanjay Kumar", clientPhone: "+91 91234 56791", service: "Haircut", barberId: "b2", barberName: "Amit Patel", date: "2026-02-13", time: "10:00", duration: 30, status: "upcoming", paymentStatus: "pending", amount: 400, type: "walk-in" },
  { id: "a4", clientName: "Ravi Teja", clientPhone: "+91 91234 56792", service: "Spa + Facial", barberId: "b5", barberName: "Priya Menon", date: "2026-02-13", time: "09:30", duration: 60, status: "completed", paymentStatus: "paid", amount: 1200, type: "online" },
  { id: "a5", clientName: "Karan Johar", clientPhone: "+91 91234 56793", service: "Haircut", barberId: "b1", barberName: "Rahul Sharma", date: "2026-02-13", time: "10:30", duration: 30, status: "upcoming", paymentStatus: "pending", amount: 400, type: "online" },
  { id: "a6", clientName: "Nitin Sharma", clientPhone: "+91 91234 56794", service: "Beard Trim", barberId: "b2", barberName: "Amit Patel", date: "2026-02-13", time: "11:00", duration: 20, status: "upcoming", paymentStatus: "pending", amount: 200, type: "walk-in" },
  { id: "a7", clientName: "Pooja Verma", clientPhone: "+91 91234 56795", service: "Hair Straightening", barberId: "b3", barberName: "Sneha Kapoor", date: "2026-02-13", time: "11:00", duration: 120, status: "upcoming", paymentStatus: "pending", amount: 2500, type: "online" },
  { id: "a8", clientName: "Manish Yadav", clientPhone: "+91 91234 56796", service: "Haircut + Shave", barberId: "b1", barberName: "Rahul Sharma", date: "2026-02-13", time: "12:00", duration: 45, status: "upcoming", paymentStatus: "pending", amount: 550, type: "online" },
  { id: "a9", clientName: "Ankit Jain", clientPhone: "+91 91234 56797", service: "Head Massage", barberId: "b5", barberName: "Priya Menon", date: "2026-02-13", time: "11:00", duration: 30, status: "upcoming", paymentStatus: "pending", amount: 350, type: "walk-in" },
  { id: "a10", clientName: "Rohit Bansal", clientPhone: "+91 91234 56798", service: "Haircut", barberId: "b2", barberName: "Amit Patel", date: "2026-02-13", time: "14:00", duration: 30, status: "upcoming", paymentStatus: "pending", amount: 400, type: "online" },
  { id: "a11", clientName: "Vishal Gupta", clientPhone: "+91 91234 56799", service: "Hair Color", barberId: "b3", barberName: "Sneha Kapoor", date: "2026-02-13", time: "14:00", duration: 90, status: "upcoming", paymentStatus: "pending", amount: 1500, type: "online" },
  { id: "a12", clientName: "Arun Nair", clientPhone: "+91 91234 56800", service: "Haircut + Beard", barberId: "b1", barberName: "Rahul Sharma", date: "2026-02-13", time: "14:00", duration: 45, status: "upcoming", paymentStatus: "pending", amount: 600, type: "walk-in" },
  // Past appointments for analytics
  { id: "a13", clientName: "Suresh Rao", clientPhone: "+91 91234 56801", service: "Haircut", barberId: "b1", barberName: "Rahul Sharma", date: "2026-02-12", time: "10:00", duration: 30, status: "completed", paymentStatus: "paid", amount: 400, type: "online" },
  { id: "a14", clientName: "Mohan Das", clientPhone: "+91 91234 56802", service: "Beard Trim", barberId: "b2", barberName: "Amit Patel", date: "2026-02-12", time: "11:00", duration: 20, status: "completed", paymentStatus: "paid", amount: 200, type: "walk-in" },
  { id: "a15", clientName: "Rajesh Pillai", clientPhone: "+91 91234 56803", service: "Hair Color", barberId: "b3", barberName: "Sneha Kapoor", date: "2026-02-11", time: "10:00", duration: 90, status: "completed", paymentStatus: "paid", amount: 1500, type: "online" },
  { id: "a16", clientName: "Amit Kumar", clientPhone: "+91 91234 56804", service: "Spa + Facial", barberId: "b5", barberName: "Priya Menon", date: "2026-02-11", time: "14:00", duration: 60, status: "completed", paymentStatus: "paid", amount: 1200, type: "online" },
  { id: "a17", clientName: "Gaurav Singh", clientPhone: "+91 91234 56805", service: "Haircut + Beard", barberId: "b1", barberName: "Rahul Sharma", date: "2026-02-10", time: "09:00", duration: 45, status: "completed", paymentStatus: "paid", amount: 600, type: "walk-in" },
  { id: "a18", clientName: "Vivek Joshi", clientPhone: "+91 91234 56806", service: "Hair Straightening", barberId: "b3", barberName: "Sneha Kapoor", date: "2026-02-10", time: "11:00", duration: 120, status: "completed", paymentStatus: "paid", amount: 2500, type: "online" },
]

export const clients: Client[] = [
  { id: "c1", name: "Arjun Mehta", phone: "+91 91234 56789", email: "arjun@email.com", totalVisits: 12, totalSpend: 7200, lastVisit: "2026-02-13", favoriteBarber: "Rahul Sharma", preferredServices: ["Haircut", "Beard Trim"], visits: [{ date: "2026-02-13", service: "Haircut + Beard", barber: "Rahul Sharma", amount: 600 }, { date: "2026-01-28", service: "Haircut", barber: "Rahul Sharma", amount: 400 }, { date: "2026-01-10", service: "Hair Color", barber: "Sneha Kapoor", amount: 1500 }] },
  { id: "c2", name: "Deepak Gupta", phone: "+91 91234 56790", email: "deepak@email.com", totalVisits: 8, totalSpend: 12000, lastVisit: "2026-02-13", favoriteBarber: "Sneha Kapoor", preferredServices: ["Hair Color", "Hair Straightening"], visits: [{ date: "2026-02-13", service: "Hair Color", barber: "Sneha Kapoor", amount: 1500 }, { date: "2026-01-20", service: "Hair Straightening", barber: "Sneha Kapoor", amount: 2500 }] },
  { id: "c3", name: "Sanjay Kumar", phone: "+91 91234 56791", email: "sanjay@email.com", totalVisits: 20, totalSpend: 8000, lastVisit: "2026-02-13", favoriteBarber: "Amit Patel", preferredServices: ["Haircut"], visits: [{ date: "2026-02-13", service: "Haircut", barber: "Amit Patel", amount: 400 }, { date: "2026-02-01", service: "Haircut", barber: "Amit Patel", amount: 400 }] },
  { id: "c4", name: "Ravi Teja", phone: "+91 91234 56792", email: "ravi@email.com", totalVisits: 5, totalSpend: 6000, lastVisit: "2026-02-13", favoriteBarber: "Priya Menon", preferredServices: ["Spa + Facial"], visits: [{ date: "2026-02-13", service: "Spa + Facial", barber: "Priya Menon", amount: 1200 }] },
  { id: "c5", name: "Karan Johar", phone: "+91 91234 56793", email: "karan@email.com", totalVisits: 15, totalSpend: 9500, lastVisit: "2026-02-13", favoriteBarber: "Rahul Sharma", preferredServices: ["Haircut", "Head Massage"], visits: [{ date: "2026-02-13", service: "Haircut", barber: "Rahul Sharma", amount: 400 }, { date: "2026-01-25", service: "Head Massage", barber: "Priya Menon", amount: 350 }] },
  { id: "c6", name: "Nitin Sharma", phone: "+91 91234 56794", email: "nitin@email.com", totalVisits: 3, totalSpend: 600, lastVisit: "2026-02-13", favoriteBarber: "Amit Patel", preferredServices: ["Beard Trim"], visits: [{ date: "2026-02-13", service: "Beard Trim", barber: "Amit Patel", amount: 200 }] },
  { id: "c7", name: "Pooja Verma", phone: "+91 91234 56795", email: "pooja@email.com", totalVisits: 6, totalSpend: 15000, lastVisit: "2026-02-13", favoriteBarber: "Sneha Kapoor", preferredServices: ["Hair Straightening", "Hair Color"], visits: [{ date: "2026-02-13", service: "Hair Straightening", barber: "Sneha Kapoor", amount: 2500 }] },
  { id: "c8", name: "Manish Yadav", phone: "+91 91234 56796", email: "manish@email.com", totalVisits: 10, totalSpend: 5500, lastVisit: "2026-02-13", favoriteBarber: "Rahul Sharma", preferredServices: ["Haircut", "Shave"], visits: [{ date: "2026-02-13", service: "Haircut + Shave", barber: "Rahul Sharma", amount: 550 }] },
]

export const services: Service[] = [
  { id: "s1", name: "Haircut", price: 400, duration: 30, category: "Hair", active: true },
  { id: "s2", name: "Beard Trim", price: 200, duration: 20, category: "Grooming", active: true },
  { id: "s3", name: "Haircut + Beard", price: 600, duration: 45, category: "Combo", active: true },
  { id: "s4", name: "Hair Color", price: 1500, duration: 90, category: "Hair", active: true },
  { id: "s5", name: "Hair Straightening", price: 2500, duration: 120, category: "Hair", active: true },
  { id: "s6", name: "Spa + Facial", price: 1200, duration: 60, category: "Spa", active: true },
  { id: "s7", name: "Head Massage", price: 350, duration: 30, category: "Spa", active: true },
  { id: "s8", name: "Haircut + Shave", price: 550, duration: 45, category: "Combo", active: true },
  { id: "s9", name: "Keratin Treatment", price: 3500, duration: 150, category: "Hair", active: true },
  { id: "s10", name: "Detan Pack", price: 800, duration: 40, category: "Spa", active: false },
]

export const offers: Offer[] = [
  { id: "o1", title: "New Year Special", discount: 20, validTill: "2026-03-31", applicableServices: ["Haircut", "Beard Trim", "Haircut + Beard"], status: "active", code: "NY2026" },
  { id: "o2", title: "Color Fest", discount: 15, validTill: "2026-02-28", applicableServices: ["Hair Color", "Hair Straightening"], status: "active", code: "COLOR15" },
  { id: "o3", title: "Spa Weekend", discount: 25, validTill: "2026-02-14", applicableServices: ["Spa + Facial", "Head Massage"], status: "active", code: "SPA25" },
  { id: "o4", title: "Diwali Offer", discount: 30, validTill: "2025-11-15", applicableServices: ["Haircut", "Hair Color", "Spa + Facial"], status: "expired", code: "DIWALI30" },
]

export const whatsappLogs: WhatsAppLog[] = [
  { id: "w1", clientName: "Arjun Mehta", phone: "+91 91234 56789", messageType: "booking-confirmation", dateSent: "2026-02-13 08:30", status: "delivered" },
  { id: "w2", clientName: "Deepak Gupta", phone: "+91 91234 56790", messageType: "booking-confirmation", dateSent: "2026-02-13 08:45", status: "read" },
  { id: "w3", clientName: "Arjun Mehta", phone: "+91 91234 56789", messageType: "bill-receipt", dateSent: "2026-02-13 09:50", status: "delivered" },
  { id: "w4", clientName: "Ravi Teja", phone: "+91 91234 56792", messageType: "thank-you", dateSent: "2026-02-13 10:35", status: "read" },
  { id: "w5", clientName: "All Clients", phone: "Broadcast", messageType: "offer-broadcast", dateSent: "2026-02-12 18:00", status: "sent" },
  { id: "w6", clientName: "Sanjay Kumar", phone: "+91 91234 56791", messageType: "booking-confirmation", dateSent: "2026-02-13 09:00", status: "delivered" },
  { id: "w7", clientName: "Karan Johar", phone: "+91 91234 56793", messageType: "booking-confirmation", dateSent: "2026-02-13 09:15", status: "failed" },
  { id: "w8", clientName: "Pooja Verma", phone: "+91 91234 56795", messageType: "booking-confirmation", dateSent: "2026-02-13 09:20", status: "read" },
]

export const invoices: Invoice[] = [
  { id: "i1", invoiceId: "INV-2026-001", clientName: "Arjun Mehta", amount: 600, paymentMethod: "upi", date: "2026-02-13", services: ["Haircut + Beard"], barber: "Rahul Sharma" },
  { id: "i2", invoiceId: "INV-2026-002", clientName: "Ravi Teja", amount: 1200, paymentMethod: "card", date: "2026-02-13", services: ["Spa + Facial"], barber: "Priya Menon" },
  { id: "i3", invoiceId: "INV-2026-003", clientName: "Suresh Rao", amount: 400, paymentMethod: "cash", date: "2026-02-12", services: ["Haircut"], barber: "Rahul Sharma" },
  { id: "i4", invoiceId: "INV-2026-004", clientName: "Mohan Das", amount: 200, paymentMethod: "upi", date: "2026-02-12", services: ["Beard Trim"], barber: "Amit Patel" },
  { id: "i5", invoiceId: "INV-2026-005", clientName: "Rajesh Pillai", amount: 1500, paymentMethod: "card", date: "2026-02-11", services: ["Hair Color"], barber: "Sneha Kapoor" },
  { id: "i6", invoiceId: "INV-2026-006", clientName: "Amit Kumar", amount: 1200, paymentMethod: "online", date: "2026-02-11", services: ["Spa + Facial"], barber: "Priya Menon" },
  { id: "i7", invoiceId: "INV-2026-007", clientName: "Gaurav Singh", amount: 600, paymentMethod: "cash", date: "2026-02-10", services: ["Haircut + Beard"], barber: "Rahul Sharma" },
  { id: "i8", invoiceId: "INV-2026-008", clientName: "Vivek Joshi", amount: 2500, paymentMethod: "card", date: "2026-02-10", services: ["Hair Straightening"], barber: "Sneha Kapoor" },
]

// Revenue data for charts
export const weeklyRevenue = [
  { day: "Mon", revenue: 4200, bookings: 12 },
  { day: "Tue", revenue: 3800, bookings: 10 },
  { day: "Wed", revenue: 5100, bookings: 15 },
  { day: "Thu", revenue: 4600, bookings: 13 },
  { day: "Fri", revenue: 6200, bookings: 18 },
  { day: "Sat", revenue: 8500, bookings: 25 },
  { day: "Sun", revenue: 7200, bookings: 20 },
]

export const monthlyRevenue = [
  { month: "Jan", revenue: 125000, bookings: 320 },
  { month: "Feb", revenue: 118000, bookings: 298 },
  { month: "Mar", revenue: 142000, bookings: 365 },
  { month: "Apr", revenue: 135000, bookings: 340 },
  { month: "May", revenue: 128000, bookings: 310 },
  { month: "Jun", revenue: 115000, bookings: 285 },
  { month: "Jul", revenue: 138000, bookings: 350 },
  { month: "Aug", revenue: 145000, bookings: 370 },
  { month: "Sep", revenue: 132000, bookings: 335 },
  { month: "Oct", revenue: 148000, bookings: 380 },
  { month: "Nov", revenue: 160000, bookings: 410 },
  { month: "Dec", revenue: 175000, bookings: 450 },
]

export const yearlyRevenue = [
  { year: "2022", revenue: 1200000, bookings: 3200 },
  { year: "2023", revenue: 1450000, bookings: 3800 },
  { year: "2024", revenue: 1680000, bookings: 4200 },
  { year: "2025", revenue: 1850000, bookings: 4600 },
  { year: "2026", revenue: 320000, bookings: 800 },
]

export const serviceRevenue = [
  { name: "Haircut", revenue: 48000, count: 120, fill: "hsl(25, 55%, 45%)" },
  { name: "Hair Color", revenue: 45000, count: 30, fill: "hsl(35, 60%, 55%)" },
  { name: "Beard Trim", revenue: 12000, count: 60, fill: "hsl(15, 40%, 35%)" },
  { name: "Spa + Facial", revenue: 36000, count: 30, fill: "hsl(40, 50%, 60%)" },
  { name: "Combos", revenue: 33000, count: 55, fill: "hsl(20, 70%, 50%)" },
]

export const peakHours = [
  { hour: "9 AM", bookings: 8 },
  { hour: "10 AM", bookings: 15 },
  { hour: "11 AM", bookings: 20 },
  { hour: "12 PM", bookings: 12 },
  { hour: "1 PM", bookings: 6 },
  { hour: "2 PM", bookings: 14 },
  { hour: "3 PM", bookings: 18 },
  { hour: "4 PM", bookings: 22 },
  { hour: "5 PM", bookings: 16 },
  { hour: "6 PM", bookings: 10 },
]
