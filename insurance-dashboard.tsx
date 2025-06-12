"use client"

import { useState } from "react"
import {
  Search,
  FileText,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Home,
  Menu,
  XCircle,
  LogOut,
  User,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "./auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const sidebarItems = [
  { icon: FileText, label: "Eligibility", active: true, href: "/eligibility" },
  { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
  { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
  { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
  { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
  { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
  { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
  { icon: FileText, label: "Reports", active: false, href: "/reports" },
]

const eligibilityData = [
  {
    civilId: "7104335",
    name: "Ahmed",
    insurance: "Mednet",
    category: "Omani with insurance",
    status: "New visit",
    visitDate: "11.05.2025",
    specialty: "Internal medicine",
    physician: "Dr. Fatma",
    visitType: "Inpatient",
    facility: "Royal / 223344",
    eligibilityStatus: "Pending",
  },
  {
    civilId: "9406670",
    name: "Abdullah",
    insurance: "Nextcare",
    category: "Expat with insurance",
    status: "New visit",
    visitDate: "11.05.2025",
    specialty: "Orthopedic",
    physician: "Dr. Ali",
    visitType: "Outpatient",
    facility: "Royal / 223344",
    eligibilityStatus: "Eligible",
  },
  {
    civilId: "8205441",
    name: "Fatima",
    insurance: "Oman Insurance",
    category: "Omani with insurance",
    status: "Follow up",
    visitDate: "12.05.2025",
    specialty: "Cardiology",
    physician: "Dr. Hassan",
    visitType: "Outpatient",
    facility: "Royal / 223344",
    eligibilityStatus: "Not Eligible",
  },
  {
    civilId: "9306552",
    name: "Mohammed",
    insurance: "Gulf Insurance",
    category: "Expat with insurance",
    status: "Emergency",
    visitDate: "12.05.2025",
    specialty: "Emergency",
    physician: "Dr. Sara",
    visitType: "Emergency",
    facility: "Royal / 223344",
    eligibilityStatus: "Requested",
  },
]

export default function InsuranceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = eligibilityData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.civilId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.insurance.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.eligibilityStatus.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // Calculate status counts
  const statusCounts = {
    requested: eligibilityData.filter((item) => item.eligibilityStatus === "Requested").length,
    eligible: eligibilityData.filter((item) => item.eligibilityStatus === "Eligible").length,
    pending: eligibilityData.filter((item) => item.eligibilityStatus === "Pending").length,
    notEligible: eligibilityData.filter((item) => item.eligibilityStatus === "Not Eligible").length,
  }

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Requested":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Eligible":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "Not Eligible":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/moh-english-logo.png"
                  alt="Ministry of Health Oman"
                  width={120}
                  height={48}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex-1 px-4 lg:px-6 pb-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-10 px-3 text-sm ${
                    item.active ? "bg-blue-50 text-blue-700 hover:bg-blue-50" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 lg:px-6 pb-6">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Eligibility Status</h1>
                <p className="text-xs lg:text-sm text-gray-500">Updated: 09.41h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <span className="hidden sm:block text-sm lg:text-lg font-medium text-gray-900 truncate">
                Royal hospital Muscat
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-8 h-8 rounded-full bg-blue-600 p-0 text-white hover:bg-blue-700">
                    KA
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      KA
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <Select defaultValue="111111111">
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Facility ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="111111111">111111111</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="hospital">
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Facility Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital Name</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal Medicine</SelectItem>
                  <SelectItem value="orthopedic">Orthopedic</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="11.05.2025">
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="From date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11.05.2025">11.05.2025</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Insurance / TPA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Payer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mednet">Mednet</SelectItem>
                  <SelectItem value="nextcare">Nextcare</SelectItem>
                  <SelectItem value="oman">Oman Insurance</SelectItem>
                  <SelectItem value="gulf">Gulf Insurance</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Visit Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inpatient">Inpatient</SelectItem>
                  <SelectItem value="outpatient">Outpatient</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="12.05.2025">
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="To date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12.05.2025">12.05.2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search and Status Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for Civil ID, MRN etc"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white h-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white h-10 w-48">
                  <SelectValue placeholder="Filter by eligibility status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="eligible">Eligible</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="not eligible">Not Eligible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Summary */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Summary</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700 mb-1">{statusCounts.requested}</div>
                    <div className="text-sm text-blue-600">Requested</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-700 mb-1">{statusCounts.eligible}</div>
                    <div className="text-sm text-green-600">Eligible</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="text-2xl font-bold text-orange-700 mb-1">{statusCounts.pending}</div>
                    <div className="text-sm text-orange-600">Pending</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="text-2xl font-bold text-red-700 mb-1">{statusCounts.notEligible}</div>
                    <div className="text-sm text-red-600">Not Eligible</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1400px] border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Civil ID</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Insurance/TPA Payer</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Visit date</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Speciality</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Physician</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Visit type</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Facility / ID</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Eligibility Status</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr
                          key={item.civilId}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                        >
                          <td className="py-3 px-3 text-xs font-medium text-gray-900">{item.civilId}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.name}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.insurance}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.category}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.status}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.visitDate}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.specialty}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.physician}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.visitType}</td>
                          <td className="py-3 px-3 text-xs text-gray-900">{item.facility}</td>
                          <td className="py-3 px-3 text-xs">
                            <Badge variant="outline" className={getStatusBadgeStyle(item.eligibilityStatus)}>
                              {item.eligibilityStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                View
                              </Button>
                              <Button size="sm" className="h-8 px-2 text-xs bg-blue-600 text-white hover:bg-blue-700">
                                Verify
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No eligibility records found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
