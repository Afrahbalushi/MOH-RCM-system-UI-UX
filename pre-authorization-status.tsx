"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"
import {
  Search,
  FileText,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Home,
  User,
  Menu,
  Clock,
  TrendingUp,
  XCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function PreAuthorizationStatus() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()

  const patientData = [
    {
      name: "Ahmed Al-Harthy",
      civilId: "29618735",
      mrn: "345-50-346",
      physician: "Dr. Fatma",
      visitType: "Acute",
      responseTime: "---",
      status: "pending",
      statusLabel: "Pending",
    },
    {
      name: "Patient name",
      civilId: "34579268",
      mrn: "876-01-420",
      physician: "Dr. Fatma",
      visitType: "Emergency",
      responseTime: "10 Min",
      status: "rejected",
      statusLabel: "Rejected",
    },
    {
      name: "Patient name",
      civilId: "76349861",
      mrn: "764-08-275",
      physician: "Dr. Fatma",
      visitType: "Elective",
      responseTime: "2 Hrs",
      status: "approved",
      statusLabel: "Approved",
    },
    {
      name: "Patient name",
      civilId: "95036184",
      mrn: "524-09-907",
      physician: "Dr. Fatma",
      visitType: "Urgent",
      responseTime: "30 Min",
      status: "submitted",
      statusLabel: "Submitted",
    },
    {
      name: "Patient name",
      civilId: "95036394",
      mrn: "414-07-903",
      physician: "Dr. Fatma",
      visitType: "Urgent",
      responseTime: "2.5 Hrs",
      status: "partial",
      statusLabel: "Partial Approval",
    },
  ]

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: true, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  // Status styles
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "text-amber-700 bg-amber-50 border-amber-200"
      case "submitted":
        return "text-blue-700 bg-blue-50 border-blue-200"
      case "approved":
        return "text-emerald-700 bg-emerald-50 border-emerald-200"
      case "partial":
        return "text-amber-700 bg-amber-50 border-amber-200"
      case "rejected":
        return "text-red-700 bg-red-50 border-red-200"
      default:
        return "text-gray-700 bg-gray-50 border-gray-200"
    }
  }

  // Status dot colors
  const getStatusDot = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500"
      case "submitted":
        return "bg-blue-500"
      case "approved":
        return "bg-emerald-500"
      case "partial":
        return "bg-amber-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">
                  Pre-authorization Status
                </h1>
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
                    {user?.avatar || "KA"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {user?.avatar || "KA"}
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
            {/* Search and Summary Row */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search for Civil ID, MRN etc" className="pl-10 bg-white h-10" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live updates
                </div>
                <Link href="/pre-authorization-analytics">
                  <Button variant="outline" size="sm" className="h-9 text-sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </div>

            {/* Enhanced Data Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2.5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm lg:text-base font-semibold text-gray-900">Pre-authorization Requests</h3>
                    <div className="text-xs text-gray-500">
                      Total: <span className="font-semibold text-gray-900">{patientData.length}</span> requests
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[160px] whitespace-nowrap">
                          Patient Information
                        </th>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[100px] whitespace-nowrap">
                          MRN
                        </th>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[120px] whitespace-nowrap">
                          Treating Physician
                        </th>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[90px] whitespace-nowrap">
                          Visit Type
                        </th>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[100px] whitespace-nowrap">
                          Response Time
                        </th>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[100px] whitespace-nowrap">
                          Status
                        </th>
                        <th className="text-left p-2 lg:p-3 text-xs font-semibold text-gray-700 min-w-[70px] whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientData.map((patient, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                        >
                          <td className="p-2 lg:p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-blue-700">
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-gray-900 truncate">{patient.name}</div>
                                <div className="text-xs text-gray-500">ID: {patient.civilId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 lg:p-3">
                            <span className="text-xs font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                              {patient.mrn}
                            </span>
                          </td>
                          <td className="p-2 lg:p-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 lg:w-5 lg:h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-2 h-2 lg:w-2.5 lg:h-2.5 text-green-600" />
                              </div>
                              <span className="text-xs text-gray-900 truncate">{patient.physician}</span>
                            </div>
                          </td>
                          <td className="p-2 lg:p-3">
                            <span
                              className={`text-xs font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                                patient.visitType === "Emergency"
                                  ? "bg-red-100 text-red-700"
                                  : patient.visitType === "Urgent"
                                    ? "bg-orange-100 text-orange-700"
                                    : patient.visitType === "Elective"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {patient.visitType}
                            </span>
                          </td>
                          <td className="p-2 lg:p-3">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-xs text-gray-900 whitespace-nowrap">{patient.responseTime}</span>
                            </div>
                          </td>
                          <td className="p-2 lg:p-3">
                            <div
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusStyle(patient.status)}`}
                            >
                              <div
                                className={`w-1.5 h-1.5 ${getStatusDot(patient.status)} rounded-full mr-1 animate-pulse`}
                              ></div>
                              <span>{patient.statusLabel}</span>
                            </div>
                          </td>
                          <td className="p-2 lg:p-3 text-right">
                            <Link href={`/pre-authorization-request/${patient.civilId}`}>
                              <button className="w-5 h-5 lg:w-6 lg:h-6 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0">
                                <ChevronRight className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-4 lg:px-6 py-3 lg:py-4">
                  <CardTitle className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" />
                    Processing Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Requests</span>
                      <span className="font-semibold text-gray-900">{patientData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="font-semibold text-emerald-600">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Response Time</span>
                      <span className="font-semibold text-blue-600">1.2 hrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="px-4 lg:px-6 py-3 lg:py-4">
                  <CardTitle className="text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600 flex-shrink-0" />
                    Today's Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">New Requests</span>
                      <span className="font-semibold text-blue-600">+12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Processed</span>
                      <span className="font-semibold text-emerald-600">+8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Review</span>
                      <span className="font-semibold text-amber-600">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
