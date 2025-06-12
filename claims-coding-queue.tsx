"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Home,
  Menu,
  XCircle,
  LogOut,
  User,
  ChevronRight,
  FileText,
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

export default function ClaimsCodingQueue() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const { user, logout } = useAuth()

  const claimsData = [
    {
      slNo: "1",
      mrn: "345-56-349",
      civilId: "29618735",
      patientName: "Ahmed Al-Harthy",
      visitId: "43-567",
      invoiceNo: "53907",
      dateOfService: "11-01-2025",
      invoiceAmount: "65.000",
      claimStatus: "Pending",
      insurance: "Regal Insurance",
      payer: "Payer",
      visitType: "Emergency",
      assignedTo: "Coder 1",
    },
    {
      slNo: "2",
      mrn: "876-65-098",
      civilId: "7583685",
      patientName: "Noura Al-Said",
      visitId: "56-247",
      invoiceNo: "09762",
      dateOfService: "11-01-2025",
      invoiceAmount: "42.050",
      claimStatus: "Codified",
      insurance: "MedNet",
      payer: "Payer",
      visitType: "In-patient",
      assignedTo: "---",
    },
    {
      slNo: "3",
      mrn: "761-50-651",
      civilId: "7642960",
      patientName: "Zayed Al-Khalil",
      visitId: "45-865",
      invoiceNo: "76094",
      dateOfService: "11-01-2025",
      invoiceAmount: "908.500",
      claimStatus: "Ready for Submission",
      insurance: "MedNet",
      payer: "Payer",
      visitType: "Acute",
      assignedTo: "Coder 2",
    },
  ]

  const sidebarItems = [
    { icon: FileText, label: "Eligibility", active: false, href: "/eligibility" },
    { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
    { icon: Users, label: "Claims coding Queue", active: true, href: "/claims-coding" },
    { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
    { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
    { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
    { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
    { icon: FileText, label: "Reports", active: false, href: "/reports" },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-amber-700 bg-amber-50 border-amber-200"
      case "codified":
        return "text-blue-700 bg-blue-50 border-blue-200"
      case "ready for submission":
        return "text-emerald-700 bg-emerald-50 border-emerald-200"
      default:
        return "text-gray-700 bg-gray-50 border-gray-200"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-500"
      case "codified":
        return "bg-blue-500"
      case "ready for submission":
        return "bg-emerald-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSelectClaim = (claimId: string) => {
    setSelectedClaims((prev) => (prev.includes(claimId) ? prev.filter((id) => id !== claimId) : [...prev, claimId]))
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedClaims([])
    } else {
      setSelectedClaims(claimsData.map((claim) => claim.slNo))
    }
    setSelectAll(!selectAll)
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
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">Claims coding Queue</h1>
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
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Facility ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="111111111">111111111</SelectItem>
                </SelectContent>
              </Select>

              <Select>
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
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="internal">Internal Medicine</SelectItem>
                  <SelectItem value="acute">Acute</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Date Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service Date / Discharge Date</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Insurance / TPA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="mednet">MedNet</SelectItem>
                  <SelectItem value="regal">Regal Insurance</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Payer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="payer">Payer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Second Row of Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Visit Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="inpatient">In-patient</SelectItem>
                  <SelectItem value="acute">Acute</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Claim status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="codified">Codified</SelectItem>
                  <SelectItem value="ready">Ready for Submission</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Coding status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="Claim Assigned (Yes/No)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="From date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01-11">11.10.2020</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white h-10">
                  <SelectValue placeholder="To date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01-11">11.10.2020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-10 whitespace-nowrap">
                          Sl.no
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          MRN
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          Civil ID
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-24 whitespace-nowrap">
                          Patient name
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          Visit ID
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          Invoice No.
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-20 whitespace-nowrap">
                          Date of service
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-20 whitespace-nowrap">
                          Invoice amount
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-24 whitespace-nowrap">
                          Claim status
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-20 whitespace-nowrap">
                          Insurance / TPA
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          Payer
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          Visit type
                        </th>
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          Assigned to
                        </th>
                        <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <Checkbox
                              id="selectAll"
                              checked={selectAll}
                              onCheckedChange={handleSelectAll}
                              className="h-3.5 w-3.5"
                            />
                            <label htmlFor="selectAll" className="text-xs">
                              Select all
                            </label>
                          </div>
                        </th>
                        <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-700 w-16 whitespace-nowrap">
                          View claim
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimsData.map((claim, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                        >
                          <td className="py-2.5 px-3 text-xs font-medium text-gray-900">{claim.slNo}</td>
                          <td className="py-2.5 px-3">
                            <span className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
                              {claim.mrn}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.civilId}</td>
                          <td className="py-2.5 px-3 text-xs font-medium text-gray-900">{claim.patientName}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.visitId}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.invoiceNo}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.dateOfService}</td>
                          <td className="py-2.5 px-3 text-xs font-medium text-gray-900">{claim.invoiceAmount}</td>
                          <td className="py-2.5 px-3">
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(claim.claimStatus)}`}
                            >
                              <div
                                className={`w-1.5 h-1.5 ${getStatusDot(claim.claimStatus)} rounded-full mr-1.5`}
                              ></div>
                              <span>{claim.claimStatus}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.insurance}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.payer}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                                claim.visitType === "Emergency"
                                  ? "bg-red-100 text-red-700"
                                  : claim.visitType === "In-patient"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {claim.visitType}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-xs text-gray-900">{claim.assignedTo}</td>
                          <td className="py-2.5 px-3 text-center">
                            <Checkbox
                              checked={selectedClaims.includes(claim.slNo)}
                              onCheckedChange={() => handleSelectClaim(claim.slNo)}
                              className="h-3.5 w-3.5"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <Link href={`/claims-coding/${claim.slNo}`}>
                              <button className="w-6 h-6 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0 mx-auto">
                                <ChevronRight className="w-3.5 h-3.5" />
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

            {/* Assign To Button */}
            <div className="flex justify-end">
              <Select>
                <SelectTrigger className="w-48 bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                  <SelectValue placeholder="Assign To" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coder1">Coder 1</SelectItem>
                  <SelectItem value="coder2">Coder 2</SelectItem>
                  <SelectItem value="coder3">Coder 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
